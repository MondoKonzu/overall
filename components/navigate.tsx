"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { ModeToggle } from './ui/mode-toggle'

const Navigate = () => {
  const [isVisible, setIsVisible] = useState(false)
  const handleClick = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div className='overflow-x-hidden'>
      <Button onClick={handleClick} variant={"ghost"} className={`fixed rounded-none z-50`}>
        <Image alt='Menù' src="/menu.png" width={35} height={35} className='dark:invert' />
      </Button>
      <div className={`absolute ${isVisible ? `right-0` : `right-full`} z-40 min-h-[100vh] min-w-[100vw] 
        duration-300 bg-red-500/90 backdrop-blur-sm p-16`}>
          <div>
            <ModeToggle/>
          </div>
      </div>
    </div>
  )
}

export default Navigate
