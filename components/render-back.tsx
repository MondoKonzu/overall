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