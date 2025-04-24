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

const BuildingHandler = ({ campID, isDM = false }: { campID: string, isDM?: boolean }) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [total, setTotal] = useState(0);
  const [trigger , setTrigger] = useState(false);
  
  useEffect(() => {
    const builds = async () => {
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
    builds()
  }, [trigger])

  useEffect(() => {
    const channels = supabase.channel('custom-all-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'building' , filter: 'campaignID=eq.' + campID},
      (payload: any) => {
        if(isEmpty(payload.old)){
          setBuildings(prev => [...prev, payload.new as Building])
        }else{
          setBuildings(prev => {
            return prev.map(item => {
              if(item.id === payload.old.id){
                return payload.new as Building
              }else{
                return item
              }
            })

          })
        }
      }
    )
    .subscribe()

    return () => {
      supabase.removeChannel(channels)
    }
  }, [supabase])

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
        <Button onClick={() => { addEddieToParty(toPlayer(), campID) }} variant={'outline'}>
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
