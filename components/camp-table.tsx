"use client"

import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react'
import { Input } from './ui/input';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';

const CampaingsTable = ({camps} : {camps : any[]}) => {
  const [search, setSearch] = useState("");

    return (
    <div className='grid gap-8 p-8'>
        <div className='md:w-6/12'>
            <Label className='pb-2'>Search: </Label>
            <Input placeholder='campaign name' onChange={(e) => {
                setSearch(e.target.value);
            }}/>
        </div>
        <ScrollArea className='p-4 max-h-[25vh]'>
            <div className='w-full bg-slate-700 p-2 rounded-lg grid gap-2 min-h-16'>
                {findCamps(search, camps)}
            </div>
        </ScrollArea>
    </div>
  )
}

export default CampaingsTable

const findCamps = (search : string, camps: any[]) => {
    const res = camps.filter((camp) => camp.name.toLowerCase().includes(search.toLowerCase())).map(item =>
        <Link 
            href={`/protected/joincampaign/${item.id}`} key={item.id}
        >
            <div 
            className='rounded-lg bg-slate-800 !w-full p-4'
            >
                {item.name}
            </div>
        </Link>
    )

    if(res.length == 0) {
        return <div className='text-xl text-gray-400 mt-2 text-center'>Not Found</div>
    }

    return res;
    
}