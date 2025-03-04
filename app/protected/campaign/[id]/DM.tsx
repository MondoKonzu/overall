import { AcceptPending, RefusePending, RenderBack } from "@/components/render-back";
import Draggable from "@/components/ui/draggable";
import { Label } from "@/components/ui/label";
import { fetchCampaignPending } from "@/lib/data-fetcher";

export const DM = async ({campID} : {campID : string}) => {
    const pending = await fetchCampaignPending(campID);    
    return (
        <div>
        Welcome DM
        {(pending != null && pending.length > 0) && 
            <div className="grid">
                {pending.map(req => 
                <div key={req.pending.id} className="flex flex-row gap-4 p-4">
                    <p className="content-center">{req.player.name}</p>
                    <p className="content-center">{req.player.eddie}$</p>
                    <div className="grid grid-cols-3 gap-4">
                        <Label className="content-center">Accept:</Label>
                        <RenderBack>
                            <AcceptPending pending={req.pending}/>
                        </RenderBack>
                        <RenderBack>
                            <RefusePending playerID={req.player.id} />
                        </RenderBack>
                    </div>
                </div>
                )
                }
            </div>
        }
        <Draggable />
    </div>
    )
}