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

/**
 * 
 * @param userID the id of the user
 * @returns every pg of this user
 */
export const fetchUserPlayers = async (userID: string) => {
  const supabase = await createClient();
  const {data: players, error} = await supabase
  .from("player")
  .select("*")
  .eq("userID", userID);

  if(error)return null;

  return players;
}

export const fetchThisUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){ return null;}

  return user;
}

export const fetchCampaignDmUser = async () =>{
  const user = await fetchThisUser();
  const supabase = await createClient();
  if(!user) return ["user error"];
  const {data: campaigns, error} = await supabase
  .from("campaign")
  .select("*")
  .eq("masterID", user.id);

  if(error) return ["fetch error"];
  return campaigns;
}

export const fetchCampaignByID = async ( id : number | string ) => {
  const supabase = await createClient();
  const { data: campaign, error } = await supabase
  .from("campaign")
  .select("*")
  .eq("id", id);
  if(error) return null;
  return campaign[0];
}

export const fetchCampaignPlayers = async (campaignID : number | string) => {
  const supabase = await createClient();
  const { data: players, error } = await supabase
  .from("player")
  .select("*")
  .eq("campaignID", campaignID);

  if(error) return null;
  return players;
}