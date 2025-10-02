import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../../lib/supabase';  // fixed path

export async function POST(req: NextRequest) {
  const s = supabaseServer();
  const form = await req.formData();
  const userId = form.get('user_id') as string;

  if (!userId) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }

  const { error } = await s.rpc('approve_waitlist', { p_user: userId });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL('/admin?waitlist_ok=1', req.url), 303);
}
