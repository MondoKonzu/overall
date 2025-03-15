import ApplicationSim from "@/components/ui/applicationsim";
import { fetchCampaignPending } from "@/lib/data-fetcher";
import PendingHandler from "../pendingHandler";
import DesktopSim from "../desktop";

export const DM = async ({campID} : {campID : string}) => {
    const pending = await fetchCampaignPending(campID);    
    return (
        <div>
        Welcome DM
        {(pending != null && pending.length > 0) && 
            <div className="grid">
                {pending.map(req => 
                <PendingHandler key={req.pending.id} req={req} className="flex flex-row gap-4 p-4">
                </PendingHandler>
                )
                }
            </div>
        }
        <DesktopSim className="grid grid-cols-6 gap-8 p-8">
            <ApplicationSim appInfo={{appName: "11", status:"open",id: 1}}>
                minne
            </ApplicationSim>
            <ApplicationSim appInfo={{appName: "22", status:"open",id: 2}}>
                minne
            </ApplicationSim>
            <ApplicationSim appInfo={{appName: "33", status:"open",id: 3}}>
                minne
            </ApplicationSim>
        </DesktopSim>
    </div>
    )
}