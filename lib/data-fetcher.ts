import { createClient } from "@/utils/supabase/server";

/**
 * Fetch the DB for all players data
 * @returns null if there were error, any other case an array of players
 */
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

/**
 * Search the DB for every building type
 * @returns null in case of error, an array of {id, price, earn, typename} otherwise
 */
export const fetchBulidingType = async() => {
  const supabase = await createClient();
let { data: buildingtypes, error } = await supabase
  .from('building-type')
  .select('*')

  if(error){
    return null;
  }

  return buildingtypes;

}

/**
 * Search the DB for every building size
 * @returns null in case of error , an array of {size, multipier} otehrwise
 */
export const fetchSizes = async() => {
  const supabase = await createClient();
let { data: buildingsize, error } = await supabase
  .from('sizes')
  .select('*');

  if(error){
    return null;
  }

  return buildingsize;

}