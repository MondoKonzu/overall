import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js'
import Image from 'next/image';
import React, { useState } from 'react'
import { useGlitch } from 'react-powerglitch';

const UserCard = ({className} : {className?: string}) => {
    const [user, setUser] = useState<User | null>(null);
    const glitchImg = useGlitch();

    const supa = createClient();
    supa.auth.getUser().then().then(ans => setUser(ans.data.user));

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
