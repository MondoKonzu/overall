import { createClient } from '@/utils/supabase/server'
import React from 'react'

const Usercard = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    
  return (
    <div>
        <div>
            <h2>Name: {data.user?.user_metadata.display_name}</h2>
            <h2>AC code: {data.user?.email}</h2>
            <h3>Doc released: {data.user?.created_at}</h3>
        </div>
    </div>
  )
}

export default Usercard
