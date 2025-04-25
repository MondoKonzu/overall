"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { ModeToggle } from './ui/mode-toggle'
import Link from 'next/link'
import { signOutAction } from '@/lib/actions'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import UserCard from './user-card'


const Navigate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(false)
  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();
  }, [isVisible]);

  return (
    <div className='overflow-x-hidden'>
      <button onClick={handleClick} className={`fixed z-50 px-2 py-1.5`}>
        <Image alt='Menù' src="/menu.png" width={35} height={35} className='dark:invert' />
      </button>
      <div className={`fixed ${isVisible ? `right-0` : `right-full`} z-40 min-h-[100vh] min-w-[100vw] 
        duration-300 bg-red-500/90 backdrop-blur-sm`}>
        <div className='grid md:grid-cols-3'>
          <div className='col-span-2 p-16  hidden md:block' onClick={handleClick}>
            placeholder
          </div>
          <div className='bg-red-950/15 min-h-screen top-0 text-center grid '>
            {user == null ?
              <div className='row-span-5' />
              :
              <UserCard className='row-span-3 mt-5 px-4 w-10/12 mx-auto text-left' />
            }
            <ModeToggle />
            <BtnNav linkTo='/' onClick={handleClick}>Home</BtnNav>
            {user == null ?
              <>
                <BtnNav linkTo='/sign-in' onClick={handleClick}>Sign-in</BtnNav>
                <BtnNav linkTo='/sign-up' onClick={handleClick}>Sign-up</BtnNav>
              </>
              :
              <>
                <BtnNav linkTo='/protected' onClick={handleClick}>My Profile</BtnNav>
                <BtnNav linkTo='/' onClick={() => {
                  signOutAction();
                  handleClick();
                }}>Sign Out</BtnNav>
              </>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

const BtnNav = ({ children, linkTo, onClick }: { children: React.ReactNode, linkTo: string, onClick: () => void }) => {
  return (
    <Link onClick={onClick} href={linkTo}>
      <button className='h-10 w-4/5 cut-edge-2 bg-black hover:bg-slate-600 overflow-hidden px-1'>
        <span className='bg-red-500 cut-edge-3 min-w-full min-h-[2rem] flex items-center justify-center'>
          <span className='min-w-full h-fit'>
            {children}
          </span>
        </span>
      </button>
    </Link>
  )
}

export default Navigate
