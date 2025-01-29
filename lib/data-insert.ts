"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";

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

  if(error){
    return redirect("/nobuono")
  }
  return redirect("/buono")
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