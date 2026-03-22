import { supabaseAdmin } from '../../../lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getServerSession(req, res, authOptions);
  const { name, email, description, imageBase64, phone } = req.body;

  if (!description || !email) return res.status(400).json({ error: 'Omschrijving en e-mail zijn verplicht.' });

  const supabase = supabaseAdmin();

  let imageUrl = null;

  // Upload foto naar Supabase Storage als die er is
  if (imageBase64) {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const filename = `request-${Date.now()}.jpg`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('custom-requests')
      .upload(filename, buffer, { contentType: 'image/jpeg' });

    if (!uploadError && uploadData) {
      const { data: urlData } = supabase.storage.from('custom-requests').getPublicUrl(filename);
      imageUrl = urlData.publicUrl;
    }
  }

  // Sla aanvraag op in database
  const { data, error } = await supabase.from('custom_requests').insert({
    user_id: session?.user?.id || null,
    name: name || 'Anoniem',
    email,
    phone: phone || null,
    description,
    image_url: imageUrl,
    status: 'pending',
    created_at: new Date().toISOString(),
  }).select().single();

  if (error) return res.status(500).json({ error: 'Aanvraag opslaan mislukt.' });

  res.status(200).json({ success: true, requestId: data.id });
}
