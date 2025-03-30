import { App } from "@/components/ui/applicationsim";
import { fetchCampaignPending } from "@/lib/data-fetcher";
import PendingHandler from "../pendingHandler";
import DesktopSim from "../../../../components/ui/desktop";

export const DM = async ({ campID }: { campID: string }) => {
    const pending = await fetchCampaignPending(campID);
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
                set={{width: "fit-content"}}
                >
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
                </App>
                <App appInfo={{
                    icon: "/spugna.png",
                    appName: "22", status: "close", id: "2"
                }}
                    set={{width: "30vw", height: "20vh"}}
                >
                    <iframe className="w-full h-[90%]" src="http://localhost:3000/protected/buildings"></iframe>
                </App>
                <App appInfo={{
                    icon: "/spugna.png",
                    appName: "33", status: "close", id: "3"
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores animi ducimus itaque tempora nesciunt id voluptas nam, quisquam totam distinctio reiciendis laboriosam tenetur! Praesentium voluptatibus placeat optio soluta culpa repellat.
                </App>
            </DesktopSim>
        </div>
    )
}