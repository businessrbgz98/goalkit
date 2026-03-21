import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, lang = 'nl' } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'No items in cart' });
  }

  try {
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.product.name[lang] || item.product.name.nl,
          description: `${item.product.flag} ${item.product.country} · Size: ${item.size}`,
          images: [item.product.image],
        },
        unit_amount: Math.round(item.product.price * 100), // in cents
      },
      quantity: item.quantity,
    }));

    const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const freeShipping = subtotal >= 75;

    const shippingOptions = freeShipping
      ? [{ shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 0, currency: 'eur' }, display_name: 'Gratis levering / Livraison gratuite' } }]
      : [{ shipping_rate_data: { type: 'fixed_amount', fixed_amount: { amount: 499, currency: 'eur' }, display_name: 'Standard levering / Livraison standard' } }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'bancontact'],
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['BE', 'NL', 'FR', 'DE', 'LU', 'GB'],
      },
      shipping_options: shippingOptions,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      locale: lang === 'nl' ? 'nl' : lang === 'fr' ? 'fr' : 'en',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
}
