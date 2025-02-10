"use server"

import FormPlayer from "@/components/formPlayer";
import { fetchCampaignByID, fetchCampaignPlayers, fetchThisUser } from "@/lib/data-fetcher"
import { redirect } from "next/navigation";

/**
 * 
 * @param campaign the camapaign you want to check availability
 * @param players the player of the campaign
 * @returns a number (-1 = not a player, 0 = a player, 1 the DM)
 */
const checkAva = async (campaign: any | null, players: any[] | null) : Promise<number> => {
    // Check if campaign is available to user
    let ans = -1;
    const user = await fetchThisUser();
    if(!user || !campaign || !players) return -2;
    players.forEach(player => 
        {if(player.userID == user.id){ans = 0}}
    )
    if(user!.id == campaign.masterID) {
        ans = 1;
    }
    return ans;
}

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    //the real code is here
    const user = await fetchThisUser();
    const id = (await params).id
    const campaign = await fetchCampaignByID(id);
    const players = await fetchCampaignPlayers(id);
    const ava = await checkAva(campaign, players);

    if(user == null){
        return redirect("/sign-in");
    }

    if(ava == -1) {
        return <div className="p-12">
            <h2>You are not a player for this campaign</h2>
            <p>do you want to join?</p>
            <FormPlayer campID={id}/>
        </div>
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