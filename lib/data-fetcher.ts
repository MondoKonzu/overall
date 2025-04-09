import { createClient } from "@/utils/supabase/server";
import { Building, BuildingType, Campaign, Pending, Player, RelatedPendings, Sizes } from "./types";
import { redirect } from "next/navigation";

/**
 * Fetch the DB for all players data
 * @returns null if there were error, any other case an array of players
 */
export const fetchPlayers = async () => {
    const supabase = await createClient();
    
  let { data: players, error } = await supabase
  .from('player')
  .select('*')
  
    if(error){
      console.error(error.cause);
      return null;
    }
  
    return players as Player[];
  }

/**
 * Search the DB for every building type
 * @returns null in case of error, an array of {id, price, earn, typename} otherwise
 */
export const fetchBuilidingType = async() => {
  const supabase = await createClient();
let { data: buildingtypes, error } = await supabase
  .from('building-type')
  .select('*')

  if(error){
    return null;
  }

  return buildingtypes as BuildingType[];

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

  return buildingsize as Sizes[];

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

  return players as Player[];
}

/**
 * To get supabase.auth.getUser()
 * 
 * @returns datas of the connected user
 */
export const fetchThisUser = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){ return null;}

  return user;
}

/**
 * 
 * @returns every campaign where the user is the DM
 */
export const fetchCampaignDmUser = async () =>{
  const user = await fetchThisUser();
  const supabase = await createClient();
  if(!user) return ["user error"];
  const {data: campaigns, error} = await supabase
  .from("campaign")
  .select("*")
  .eq("masterID", user.id);

  if(error) return ["fetch error"];
  return campaigns as Campaign[];
}

/**
 * 
 * @param id the id of the campaign to search
 * @returns the campaign data
 */
export const fetchCampaignByID = async ( id : number | string ) => {
  const supabase = await createClient();
  const { data: campaign, error } = await supabase
  .from("campaign")
  .select("*")
  .eq("id", id);
  if(error) return null;
  return campaign[0] as Campaign;
}

/**
 * 
 * @param campaignID the id of the campaign to search
 * @returns every Plaayer of it
 */
export const fetchCampaignPlayers = async (campaignID : number | string | null) => {
  const supabase = await createClient();
  const { data: players, error } = campaignID != null ?
  await supabase
  .from("player")
  .select("*") 
  .eq("campaignID", campaignID) :
  await supabase
  .from("player")
  .select("*")
  .is("campaignID", null)

  if(error) return null;
  return players as Player[];
}

/**
 * The basic fetch return any campaign existing
 * in case of error just null;
 * 
 * @returns every campaign existing
 */
export const fetchCampaigns = async () => {
  const supabase = await createClient();
  const { data: campaigns, error } = await supabase
  .from("campaign")
  .select("*")

  if(error) return null;

  return campaigns as Campaign[];
}

/**
 * 
 * @param campID the campaign for which you want to fetch the players
 * @returns every request to join the campaign and the relative player
 * to do so it uses the type RelatedPlayer
 */
export const fetchCampaignPending = async (campID: string) => {
  const supabase = await createClient();
  let { data: pending, error } = await supabase
  .from('pending')
  .select("*")
  .eq("campaingID", campID);

  if(error) return null;
  const players = await fetchCampaignPlayers(null);
  if(players == null) return null;
  const ans = (pending as Pending[]).map(pen => 
    (
      {
        pending: pen,
        player: players?.find(player => player.id = pen.playerID)
      } as RelatedPendings
    )
    )
  return ans ;
}

/**
 * 
 * @returns the campaigns in which the user is a player
 */
export const fetchCampaignPlayerUser = async () =>  {
  const user = await fetchThisUser();
  if(!user) return redirect("/sign-in");
  const players = await fetchUserPlayers(user.id);
  const camps = await fetchCampaigns();
  const ans : Campaign[] = [];
  let tmp;
  players?.forEach(player => {
    tmp = camps?.find(camp => camp.id == player.id)
    tmp !== undefined && ans.push(tmp);
    }
  )
  return ans;
}

export const fetchBuildings = async () => {
  const supabase = await createClient();
  let { data: building, error } = await supabase
  .from('building')
  .select('*');

  if(error) return null;
  return building as Building[];         
}