'use client';
import { useState } from 'react';
import { supabaseBrowser } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
export default function Login(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState<string|null>(null);const r=useRouter();async function submit(e:any){e.preventDefault();setError(null);const s=supabaseBrowser();const {error}=await s.auth.signInWithPassword({email,password});if(error) return setError(error.message);r.push('/dashboard');}
return (<div style={{maxWidth:480}}><h1>Login</h1><form onSubmit={submit} className="card"><label>Email<br/><input value={email} onChange={e=>setEmail(e.target.value)} type="email" required style={{width:'100%'}}/></label><br/><label>Password<br/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" required style={{width:'100%'}}/></label><br/><button className="btn" type="submit">Sign in</button>{error && <p style={{color:'crimson'}}>{error}</p>}</form></div>);}
