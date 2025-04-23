import FormPlayer from "@/components/formPlayer";
import { App } from "@/components/ui/applicationsim";
import DesktopSim from "@/components/ui/desktop";
import { fetchCampaignPending } from "@/lib/data-fetcher";
import { User } from "@supabase/supabase-js";

export const NewUser = async ({ campID, user }: { campID: string, user: User }) => {
    let alreadyInList = -1;
    const pendings = await fetchCampaignPending(campID);
    if (pendings != null && pendings.length > 0) {
        alreadyInList = pendings.findIndex(pend => pend.player.userID == user.id)
    }
    if (alreadyInList == -1) {
        return (
            <DesktopSim className="p-20">
                {
                    alreadyInList == -1 ?
                        <App appInfo={{ appName: "New Player", icon: "/spugna.png", id: "1", status: "close" }}>
                            <div className="p-12">
                                <h2>You are not a player for this campaign</h2>
                                <p>do you want to join?</p>
                                <FormPlayer className="mt-8" campID={campID} />
                            </div>
                        </App>
                    :
                        <App appInfo={{ appName: "Wait", icon: "/spugna.png", id: "2", status: "close" }}>
                            <div>
                                <h2 className="text-3xl">A request was already sent</h2>
                                <p>Now wait for the DM to accept it</p>
                                <h3 className="text-xl">PG:</h3>
                                <div>
                                    <p>{pendings![alreadyInList].player.name}</p>
                                    <p>{pendings![alreadyInList].player.eddie}</p>
                                </div>
                            </div>
                        </App>
                }
            </DesktopSim>
        )


    }
}