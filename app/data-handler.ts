import { createClient } from "@/utils/supabase/server";

export const fetchPlayers = async () => {
    const supabase = await createClient();
    
  let { data: players, error } = await supabase
  .from('player')
  .select('name')
  
    if(error){
      console.error(error.cause);
      return null;
    }
  
    return players;
  }