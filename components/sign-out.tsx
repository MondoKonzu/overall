import React from 'react'
import { Button } from './ui/button'
import { signOutAction } from '@/app/actions'
import HeaderAuth from './header-auth'

const SignOut = () => {
  return (
    <>
    <Button onClick={signOutAction}>Sign out</Button>
    <HeaderAuth />
    </>
  )
}

export default SignOut
