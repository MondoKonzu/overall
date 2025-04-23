"use server"
import { createClient } from "@/utils/supabase/server";
import { Pending, Player } from "./types";
import { deletePending } from "./data-delete";
import { fetchCampaignPlayers } from "./data-fetcher";

/**
 * 
 * @param player the player with the new eddie value
 * @returns the new player with updates done
 */
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

/**
 * When given negative number remove the amount of eddie
 * @param eddie the amount to add to every member of the party
 * @param campID the campaign to which the party is member
 */
export const addEddieToParty = async (eddie: number, campID: string) => {
    let party: Player[] = await fetchCampaignPlayers(campID) || [];

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