import { App } from "@/components/ui/applicationsim"
import DesktopSim, { BuildingAppIcon, PartyAppIcon } from "@/components/ui/desktop"
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
            <DesktopSim>
                <App appInfo={{appName: "camp:" + campaign.name, icon: <PartyAppIcon color1="oklch(58.6% 0.253 17.585)" color2="oklch(51.8% 0.253 323.949)"/>, id: "1", status: "close"}}
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
                <App appInfo={{appName: "buildings", icon: <BuildingAppIcon/>, id: "2", status: "close"}}
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