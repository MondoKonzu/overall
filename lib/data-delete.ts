"use server"
import { createClient } from "@/utils/supabase/server";

export const deletePlayerByID = async (formData: FormData) : Promise<any> => {
    const supabase = await createClient();
    const playerID = formData.get("playerID")?.toString();
    const { error } = await supabase
    .from('player')
    .delete()
    .eq('id', playerID);
}