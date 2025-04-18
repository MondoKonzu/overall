import { App } from "@/components/ui/applicationsim"
import DesktopSim from "@/components/ui/desktop"
import { Campaign, Player } from "@/lib/types"

export const PlayerPage = ({ players, campaign }: { players: Player[] | null, campaign: Campaign | null }) => {

    if (!players || !campaign) return <div>Not found</div>
    return (
        <div className="bg-[url(/wallpaper.png)] bg-cover">
            <DesktopSim className="grid grid-cols-12 gap-8 p-8">
                <App appInfo={{appName: "party", icon: "/spugna.png", id: "1", status: "close"}}
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
            </DesktopSim>
        </div>
    )
}