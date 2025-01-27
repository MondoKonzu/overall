import { createClient } from '@/utils/supabase/server'
import React from 'react'
import { redirect } from 'next/navigation';
import { fetchPlayers } from '../actions';

const Rand = async () => {
  const supabase = await createClient()

  const { data : {user} } = await supabase.auth.getUser();
    const players = await fetchPlayers();
  if(!user){  return redirect("/") }
  if(!players) {
    return ("damn");
  }
    return (
    <div>
        <h1>{user.user_metadata.display_name} is DM for:</h1>
        {players.map(cont => <p key={cont.name}>{cont.name}</p>)}
    </div>
  )
}

export default Rand
