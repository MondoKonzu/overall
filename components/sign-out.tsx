import React from 'react'
import { Button } from './ui/button'
import { signOutAction } from '@/app/actions'
import HeaderAuth from './header-auth'

const SignOut = () => {
  return (
    <>
    <HeaderAuth />
    <Button onClick={signOutAction}>Sign out</Button>
    </>
  )
}

export default SignOut
