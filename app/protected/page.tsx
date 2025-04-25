import { redirect } from "next/navigation";
import { fetchThisUser, fetchCampaignDmUser, fetchCampaigns, fetchCampaignPlayerUser } from "@/lib/data-fetcher";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertCampaign } from "@/lib/data-insert";
import CampaingsTable from "@/components/camp-table";
import ErrorComponent from "@/components/error-comp";
import Tabs from "@/components/tabs";
import { User } from "@supabase/supabase-js";
import UserCard from "@/components/user-card";

export default async function ProtectedPage() {
  const user = await fetchThisUser();

  if (!user) {
    return redirect("/sign-in");
  }


  return (
      <div className="lg:px-16">
        <Tabs className="mt-10">
          {[
            { trigger: "Le tue campagne", body: <CampaignDmInfo />},
            { trigger: "Le campagne dove giochi", body: <CampUserPlayer /> ,isActive: true},
            { trigger: "Entra in nuove campagne", body: <CampsJoin user={user} />},
          ]}
        </Tabs>
      </div>
  );
}

const CampaignDmInfo = async () => {
  const campaigns = await fetchCampaignDmUser();
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <h3>Campagne di cui sei Master</h3>
        <CampaingsTable camps={campaigns} />
      </div>
      <form className="flex flex-col gap-4 mt-8 items-center">
        <Label htmlFor="name">Campaign name:</Label>
        <Input 
          className="shrink w-7/12"
          name="name"
          type="text"
          placeholder="FireCity"
          required  
        />
        <Button variant={"default"} formAction={insertCampaign}
          className="shrink w-48"
        >Create campaign</Button>
      </form>
    </div>
  )
}

const CampUserPlayer = async () => {
  const camp = await fetchCampaignPlayerUser();
  return (
    <div className="w-11/12 md:w-9/12 mx-auto">
      <CampaingsTable camps={camp}/>
    </div>
  )
}

const CampsJoin = async ({user} : {user : User | null}) => {
  if(!user) redirect("/sign-in")
  let userCampaigns = await fetchCampaignPlayerUser();
  let camps = await fetchCampaigns()
  camps = camps?.filter(camp => camp.masterID != user.id) || camps;
  camps = camps?.filter(camp => !(userCampaigns.find(campP => campP.id == camp.id))) || camps;
  if(camps == null) return <ErrorComponent/>
  return (
    <div className="w-11/12 md:w-9/12 mx-auto">
      <CampaingsTable camps={camps} />
    </div>
  )
}