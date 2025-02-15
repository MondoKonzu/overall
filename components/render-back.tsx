"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button';
import { Check, X } from 'lucide-react';
import { updatePlayerPendingStatus } from '@/lib/data-update';
import { Pending } from '@/lib/types';
import { deletePlayerByID } from '@/lib/data-delete';

export const RenderBack = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div onClick={() => { router.refresh() }}>
      {children}
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

export const RefusePending = ({playerID} : {playerID : string}) => {
  return (
    <Button className="bg-red-600 hover:bg-red-800" onClick={() => {deletePlayerByID(playerID)}}>
    <X className="text-white scale-150" />
  </Button>
  )
}


