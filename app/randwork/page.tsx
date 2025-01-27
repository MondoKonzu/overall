import { createClient } from '@/utils/supabase/server'
import React from 'react'
import { redirect } from 'next/navigation';
import { fetchRand } from '../actions';

const Rand = async () => {
  const supabase = await createClient()

  const { data : {user} } = await supabase.auth.getUser();
    const texts = await fetchRand();
  if(!user){  return ("gommapane") }
  if(!texts) {
    return ("damn");
  }
    return (
    <div>
        {texts.map(cont => <p>{cont.text}</p>)}
    </div>
  )
}

export default Rand
