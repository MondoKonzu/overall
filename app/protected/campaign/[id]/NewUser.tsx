"use client"
import FormPlayer from "@/components/formPlayer";
import {Campaign, RelatedPendings } from "@/lib/types";
import { User } from "@supabase/supabase-js";
import { useGlitch } from "react-powerglitch";

export const NewUser = ({ camp, user,pendings }: { camp: Campaign, user: User , pendings: RelatedPendings[] | null}) => {
    const genGlitch = useGlitch({
        "hideOverflow": true,
        "timing": {
          "duration": 8000
        },
      })

    let alreadyInList = -1;
    if (pendings != null && pendings.length > 0) {
        alreadyInList = pendings.findIndex(pend => pend.player.userID == user.id)
    }
    return (
        <div className="w-[100vw] pt-20 h-[100vh] bg-[url(/error-wallpaper.png)] bg-cover overflow-hidden"> 
            <div ref={genGlitch.ref} className="w-[75vw] cut-edge-app backdrop-blur-sm bg-black/50 mx-auto">
            {
                alreadyInList == -1 ?
                        <div className="p-12">
                            <h2>You are not a player for {camp.name}</h2>
                            <p>do you want to join?</p>
                            <FormPlayer className="mt-8" campID={camp.id} />
                        </div>
                    :
                        <div className="p-10">
                            <h2 className="text-3xl">A request was already sent</h2>
                            <p>Now wait for the DM of {camp.name} to accept it</p>
                            <h3 className="text-xl">PG:</h3>
                            <div>
                                <p>{pendings![alreadyInList].player.name}</p>
                                <p>{pendings![alreadyInList].player.eddie}</p>
                            </div>
                        </div>
            }
            </div>
        </div>
    )
}