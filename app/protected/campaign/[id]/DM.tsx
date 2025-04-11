import { App } from "@/components/ui/applicationsim";
import { fetchCampaignPending, fetchCampaignPlayers } from "@/lib/data-fetcher";
import PendingHandler from "../pendingHandler";
import DesktopSim from "../../../../components/ui/desktop";
import Building from "../building";
import Tabs from "@/components/tabs";

export const DM = async ({ campID }: { campID: string }) => {
    const pending = await fetchCampaignPending(campID);
    const players = await fetchCampaignPlayers(campID);
    return (
        <div>
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
                    set={{ width: "fit-content" }}
                >
                    <Tabs className="rounded-none border-none min-w-[400px]">
                        {[
                            {
                                trigger: "Pendings", body:
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
                                            <div className="flex flex-col gap-4 p-4">There are no pending</div>
                                        }
                                    </>
                            },
                            {trigger: "Players", body: 
                                <div>
                                    {players != null && players.length > 0 ? 
                                        players.map(player => <div key={player.id}>{player.name} + {player.eddie}</div>)
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
                    set={{ width: "50vw" }}
                >
                    <Building campID={campID}>

                    </Building>
                </App>
                <App appInfo={{
                    icon: "/spugna.png",
                    appName: "33", status: "close", id: "3"
                }} set={{ width: "10vw" }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum earum pariatur dolore veritatis libero. Optio molestias aut distinctio quae at ea, tenetur ab, delectus tempora error, ut voluptas quia nisi!
                </App>
            </DesktopSim>
        </div>
    )
}