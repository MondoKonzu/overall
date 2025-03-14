import ApplicationSim from "@/components/ui/applicationsim";
import { fetchCampaignPending } from "@/lib/data-fetcher";
import PendingHandler from "../pendingHandler";

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
        <div className="grid grid-cols-2">
            <ApplicationSim appName="Powa">
                minne
            </ApplicationSim>

        </div>
    </div>
    )
}