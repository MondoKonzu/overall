import { redirect } from "next/navigation";
import Usercard from "@/components/usercard";
import { fetchPlayers, fetchUserPlayers, fetchThisUser, fetchCampaignDmUser, fetchCampaigns, fetchCampaignPlayerUser } from "@/lib/data-fetcher";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertCampaign } from "@/lib/data-insert";
import Link from "next/link";
import CampaingsTable from "@/components/camp-table";
import ErrorComponent from "@/components/error-comp";
import Tabs from "@/components/tabs";

export default async function ProtectedPage() {
  const user = await fetchThisUser();

  if (!user) {
    return redirect("/sign-in");
  }


  return (
      <div className="px-16">
        <Tabs>
          {[
            { trigger: "User Info", body: <Usercard/>},
            { trigger: "Le tue campagne", body: <CampaignDmInfo />},
            { trigger: "Le campagne dove giochi", body: <CampUserPlayer /> ,isActive: true},
            { trigger: "Entra in nuove campagne", body: <CampsJoin />},
          ]}
        </Tabs>
      </div>
  );
}

const CampaignDmInfo = async () => {
  const campaigns = await fetchCampaignDmUser();
  return (
    <div className="grid grid-cols-2">
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
    <CampaingsTable camps={camp}/>
  )
}

const CampsJoin = async () => {
  const camps = await fetchCampaigns()
  if(camps == null) return <ErrorComponent/>
  return (
    <div className="grid grid-cols-2">
      <CampaingsTable camps={camps} />
      <div></div>
    </div>
  )
}