"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Building, Player } from '@/lib/types';
import { createClient } from '@/utils/supabase/client';
import { addEddieToParty } from '@/lib/data-update';
import { X } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteBuilding } from '@/lib/data-delete';
import { useRouter } from 'next/navigation'; 

const BuildingHandler = ({ campID }: { campID: string }) => {
  const [buildings, setBuildings] = useState<Building[] | null>(null);
  useEffect(() => {
    const builds = async () => {
      const supabase = createClient();
      let { data: building, error } = await supabase
        .from('building')
        .select('*')
        .eq("campaignID", campID)

      if (error) {
        setBuildings([])
      } else {
        setBuildings(building as Building[])
      }
    }
    builds();
  }, [])
  const toPlayer = () => {
    let ans = 0;
    buildings!.forEach(building => { ans += parseInt(building.earnatplayer) })
    return ans;
  }
  return buildings != null ? (
    <div>
      <Table>
        <TableCaption>A list of your recent builds.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildings.map((build) => (
            <TableRow key={build.id}>
              <TableCell className="font-medium">{build.name}</TableCell>
              <TableCell>{build.priceatplayer}</TableCell>
              <TableCell>{build.earnatplayer}</TableCell>
              <TableCell><DeleteButton buildingID={build.id} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button onClick={() => { addEddieToParty(toPlayer(), campID) }} variant={'outline'}>
        Get Check {toPlayer()}
      </Button>
    </div>
  )
    :
    (<div>Loading...</div>)
}

const DeleteButton = ({ buildingID }: { buildingID: string }) => {
  const router = useRouter();
  return (
    <Button onClick={() => { deleteBuilding(buildingID)}} variant={'outline'}>
      <X />
    </Button>
  )
}

export default BuildingHandler
