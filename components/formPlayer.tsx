import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { insertPlayerRequest } from '@/lib/data-insert'

const FormPlayer = ({campID} : {campID : string}) => {
  return (
    <div>
        <form>
            <Label htmlFor='name'>Name:</Label>
            <Input name='name'></Input>
            <Label htmlFor='eddie'>Eddie:</Label>
            <Input name='eddie' type='number'></Input>
            <input readOnly value={campID} className='hidden' name='campID'></input>

            <Button formAction={insertPlayerRequest}>Send Request</Button>
        </form>
    </div>
)
}

export default FormPlayer
