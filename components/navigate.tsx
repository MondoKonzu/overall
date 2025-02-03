"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { ModeToggle } from './ui/mode-toggle'
import Link from 'next/link'
import { signOutAction } from '@/lib/actions'


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
      <div className={`fixed ${isVisible ? `right-0` : `right-full`} z-40 min-h-[100vh] min-w-[100vw] 
        duration-300 bg-red-500/90 backdrop-blur-sm`}>
          <div className='grid md:grid-cols-3'>
            <div className='col-span-2 p-16  hidden md:block' onClick={handleClick}>
              placeholder
            </div>
            <div className='bg-red-950/15 min-h-screen top-0 px-4
              grid '>
              <ModeToggle  />
              <br />
                <BtnNav linkTo='/protected' onClick={handleClick}>My Profile</BtnNav>
                <BtnNav linkTo='/' onClick={handleClick}>Home</BtnNav>
                <BtnNav linkTo='/sign-in' onClick={handleClick}>Sign-in</BtnNav>
                <BtnNav linkTo='/' onClick={() => {
                  signOutAction();
                  handleClick();
                }}>Sign Out</BtnNav>
            </div>
          </div>
      </div>
    </div>
  )
}

const BtnNav = ({children, linkTo, onClick} : {children: React.ReactNode, linkTo: string, onClick: () => void}) => {
  return (
    <Link onClick={onClick} href={linkTo}>
      <Button className='w-4/5 cut-edge-2 bg-black hover:bg-slate-600'>
        <span className='bg-red-500 min-w-[108%] min-h-[135%] cut-edge-3 flex items-center'>
          <span className='min-w-full'>
            {children}
          </span>
        </span>
      </Button>
    </Link>
  )
}

export default Navigate
