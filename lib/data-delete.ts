"use server"
import { createClient } from "@/utils/supabase/server";

export const deletePlayerByID = async (playerID: string): Promise<any> => {
    const supabase = await createClient();
    const { error } = await supabase
        .from('player')
        .delete()
        .eq('id', playerID);
}

/**
 * Delete a pending by it's ID
 * @param pendingID the ID of the pending you want to delete
 */
export const deletePending = async (pendingID: string) => {
    const supabase = await createClient();
    const { error } = await supabase
        .from('pending')
        .delete()
        .eq('id', pendingID);

}

export const deleteBuilding = async (buildingID: string) => {
    const supabase = await createClient();
    const { error } = await supabase
        .from('building')
        .delete()
        .eq('id', buildingID)

}