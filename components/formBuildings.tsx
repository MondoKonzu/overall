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
import { insertBuilding } from "@/lib/data-insert";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function FormBuilding({campID}:{campID : string}) {

    const [buildingtype, setBuildingType] = useState<any[]>([]);
    const [sizes, setSizes] = useState<any[]>([]);

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
        setSize()
        setBuild()
    } , [])

  return (
    <div>
      <div className="text-center w-4/12 mx-auto">
        <h2 className="text-2xl">Create a new building</h2>
        <form className="text-center grid gap-4 pt-4">
          <Label className="text-start">Name:</Label>
          <Input placeholder="Factory4$" name="name" required></Input>
          {SelectType(buildingtype)}
          {SelectSize(sizes)}
          <Button formAction={(e) => {e.append("campID", campID), insertBuilding(e)}}>Submit</Button>
        </form>
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