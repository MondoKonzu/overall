"use server"
import { createClient } from "@/utils/supabase/server";
import { Pending, Player } from "./types";
import { deletePending } from "./data-delete";

export const updatePlayerEddie = async (player: Player) => {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('player')
        .update({ eddie: player.eddie })
        .eq("id", player.id)
        .select();

    if (error) return null;
    return data;
}

/**
 * 
 * @param pending 
 */
export const updatePlayerPendingStatus = async (pending: Pending) => {

    console.log(pending)
    console.log(pending.campaingID)
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('player')
        .update({ 'campaignID': pending.campaingID })
        .eq('id', pending.playerID)
        .select()




    if (error != null) {
        console.log("error " + error);
    } else {
        console.log("ok " + data)
        deletePending(pending.id);
    }
}

export const addEddieToParty = async (eddie: number, campID: string) => {
    let party: Player[] = []
    const getParty = async () => {
        const supabase = await createClient();
        let { data: player, error } = await supabase
            .from('player')
            .select('*')
            .eq("campaignID", campID);
        if (error) return []
        return player as Player[];
    }
    party = await getParty();
    console.log("das")

    const set = async () => {
        if (party) {
            for (let i = 0; i < party.length; i++) {
                const supabase = await createClient();
                const { data, error } = await supabase
                    .from('player')
                    .update({ "eddie": (parseInt(party[i].eddie) + eddie) })
                    .eq('id', party[i].id)
                    .select();
            }
        }
    }
    set()
}