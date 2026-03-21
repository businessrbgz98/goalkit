import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function CartPage() {
  const { lang, items, removeItem, updateQuantity } = useCartStore();
  const t = translations[lang];

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const freeShipping = subtotal >= 75;
  const total = subtotal + (freeShipping ? 0 : 4.99);

  return (
    <>
      <Head>
        <title>{t.cart.title} – GoalKit</title>
      </Head>
      <Navbar />

      <div className="container" style={{ padding: '60px 24px', minHeight: '70vh' }}>
        <h1 className="display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', marginBottom: 8 }}>
          {t.cart.title}
        </h1>
        <div className="divider" style={{ marginBottom: 40 }} />

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
            <p style={{ color: '#666', fontSize: 18, marginBottom: 24 }}>{t.cart.empty}</p>
            <Link href="/#shop" className="btn btn-primary">{t.cart.continueShopping}</Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            alignItems: 'start'
          }}>
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {items.map(item => (
                <div key={item.key} style={{
                  display: 'flex', gap: 20, alignItems: 'center',
                  padding: 20,
                  background: 'var(--dark-card)',
                  border: '1px solid var(--dark-border)',
                  borderRadius: 4
                }}>
                  {/* Image */}
                  <div style={{ width: 80, height: 100, flexShrink: 0, background: '#111', borderRadius: 2, overflow: 'hidden' }}>
                    <img
                      src={item.product.image}
                      alt={item.product.name[lang]}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p className="ui" style={{ fontSize: 15, fontWeight: 700 }}>{item.product.name[lang]}</p>
                    <p style={{ color: '#666', fontSize: 13 }}>
                      {item.product.flag} {item.product.country} · {t.product?.selectSize || 'Size'}: <strong>{item.size}</strong>
                    </p>
                  </div>

                  {/* Qty */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      style={{
                        width: 30, height: 30, border: '1px solid #2a2a2a',
                        background: '#111', color: '#fff', cursor: 'pointer', borderRadius: '4px 0 0 4px'
                      }}>−</button>
                    <div style={{
                      width: 40, height: 30, border: '1px solid #2a2a2a', borderLeft: 'none', borderRight: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, background: '#0a0a0a'
                    }}>{item.quantity}</div>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      style={{
                        width: 30, height: 30, border: '1px solid #2a2a2a',
                        background: '#111', color: '#fff', cursor: 'pointer', borderRadius: '0 4px 4px 0'
                      }}>+</button>
                  </div>

                  {/* Price */}
                  <span className="display" style={{ fontSize: 20, color: 'var(--gold)', minWidth: 80, textAlign: 'right' }}>
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  {/* Remove */}
                  <button onClick={() => removeItem(item.key)}
                    style={{ color: '#444', fontSize: 18, cursor: 'pointer', padding: 4, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#cc2200'}
                    onMouseLeave={e => e.target.style.color = '#444'}>
                    ×
                  </button>
                </div>
              ))}

              <Link href="/#shop" style={{ color: '#555', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                ← {t.cart.continueShopping}
              </Link>
            </div>

            {/* Summary */}
            <div style={{
              minWidth: 280,
              background: 'var(--dark-card)',
              border: '1px solid var(--dark-border)',
              borderRadius: 4,
              padding: 24,
              position: 'sticky',
              top: 80
            }}>
              <h3 className="ui" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#888' }}>{t.cart.subtotal}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#888' }}>{t.cart.shipping}</span>
                  <span style={{ color: freeShipping ? 'var(--green)' : '#fff' }}>
                    {freeShipping ? t.cart.freeShipping : '€4.99'}
                  </span>
                </div>
                {!freeShipping && (
                  <p style={{ fontSize: 12, color: '#555', borderTop: '1px solid #1a1a1a', paddingTop: 8 }}>
                    {t.cart.shippingNote}
                  </p>
                )}
              </div>

              <div style={{
                borderTop: '1px solid #2a2a2a',
                paddingTop: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20
              }}>
                <span className="ui" style={{ fontSize: 15, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t.cart.total}
                </span>
                <span className="display" style={{ fontSize: 28, color: 'var(--gold)' }}>
                  €{total.toFixed(2)}
                </span>
              </div>

              <Link href="/checkout" className="btn btn-gold" style={{ width: '100%', display: 'flex', justifyContent: 'center', fontSize: 14 }}>
                {t.cart.checkout} →
              </Link>

              <p style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: 12, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em' }}>
                🔒 {lang === 'nl' ? 'Veilig betalen via Stripe' : lang === 'fr' ? 'Paiement sécurisé via Stripe' : 'Secure payment via Stripe'}
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
