"use client"

import { RenderBack } from '@/components/render-back'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { deletePlayerByID } from '@/lib/data-delete'
import { updatePlayerEddie, updatePlayerPendingStatus } from '@/lib/data-update'
import { Pending, Player, RelatedPendings } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import React, { useState } from 'react'

export const PendingHandler = ({ req , className}: { req: RelatedPendings, className?: string }) => {
    const [eddieValue, setEddieValue] = useState(req.player.eddie);
    // Handle input change
    const handleInputChange = (e : React.FormEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      setEddieValue(newValue); // Update the state
      req.player.eddie = newValue;
      updatePlayerEddie(req.player);
    };

  
    return (
        <div className={className}>
            <p className="content-center">{req.player.name}</p>

                <Input className="content-center max-w-24 decoration-none" type='number'
                 onInput={handleInputChange} value={eddieValue}></Input>

            <div className="grid grid-cols-3 gap-4">
                <Label className="content-center">Accept:</Label>
                <RenderBack>
                    <AcceptPending pending={req.pending} />
                </RenderBack>
                <RenderBack>
                    <RefusePending playerID={req.player.id} />
                </RenderBack>
            </div>
        </div>
    )
}

export const AcceptPending = ({ pending }: { pending: Pending }) => {
    return (
        <Button
            onClick={() => { updatePlayerPendingStatus(pending) }}
            type="submit" className="bg-green-600 hover:bg-green-800">
            <Check className="text-white scale-150" />
        </Button>
    )
}

export const RefusePending = ({ playerID }: { playerID: string }) => {
    return (
        <Button className="bg-red-600 hover:bg-red-800" onClick={() => { deletePlayerByID(playerID) }}>
            <X className="text-white scale-150" />
        </Button>
    )
}

export const ModifyPlayer = ({info, className} : {info : Player, className?: string}) => {
    const [eddie, setEddie] = useState(info.eddie);
    // Handle input change
    const handleInputChange = (e : React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setEddie(newValue); // Update the state
        info.eddie = newValue;
        updatePlayerEddie(info);
      };

    return (
        <div className={cn("flex flex-row gap-4", className)}>
            <div className='content-center'>{info.name}</div>
            <Input  type='number' value={info.eddie}
                className='focus:outline-none focus:ring-0 focus:shadow-none border-none content-center max-w-28 decoration-none'
                onInput={handleInputChange}
            ></Input>
        </div>
    )
}
