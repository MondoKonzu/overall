import React from 'react'
import { Button } from './ui/button'
import { signOutAction } from '@/app/actions'

const SignOut = () => {
  return (
    <Button onClick={signOutAction}>Sign out</Button>
  )
}

export default SignOut
