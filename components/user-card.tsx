import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useGlitch } from 'react-powerglitch';

const UserCard = ({className, logUser} : {className?: string, logUser?: User}) => {
    const [user, setUser] = useState<User | null>(logUser ? logUser : null);
    const glitchImg = useGlitch();

    if(logUser === undefined){
        useEffect(() => {
            const userData = async () => {
                const supa = createClient();
                const {data, error} = await supa.auth.getUser()
                if(error) return null;
                setUser(data.user);
            }
            userData()
        }, [])
    }

    if (user == null) {
        return "not found"
    }

    return (
        <div className={cn('grid font-mono',className)}>
            <Image ref={glitchImg.ref} className='cut-edge-app mx-auto' alt="ppic" src="/unknown-profilepic.png" width={100} height={100} />
            name = {user.user_metadata.display_name}
            <br />
            onAddress = {user.email}
            <br />
            <p>
                <span>Wanted for = </span>
                Everything
                <br />
                <span>ID released on = </span>{user.created_at}
            </p>
        </div>
    )
}

export default UserCard
