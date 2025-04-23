"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getBuilingCompiled, insertBuilding } from "@/lib/data-insert";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Player } from "@/lib/types";
import supabase from "@/utils/supabase/supabase";
import { addEddieToParty } from "@/lib/data-update";

export default function FormBuilding({campID}:{campID : string}) {

    const [buildingtype, setBuildingType] = useState<any[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [sizes, setSizes] = useState<any[]>([]);
    const [insert, setInsert] = useState<{msg: string, isVisible: boolean}>({msg: "Palazzo Aggiunto con successo", isVisible: false})

    useEffect(() => {
        const setBuild = async () => {
            const supa = createClient();
            const {data , error} = await supa
            .from('building-type')
            .select('*')
            setBuildingType(data != null ? data : []);
        }
        const setSize = async () => {
          const supa = createClient();
          const {data , error} = await supa
          .from('sizes')
          .select('*');
          setSizes(data != null ? data : []);
        }
        const getPlayers = async () => {
          const supa = createClient();
          const {data, error} = await supa
          .from("player")
          .select("*")
          .eq("campaignID", campID);
          if(data != null)setPlayers(data) 
        }
        getPlayers()
        setSize()
        setBuild()
    } , [])

    const handleFormAction = (e : FormData) => {
      if(players.length == 0) return
      e.append("campID", campID)
      const build = getBuilingCompiled(e);
      build.then()
      
      .then(data => {
        let res= players.find(player => player.eddie < data.priceatplayer)
        if(res == undefined){
          insertBuilding(data);
          setInsert({msg: insert.msg + " con prezzo di " + data.priceatplayer + "per ogni giocatore ", isVisible: true})
          addEddieToParty((-1*parseInt(data.priceatplayer)), campID);
        }else{
          setInsert({msg: "Impossibile creare il palazzo poiché " + res.name + 
            " non ha abbastanza eddie, questo palazzo richiede " + data.priceatplayer + " eddie"
            , isVisible: true})
        }
      })
    }

  return (
    <div>
      <div className="text-center w-4/12 mx-auto">
        <h2 className="text-2xl">Create a new building</h2>
        <form className="text-center grid gap-4 pt-4">
          <Label className="text-start">Name:</Label>
          <Input placeholder="Factory4$" name="name" required></Input>
          {SelectType(buildingtype)}
          {SelectSize(sizes)}
          <Button formAction={handleFormAction}>Submit</Button>
        </form>
        {
          insert.isVisible &&
            <div>
              {insert.msg}
            </div>
        }
      </div>
    </div>
  );
}

const SelectType = (typename: any[] | null) => {

  return (
    <Select name="type" required>
      <SelectTrigger className="mx-auto w-full">
        <SelectValue placeholder="Select a Building" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo di palazzo</SelectLabel>
          {typename != null ?
            typename.map(type => <SelectItem key={type.typename} value={type.typename}>{type.typename}</SelectItem>)
            :
            <SelectItem value="error">error in fetching data</SelectItem>
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const SelectSize = (sizes: any[] | null) => {

  return (
    <Select name="size" required>
      <SelectTrigger className="mx-auto w-full">
        <SelectValue placeholder="Select a Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Dim del palazzo</SelectLabel>
          {sizes != null ?
            sizes.map(size => <SelectItem key={size.size} value={size.size}>{size.size}</SelectItem>)
            :
            <SelectItem value="error">error in fetching data</SelectItem>
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}