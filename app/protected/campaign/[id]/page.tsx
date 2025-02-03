"use server"

import { fetchCampaignByID, fetchCampaignPlayers, fetchThisUser } from "@/lib/data-fetcher"

const checkAva = async (campaign: any | null, players: any[] | null) => {
    // Check if campaign is available to user
    let ans = true;
    const user = await fetchThisUser();
    if(!user || !campaign || !players) return false;
    if(user!.id != campaign.masterID) {
        ans = false;
    }
    players.forEach(player => 
        {if(player.userID == user.id){ans = true}}
    )
    return ans;
}

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    const campaign = await fetchCampaignByID(id);
    const players = await fetchCampaignPlayers(id);
    const ava = await checkAva(campaign, players)
    if(!ava) {
        return <div className="p-12">Not found</div>
    }else{
    return (
        <div className="p-12">
            <h1>Campaign's name: {campaign.name}</h1>
            <div>
                <h3>Campaign's players:</h3>
                {players!.map(player =>
                    <p>{player.name}</p>
                )}
            </div>
        </div>
    )}
  }