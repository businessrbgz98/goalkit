import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function CheckoutPage() {
  const { lang, items, clearCart } = useCartStore();
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const freeShipping = subtotal >= 75;
  const total = subtotal + (freeShipping ? 0 : 4.99);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, lang })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout – GoalKit</title>
      </Head>
      <Navbar />

      <div className="container" style={{ padding: '60px 24px', maxWidth: 640, minHeight: '70vh' }}>
        <h1 className="display" style={{ fontSize: 'clamp(36px, 5vw, 60px)', marginBottom: 8 }}>
          {t.cart.checkout}
        </h1>
        <div className="divider" style={{ marginBottom: 40 }} />

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: '#666', marginBottom: 16 }}>{t.cart.empty}</p>
            <Link href="/#shop" className="btn btn-primary">{t.cart.continueShopping}</Link>
          </div>
        ) : (
          <>
            {/* Order summary */}
            <div style={{
              background: 'var(--dark-card)',
              border: '1px solid var(--dark-border)',
              borderRadius: 4,
              padding: 24,
              marginBottom: 24
            }}>
              <h3 className="ui" style={{ fontSize: 13, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                Order Summary
              </h3>
              {items.map(item => (
                <div key={item.key} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: '1px solid #1a1a1a',
                  fontSize: 14
                }}>
                  <span style={{ color: '#ccc' }}>
                    {item.product.name[lang]} · {item.size} × {item.quantity}
                  </span>
                  <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-ui)', fontWeight: 700 }}>
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="ui" style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.cart.total}</span>
                <span className="display" style={{ fontSize: 28, color: 'var(--gold)' }}>€{total.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div style={{ background: '#1a0000', border: '1px solid #440000', borderRadius: 4, padding: 16, marginBottom: 16, color: '#cc4444', fontSize: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <button
              className="btn btn-gold"
              style={{ width: '100%', fontSize: 16, padding: '16px', opacity: loading ? 0.7 : 1 }}
              onClick={handleCheckout}
              disabled={loading}>
              {loading ? '⏳ Loading...' : `🔒 ${lang === 'nl' ? 'Betalen via Stripe' : lang === 'fr' ? 'Payer via Stripe' : 'Pay via Stripe'} – €${total.toFixed(2)}`}
            </button>

            <p style={{ fontSize: 12, color: '#444', textAlign: 'center', marginTop: 16, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em' }}>
              {lang === 'nl' ? 'Je wordt doorgestuurd naar de beveiligde Stripe betaalpagina.' :
               lang === 'fr' ? "Vous serez redirigé vers la page de paiement sécurisée Stripe." :
               "You'll be redirected to the secure Stripe payment page."}
            </p>

            <p style={{ fontSize: 12, color: '#333', textAlign: 'center', marginTop: 8, fontFamily: 'var(--font-ui)' }}>
              💳 Visa · Mastercard · iDEAL · Bancontact
            </p>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
