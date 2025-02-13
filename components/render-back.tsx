"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const RenderBack = ({children} : {children: React.ReactNode}) => {
    const router = useRouter();
  return (
    <div onClick={() => {router.refresh()}}>
      {children}
    </div>
  )
}

export default RenderBack
