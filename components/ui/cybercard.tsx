"use client"

import React, { useEffect, useRef } from 'react'
import { useGlitch } from 'react-powerglitch'

const CyberCard = ({children, title} : {children: React.ReactNode, title: string}) => {
  
    const glitch = useGlitch({
        "playMode": "hover",
        "timing": {
            "iterations": 2
        }
    });
  return (
    <div 
        className={`min-h-[70vh] min-w-full bg-[url(public/cyberland.png)] bg-cover grayscale hover:grayscale-0 duration-300 cyber-card`}
        ref={glitch.ref}
        >
        <div className='
        min-w-full min-h-full bg-gradient-to-t from-yellow-600 via-yellow-500/50 to-transparent
        gird content-end'>
            <div className='grid p-6'>
            <span className='inline-block h-1 bg-purple-700 w-[25%] rounded hover duration-300'></span>
            <h1 className='text-3xl'>{title}</h1>
            <p className='font-mono'>{children}</p>
            </div>
        </div>
    </div>
  )
}

export default CyberCard
