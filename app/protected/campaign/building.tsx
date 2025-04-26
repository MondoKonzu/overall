"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Building } from '@/lib/types';
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
import supabase from '@/utils/supabase/supabase';
import { isEmpty } from 'lodash';
import { useCampaignContext } from './CampaignContext';

const BuildingHandler = ({ campID, isDM = false }: { campID: string, isDM?: boolean }) => {
  const buildings = useCampaignContext().buildings.buildings 
  const [total, setTotal] = useState(0);
  const party = useCampaignContext().party.party

  useEffect(() => {
    if (buildings == null) return;
    let ans = 0
    buildings.forEach(build => ans += parseInt(build.earnatplayer));
    setTotal(ans);
  }, [buildings]);
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
            {
              isDM &&
              <TableHead>Delete</TableHead>
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildings.map((build) => (
            <TableRow key={build.id}>
              <TableCell className="font-medium">{build.name}</TableCell>
              <TableCell>{build.priceatplayer}</TableCell>
              <TableCell>{build.earnatplayer}</TableCell>
              {
                isDM &&
                <TableCell><DeleteButton buildingID={build.id} /></TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {
        isDM && 
        <Button onClick={() => { 
          if(toPlayer() < 0){
            let tmp = toPlayer()*-1
            if(party.find(player => parseInt(player.eddie) < tmp) != undefined){
              console.log("nah")
              return
            }
          }
            addEddieToParty(toPlayer(), campID)
         }} variant={'outline'}>
        Get Check {toPlayer()}
      </Button>
      }
    </div>
  )
    :
    (<div>Loading...</div>)
}

const DeleteButton = ({ buildingID }: { buildingID: string }) => {
  return (
    <Button onClick={() => { deleteBuilding(buildingID) }} variant={'outline'}>
      <X />
    </Button>
  )
}

export default BuildingHandler
