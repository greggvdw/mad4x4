import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase';  // fixed path

export async function POST(req: NextRequest) {
  const s = supabaseServer();
  const form = await req.formData();

  const eventId = form.get('event_id') as string;
  const userId = form.get('user_id') as string;
  const signature = form.get('signature') as string;

  if (!eventId || !userId || !signature) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await s.from('sign_on_forms').insert({
    event_id: Number(eventId),
    user_id: userId,
    signature,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL(`/events/${eventId}?signed=1`, req.url), 303);
}
