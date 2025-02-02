import { fetchCampaignByID, fetchCampaignPlayers } from "@/lib/data-fetcher"
import { error } from "console";

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const id = (await params).id
    const campaign = await fetchCampaignByID(id);
    const players = await fetchCampaignPlayers(id);
    if(!campaign || !players){
        return <div>Not found</div>
    }
    return (
        <div className="p-12">
            <h1>Campaign's name: {campaign.name}</h1>
            <div>
                <h3>Campaign's players:</h3>
                {players.map(player =>
                    <p>{player.name}</p>
                )}
            </div>
        </div>
    )
  }