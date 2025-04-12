import { App } from "@/components/ui/applicationsim";
import { fetchCampaignPending, fetchCampaignPlayers } from "@/lib/data-fetcher";
import {ModifyPlayer, PendingHandler} from "../playerHandler";
import DesktopSim from "../../../../components/ui/desktop";
import Building from "../building";
import Tabs from "@/components/tabs";

export const DM = async ({ campID }: { campID: string }) => {
    const pending = await fetchCampaignPending(campID);
    const players = await fetchCampaignPlayers(campID);
    return (
        <div className="bg-[url(/wallpaper.png)] bg-cover">
            {/* Welcome DM
        {(pending != null && pending.length > 0) && 
            <div className="grid">
                {pending.map(req => 
                <PendingHandler key={req.pending.id} req={req} className="flex flex-row gap-4 p-4">
                </PendingHandler>
                )
                }
            </div>
        } */}
            <DesktopSim className="grid grid-cols-12 gap-8 p-8">
                <App appInfo={{
                    icon: "/spugna.png",
                    appName: "11", status: "close", id: "1"
                }}
                    set={{ width: "fit-content", height: "40vh" }}
                >
                    <Tabs className="rounded-none border-none w-[400px]">
                        {[
                            {
                                trigger: "Pendings", className: "border-none p-0",body:
                                    <>
                                        {(pending != null && pending.length > 0) ?
                                            <div className="grid">
                                                {pending.map(req =>
                                                    <PendingHandler key={req.pending.id} req={req} className="flex flex-row gap-4 p-4">
                                                    </PendingHandler>
                                                )
                                                }
                                            </div>
                                            :
                                            <div>There are no pending</div>
                                        }
                                    </>
                            },
                            {trigger: "Players",className: "border-none p-0", body: 
                                <div>
                                    {players != null && players.length > 0 ? 
                                        players.map(player => 
                                        <ModifyPlayer key={player.id} info={player}/>)
                                        :
                                        <div>There are no players</div>
                                }
                                </div>
                            }
                        ]}
                    </Tabs>
                </App>
                <App appInfo={{
                    icon: "/spugna.png",
                    appName: "22", status: "close", id: "2"
                }}
                    set={{ width: "50vw", position: {x:10, y:10}}}
                >
                    <Building campID={campID}/>
                </App>
            </DesktopSim>
        </div>
    )
}