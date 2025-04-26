import { App } from "@/components/ui/applicationsim"
import DesktopSim from "@/components/ui/desktop"
import { Campaign, Player } from "@/lib/types"
import { useState } from "react"
import BuildingHandler from "../building"
import { fetchCampaignPlayers } from "@/lib/data-fetcher"
import { CampaignContext, CampaignProvider } from "../CampaignContext"

export const PlayerPage = async ({campaign }: {campaign: Campaign | null }) => {
    const players = await fetchCampaignPlayers(campaign!.id)
    if (!players || !campaign) return <div>Not found</div>
    return (
        <div className="bg-[url(/wallpaper-player.png)] bg-cover">
            <DesktopSim className="grid grid-cols-12 gap-8 p-8">
                <App appInfo={{appName: "camp:" + campaign.name, icon: "/spugna.png", id: "1", status: "close"}}
                    set={{width: "30vw"}}                    
                    >
                    <div className="p-12">
                        <h1>Campaign's name: {campaign.name}</h1>
                        <div>
                            <h3>Campaign's players:</h3>
                            {players!.map(player =>
                                <p key={player.id}>{player.name}</p>
                            )}
                        </div>
                    </div>
                </App>
                <App appInfo={{appName: "buildings", icon:"/spugna.png", id: "2", status: "close"}}
                    set={{ width: "50vw", height: "75vh", position: {x:10, y:10}}}
                >
                    <CampaignProvider campID={campaign.id}>
                        <BuildingHandler campID={campaign.id}/>
                    </CampaignProvider>
                </App>
            </DesktopSim>
        </div>
    )
}