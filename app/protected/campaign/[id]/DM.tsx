import { App } from "@/components/ui/applicationsim";
import { fetchBuilidingType, fetchCampaignPending, fetchCampaignPlayers, fetchSizes } from "@/lib/data-fetcher";
import {ModifyPlayer, PendingHandler} from "../playerHandler";
import DesktopSim from "@/components/ui/desktop";
import Tabs from "@/components/tabs";
import FormBuilding from "@/components/formBuildings";
import BuildingHandler from "../building";
import { CampaignProvider } from "../CampaignContext";

export const DM = async ({ campID }: { campID: string }) => {
    const pending = await fetchCampaignPending(campID);
    const players = await fetchCampaignPlayers(campID);
    const sizes = await fetchSizes();
    const types = await fetchBuilidingType();
    let tabClass = "border-none rounded-none"
    let trigActive = "bg-cyan-700"
    let trigClass = "cut-edge-br"
    return (
        <div className="bg-[url(/wallpaper.png)] bg-cover">
            <CampaignProvider campID={campID}>
            <DesktopSim>
                <App appInfo={{
                    icon: "/spugna.png",
                    appName: "Party", status: "close", id: "1"
                }}
                    set={{ width: "fit-content", height: "40vh" }}
                >
                    <Tabs className="rounded-none border-none w-[400px]">
                        {[
                            {
                                trigger: "Pendings", trigActiveClass:  trigActive, triggerClass: trigClass,className: tabClass ,body:
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
                            {trigger: "Players", trigActiveClass:  trigActive, triggerClass: trigClass ,className: tabClass , body: 
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
                    appName: "Buildings", status: "close", id: "2"
                }}
                    set={{ width: "50vw", height: "75vh", position: {x:10, y:10}}}
                >
                <Tabs className="border-none">
                        {[
                            {
                            trigger: "All", trigActiveClass:  trigActive, triggerClass: trigClass, className: tabClass , body:
                                <BuildingHandler isDM campID={campID}/>
                        },
                        {
                            trigger: "Form", trigActiveClass:  trigActive, triggerClass: trigClass, className: tabClass , body:
                                <FormBuilding buildingtype={types!} players={players!} sizes={sizes!} campID={campID} />
                        }
                        ]}
                    </Tabs>
                </App>
            </DesktopSim>
            </CampaignProvider>
        </div>
    )
}