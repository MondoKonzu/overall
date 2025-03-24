import {App} from "@/components/ui/applicationsim";
import { fetchCampaignPending } from "@/lib/data-fetcher";
import PendingHandler from "../pendingHandler";
import DesktopSim from "../../../../components/ui/desktop";

export const DM = async ({campID} : {campID : string}) => {
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
        <DesktopSim className="grid grid-cols-3 gap-8 p-8">
            <App appInfo={{appName: "11", status:"close",id: "1"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores animi ducimus itaque tempora nesciunt id voluptas nam, quisquam totam distinctio reiciendis laboriosam tenetur! Praesentium voluptatibus placeat optio soluta culpa repellat.
            </App>
            <App appInfo={{appName: "22", status:"close",id: "2"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores animi ducimus itaque tempora nesciunt id voluptas nam, quisquam totam distinctio reiciendis laboriosam tenetur! Praesentium voluptatibus placeat optio soluta culpa repellat.
            </App>
            <App appInfo={{appName: "33", status:"close",id: "3"}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores animi ducimus itaque tempora nesciunt id voluptas nam, quisquam totam distinctio reiciendis laboriosam tenetur! Praesentium voluptatibus placeat optio soluta culpa repellat.
            </App>
        </DesktopSim>
    </div>
    )
}