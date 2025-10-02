import { createClient } from '@supabase/supabase-js';
export const supabaseBrowser=()=>createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export const supabaseServer=()=>{const url=process.env.SUPABASE_URL!; const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_ANON_KEY!; return createClient(url,key);};
