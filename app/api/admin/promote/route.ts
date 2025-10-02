import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../../lib/supabase';

export async function POST(req: NextRequest) {
  const s = supabaseServer();
  const form = await req.formData();
  const userId = form.get('user_id') as string;
  const role = form.get('role') as string;

  if (!userId || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const { error } = await s.rpc('set_member_role', { p_user: userId, p_role: role });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL('/admin?ok=1', req.url), 303);
}
