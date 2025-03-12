"use server"
import { createClient } from "@/utils/supabase/server";
import { Pending, Player } from "./types";
import { deletePending } from "./data-delete";

export const updatePlayerEddie = async (player : Player) => {
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('player')
    .update({ eddie: player.eddie })
    .eq("id" ,player.id)
    .select();

    if(error) return null;
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


            

    if(error != null){
        console.log("error " + error);
    }else{
        console.log("ok " + data)
        deletePending(pending.id);
    }
}