import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Niet ingelogd.' });

  const supabase = supabaseAdmin();
  const userId = session.user.id;

  if (req.method === 'GET') {
    // Haal bestellingen op
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Haal custom aanvragen op
    const { data: requests } = await supabase
      .from('custom_requests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Haal gebruikersgegevens op
    const { data: user } = await supabase
      .from('users')
      .select('id, name, email, phone, address, city, postal_code, country')
      .eq('id', userId)
      .single();

    return res.status(200).json({ orders: orders || [], requests: requests || [], user });
  }

  if (req.method === 'PUT') {
    // Update gebruikersgegevens
    const { name, phone, address, city, postal_code, country } = req.body;
    const { error } = await supabase
      .from('users')
      .update({ name, phone, address, city, postal_code, country })
      .eq('id', userId);

    if (error) return res.status(500).json({ error: 'Bijwerken mislukt.' });
    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
