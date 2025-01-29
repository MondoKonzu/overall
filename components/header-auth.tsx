import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

const HeaderAuth = async () => {
    const supa = await createClient();
    const {data: {user},} = await supa.auth.getUser();
    if(hasEnvVars && user){
        return (
            <div>
              {user?.user_metadata.display_name}
            </div>
          )
        
    }else{
        return (
            <div>Not logged in  </div>
        )
    }
}

export default HeaderAuth
