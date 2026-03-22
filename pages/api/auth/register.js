import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Alle velden zijn verplicht.' });
  if (password.length < 6) return res.status(400).json({ error: 'Wachtwoord moet minstens 6 tekens zijn.' });

  const supabase = supabaseAdmin();

  // Check of e-mail al bestaat
  const { data: existing } = await supabase.from('users').select('id').eq('email', email).single();
  if (existing) return res.status(400).json({ error: 'Dit e-mailadres is al in gebruik.' });

  const hashedPassword = await bcrypt.hash(password, 12);

  const { error } = await supabase.from('users').insert({
    name,
    email,
    password: hashedPassword,
    provider: 'email',
    created_at: new Date().toISOString(),
  });

  if (error) return res.status(500).json({ error: 'Account aanmaken mislukt.' });

  res.status(200).json({ success: true });
}
