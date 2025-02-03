import { redirect } from "next/navigation";
import Usercard from "@/components/usercard";
import { fetchPlayers, fetchUserPlayers, fetchThisUser, fetchCampaignDmUser, fetchCampaigns } from "@/lib/data-fetcher";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertCampaign } from "@/lib/data-insert";
import Link from "next/link";
import CampaingsTable from "@/components/camp-table";
import ErrorComponent from "@/components/error-comp";

export default async function ProtectedPage() {
  const user = await fetchThisUser();

  if (!user) {
    return redirect("/sign-in");
  }


  return (
    <div className="min-h-screen bg-gradient-to-t from-violet-500/50 via-violet-500/25 to-transparent">
      <div className="grid grid-cols-3 px-16">
        <Usercard/>
        <CampaignDmInfo />
        <CampsJoin />
      </div>
    </div>
  );
}

const CampaignDmInfo = async () => {
  const campaigns = await fetchCampaignDmUser();
  return (
    <div className="border p-4 rounded-xl bg-slate-900/50 backdrop-blur-md">
      <div>
        <h3>Campagne di cui sei Master</h3>
        {campaigns.map(campaign => 
          <Link href={`/protected/campaign/${campaign.id}`} key={campaign.id}>
            {campaign.name}
          </Link>
        )}
      </div>
          <form className="grid gap-4 mt-8">
      <Label htmlFor="name">Campaign name:</Label>
      <Input 
        name="name"
        type="text"
        placeholder="FireCity"
        required  
      />
      <Button variant={"outline"} formAction={insertCampaign}>Create campaign</Button>
    </form>
    </div>
  )
}

const CampsJoin = async () => {
  const camps = await fetchCampaigns()
  if(camps == null) return <ErrorComponent/>
  return <CampaingsTable camps={camps} />
}