"use client"
import { useRouter } from 'next/router'
import React from 'react'

const RenderBack = ({children} : {children: React.ReactNode}) => {
    const router = useRouter();
  return (
    <div onClick={() => {router.reload()}}>
      {children}
    </div>
  )
}

export default RenderBack
