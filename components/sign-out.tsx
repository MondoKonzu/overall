import React from 'react'
import { Button } from './ui/button'
import { signOutAction } from '@/lib/actions'
import HeaderAuth from './header-auth'
import { createClient } from '@/utils/supabase/server'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'


const SignOut = async () => {
      const supa = await createClient();
      const {data: {user},} = await supa.auth.getUser();
  return (
    <>
    <HeaderAuth />
    {hasEnvVars && user ? 
    <Button variant={'outline'} onClick={signOutAction}>Sign out</Button>  
      :
      null
  }
    </>
  )
}

export default SignOut
