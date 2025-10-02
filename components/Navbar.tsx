'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = typeof window !== 'undefined'
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  : ({} as any);

export function Navbar(){
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const { data } = await (supabase as any).auth?.getUser?.();
      const u = data?.user ?? null;
      setUser(u);
      if(u){
        const { data: prof } = await (supabase as any)
          .from('profiles').select('role').eq('id', u.id).single();
        setRole(prof?.role || null);
      }
    };
    if((supabase as any).auth) run();
  }, []);

  return (
    <nav style={{borderBottom:'1px solid #eee', background:'#fff'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <Link href="/"><img src="/logo.png" alt="MAD4x4 Club Logo" style={{height:'32px'}}/></Link>
        </div>
        <div>
          <Link href="/events">Events</Link>
          <Link href="/documents">Documents</Link>
          <Link href="/dashboard">Dashboard</Link>
          {role === 'admin' && <Link href="/admin">Admin</Link>}
          {user ? <Link href="/logout">Logout</Link> : <Link href="/login">Login</Link>}
        </div>
      </div>
    </nav>
  );
}
