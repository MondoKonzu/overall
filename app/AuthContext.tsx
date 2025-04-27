// context/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

type AuthContextType = {
    user: User | null,
    loading: boolean,
    refresh: () => void
}

const AuthContext = createContext<AuthContextType>({
    loading: false,
    user: null,
    refresh: () => {console.log("no context")}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [update]);

  function refresh(){
    console.log("refreshing")
    setUpdate(!update);
  }

  return (
    <AuthContext.Provider value={{ user, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
