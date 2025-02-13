"use server"

import FormPlayer from "@/components/formPlayer";
import RenderBack from "@/components/render-back";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { deletePlayerByID } from "@/lib/data-delete";
import { fetchPlayers } from "@/lib/data-fetcher";
import { fetchCampaignByID, fetchCampaignPending, fetchCampaignPlayers, fetchThisUser, fetchUserPlayers } from "@/lib/data-fetcher"
import { User } from "@supabase/supabase-js";
import { Check, X } from "lucide-react";
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
        return <NewUser campID={id} user={user}/>
    }else if(ava == 0){
        return<Player campaign={campaign} players={players}/>
    }else{
        return <DM campID={campaign!.id}/>
    }
  }


const NewUser = async ({campID, user} : {campID : string, user: User}) => {
    let alreadyInList = -1;
    const pendings = await fetchCampaignPending(campID);
    if(pendings != null){
        alreadyInList = pendings.findIndex(pend => pend.player.userID == user.id)
    }
    if(alreadyInList == -1){
        return (
            <div className="p-12">
                <h2>You are not a player for this campaign</h2>
                <p>do you want to join?</p>
                <FormPlayer className="mt-8" campID={campID}/>
            </div>
        )
    }else{
        return(
        <div>
            <h2 className="text-3xl">A request was already sent</h2>
            <p>Now wait for the DM to accept it</p>
            <h3 className="text-xl">PG:</h3>
            <div>
                <p>{pendings![alreadyInList].player.name}</p>
                <p>{pendings![alreadyInList].player.eddie}</p>
            </div>
        </div>
        )
    }


}

const Player = ({players, campaign} : {players: any[] | null, campaign: any}) => {
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
    )
}

const DM = async ({campID} : {campID : string}) => {
    const pending = await fetchCampaignPending(campID);    
    return (
        <RenderBack>

        <div>
        Welcome DM
        {pending != null && 
            <div className="grid">
                {pending.map(req => 
                <div key={req.pending.id} className="flex flex-row gap-4 p-4">
                    <p className="content-center">{req.player.name}</p>
                    <p className="content-center">{req.player.eddie}$</p>
                    <div className="grid grid-cols-3 gap-4">
                        <Label className="content-center">Accept:</Label>
                        <form>
                        <Button className="bg-green-600 hover:bg-green-800">
                            <Check className="text-white scale-150" />
                        </Button>
                        </form>
                        <form>
                            <input name="playerID" value={req.pending.playerID} readOnly className="hidden"></input>
                        <Button className="bg-red-600 hover:bg-red-800" formAction={deletePlayerByID}>
                            <X className="text-white scale-150" />
                        </Button>
                            </form>
                    </div>
                </div>
                )
                }
            </div>
        }
    </div>
                </RenderBack>
    )
}