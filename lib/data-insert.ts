"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import { fetchThisUser } from "./data-fetcher";
import { Palanquin } from "next/font/google";

export const insertBuilding = async (formData : FormData) : Promise<any> => {
    const supabase = await createClient();
    const name = formData.get("name")!.toString();
    const type = formData.get("type")!.toString();
    const size = formData.get("size")!.toString();
    const typeID = await getIdbyTypeName(type);
    const priceEarn = await getBuildingRow(type);
    const multiplier = await getMultuplierRow(size); 

    if(!priceEarn || !multiplier || !typeID) {
        return null;
    }

    console.log("ok", name + type + size)

    const { data, error } = await supabase
    .from('building')
    .insert([
    { name: name, typeID: typeID, sizeID: size,
        earnatplayer: (priceEarn[1] * multiplier),
        priceatplayer: (priceEarn[0] * multiplier) 
     },
  ])
  .select()

//   if(error){
//     return redirect("/nobuono")
//   }
//   return redirect("/buono")

}

//returns an array of [price, earn] for the building
//type given in input as a string
const getBuildingRow = async (typename : string) => {
    const supabase = await createClient();
    let { data: typerow, error } = await supabase
    .from('building-type')
    .select("*")
    .eq("typename" , typename);
    if (error || !typerow) {
        return null;
    }

    return [typerow[0].price, typerow[0].earn];
}

/**
 * 
 * @param typename the name of the type of building
 * @returns the id corrisponding to that name 
 */
const getIdbyTypeName = async (typename : string) => {
    const supabase = await createClient();
    const { data : row, error} = await supabase
    .from("building-type")
    .select("*")
    .eq("typename", typename);

    if(error || !row) { return null }
    return row[0].id;
}

const getMultuplierRow = async (size : string) => {
    const supabase = await createClient();
    let { data: sizerow, error} = await supabase
    .from("sizes")
    .select("*")
    .eq("size", size);

    if(error || !sizerow) { return null}

    return sizerow[0].multiplier;
}

/**
 * Create a new campaign in the DB
 * 
 * @param formData campaign name
 */
export const insertCampaign = async (formData : FormData) : Promise<any> => {
    const user = await fetchThisUser();
    const name = formData.get("name")?.toString();
    if(!user || !name) { return null }

    const supabase = await createClient();
    const { data: campaign, error } = await supabase
    .from("campaign")
    .insert([
        { name: name, masterID: user.id },
      ])
    
    if(error) return redirect("/error")
}

export const insertPlayerRequest = async (formData: FormData,) : Promise<any> => {
    const name = formData.get("name")?.toString();
    const eddie = formData.get("eddie")?.toString();
    const campID = formData.get("campID")?.toString();
    const user = await fetchThisUser();
    if(!user) return redirect ("/sign-in");
    const supabase = await createClient();
    const {data, error} = await supabase
    .from("player")
    .insert([
        {"userID": user.id,
            "name": name,
            "eddie": eddie,
            "campaignID": null,
         },
    ]).select();

    if(error) return null;

    insertPending(campID!, data[0].id)
}

const insertPending = async (campID : string, playerID : string) => {
    const supabase = await createClient();
    
    const { data, error } = await supabase
    .from('pending')
    .insert([
      { "campaingID": campID, "playerID": playerID },
    ])
    .select();
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
}