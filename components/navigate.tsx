"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ModeToggle } from './ui/mode-toggle'
import Link from 'next/link'
import { signOutAction } from '@/lib/actions'
import UserCard from './user-card'
import { useAuth } from '@/app/AuthContext'



const Navigate = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { user, refresh } = useAuth()
  const handleClick = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className='overflow-x-hidden'>
      <button onClick={handleClick} className={`fixed right-0 z-50 px-2 py-1.5`}>
        <Image alt='Menù' src="/menu.png" width={35} height={35} className='dark:invert' />
      </button>
      <div className={`fixed ${isVisible ? `right-0` : `right-full`} z-40 min-h-[100vh] min-w-[100vw] 
        duration-300 bg-red-500/90 backdrop-blur-sm`}>
        <div className='grid md:grid-cols-3'>
          <div className='col-span-2 hidden md:block'>
            <Playground />
          </div>
          <div className='bg-red-950/15 min-h-screen top-0 text-center grid '>
            {user == null ?
              <div className='row-span-5' />
              :
              <UserCard logUser={user} className='row-span-3 mt-5 px-4 w-10/12 mx-auto text-left' />
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
                <BtnNav linkTo='/' onClick={async () => {
                  await signOutAction();
                  refresh()
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

const POSS = ["BD", "E9", "1C", "7A", "55", "FF"]

const Playground = () => {
  const [tot, setTot] = useState<string[][]>([])
  const [coords, setCoords] = useState<string[]>([]);
  useEffect(() => {
    const las = () => Array.from({ length: 6 }, () => POSS[Math.floor(Math.random() * 5)]);
    const toti  = Array.from({length: 6}, () => las())
    const concat : string[]= []
    toti.forEach((row, index) => row.map(
      (item, sindex) => {
        concat.push(`r${index},c${sindex}`)
      }))
      console.log(concat)
      setCoords(concat)
      setTot(toti)
  }, [])
  return (
    <div className='grid place-content-center min-h-[100vh]'>
          <div className='cursor-pointer w-[30vw] h-[30vw] grid grid-cols-6'>
      {tot.map((row, index) => row.map(
        (item, sindex) => {
          return  <MySquare id={`r${index},c${sindex}`} key={`${index}${sindex}`}>{item}</MySquare> 
        })
        )}

    </div>
    </div>
  )
}

const MySquare = ({children, id} : {children: React.ReactNode, id: any}) => {
  const [act, setAct] = useState<boolean>(false);
  return (
    <span id={id} className={`mx-auto grid place-content-center text-center h-[5vw] w-[5vw] ${act ? "bg-green-800 border border-green-400" : "bg-black" }`}
      onClick={() => {
        setAct(true);
      }}
    >
      <span>{children}</span>
    </span>
  )
}

export default Navigate