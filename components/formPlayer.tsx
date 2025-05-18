"use client"
import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { insertPlayer } from '@/lib/data-insert'
import { useRouter } from 'next/navigation'

const FormPlayer = ({campID , className} : {campID : string, className?: string}) => {
    const router = useRouter();
  return (
    <div className={className && className}>
        <form className='flex flex-col gap-4'>
            <Label htmlFor='name'>Name:</Label>
            <Input name='name' required></Input>
            <Label htmlFor='eddie'>Eddie:</Label>
            <Input name='eddie' type='number' required></Input>
            <input readOnly value={campID} className='hidden' name='campID'></input>

            <Button formAction={(fd) => {
                insertPlayer(fd, true)
                router.refresh();
            }}
                className='shrink  md:w-3/12'
            >Send Request</Button>
        </form>
    </div>
)
}

export default FormPlayer
