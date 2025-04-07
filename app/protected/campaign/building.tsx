import { fetchBuildings, fetchBulidingType, fetchCampaigns, fetchPlayers, fetchSizes } from '@/lib/data-fetcher'
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
import FormBuild from '@/components/formBuildings'
  

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
            <FormBuild campID={campID} />
        </div>
    )
}

const BuildingForm = async () => {
    const types = await fetchBulidingType()
    const sizes = await fetchSizes()
    console.log(sizes)
    return (types && sizes) ?
        (
            <form className='flex flex-col gap-2 p-2 border rounded m-4'>
                <Label>Building Name: </Label>
                <Input name='bName'></Input>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type of Building" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map(type => 
                        <SelectItem key={type.id} value={type.earn}>
                            {type.typename}
                        </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Size ofBuilding" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map(size => 
                        <SelectItem key={size.size} value={size.multiplier}>
                            {size.size}
                        </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <Button className='w-24'>Submit</Button>
            </form>
        )
    :
        (<div>No buono</div>)
}

export default Building
