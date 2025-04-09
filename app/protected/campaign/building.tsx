import { fetchBuildings, fetchCampaigns, fetchPlayers, fetchSizes } from '@/lib/data-fetcher'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FormBuilding from '@/components/formBuildings'
  

const Building = async ({campID} : {campID: string}) => {
    let buildings = await fetchBuildings()
    console.log(buildings)
    if(buildings != null) {
        buildings = buildings.filter(item => item.campaignID == campID)
    }else{
        buildings = []
    }
    return (
        <div>
            {buildings.map(build => 
                <div key={build.id}>
                    {build.name}
                </div>
            )}
            <FormBuilding campID={campID} />
        </div>
    )
}

export default Building
