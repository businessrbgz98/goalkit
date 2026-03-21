import { useState, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';
import { products, categories, countries } from '../data/products';

export default function Home() {
  const { lang } = useCartStore();
  const t = translations[lang];

  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCountry, setActiveCountry] = useState('all');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const countryMatch = activeCountry === 'all' || p.country === activeCountry;
      return catMatch && countryMatch;
    });
  }, [activeCategory, activeCountry]);

  return (
    <>
      <Head>
        <title>GoalKit – Football Shirts | Voetbalshirts | Maillots de Foot</title>
        <meta name="description" content="Official football shirts from the best national teams and clubs. Belgique, France, España and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #050505 0%, #0a1a0a 40%, #0f2a0f 100%)',
      }}>
        {/* Field circle decoration */}
        <div style={{
          position: 'absolute',
          right: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 700,
          height: 700,
          borderRadius: '50%',
          border: '2px solid rgba(26, 122, 26, 0.2)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1px solid rgba(26, 122, 26, 0.12)',
          pointerEvents: 'none'
        }} />

        {/* Vertical field line */}
        <div style={{
          position: 'absolute',
          left: '55%',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'rgba(26, 122, 26, 0.1)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 640 }}>
            {/* Badge */}
            <div style={{ marginBottom: 24 }}>
              <span className="badge badge-green" style={{ fontSize: 12 }}>
                ⚽ {t.hero.badge}
              </span>
            </div>

            <h1 className="display" style={{
              fontSize: 'clamp(60px, 10vw, 120px)',
              lineHeight: 0.95,
              marginBottom: 24
            }}>
              {t.hero.title}
              <br />
              <span style={{ color: 'var(--green)', WebkitTextStroke: '1px rgba(26,122,26,0.3)' }}>
                {t.hero.titleAccent}
              </span>
            </h1>

            <p style={{
              fontSize: 18,
              color: '#888',
              maxWidth: 440,
              lineHeight: 1.7,
              marginBottom: 40
            }}>
              {t.hero.subtitle}
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#shop" className="btn btn-primary" style={{ fontSize: 14 }}>
                {t.hero.cta} →
              </a>
              <a href="#shop" className="btn btn-outline" style={{ fontSize: 14 }}>
                🏆 Top clubs
              </a>
            </div>

            {/* Stats */}
            <div style={{
              marginTop: 60,
              display: 'flex',
              gap: 40,
              borderTop: '1px solid #1a3a1a',
              paddingTop: 32
            }}>
              {[
                { num: '200+', label: { nl: 'Shirts', fr: 'Maillots', en: 'Shirts' } },
                { num: '30+', label: { nl: 'Teams', fr: 'Équipes', en: 'Teams' } },
                { num: '10K+', label: { nl: 'Klanten', fr: 'Clients', en: 'Customers' } }
              ].map(s => (
                <div key={s.num}>
                  <p className="display" style={{ fontSize: 32, color: 'var(--gold)' }}>{s.num}</p>
                  <p className="ui" style={{ fontSize: 13, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {s.label[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country flags floating */}
        <div style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          opacity: 0.5
        }}>
          {['🇧🇪', '🇫🇷', '🇳🇱', '🇩🇪', '🇪🇸', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇵🇹', '🇮🇹'].map((f, i) => (
            <span key={i} style={{ fontSize: 28, filter: 'grayscale(30%)' }}>{f}</span>
          ))}
        </div>
      </section>

      {/* SHOP SECTION */}
      <section id="shop" style={{ padding: '80px 0' }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <p className="ui" style={{ fontSize: 13, color: 'var(--green)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
              — Collection 2024/25
            </p>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 0.95 }}>
              {t.shop.title}
            </h2>
            <div className="divider" />
          </div>

          {/* Filters */}
          <div style={{ marginBottom: 40, display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Category */}
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {t.shop.filter}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c.id}
                    className={`tag ${activeCategory === c.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(c.id)}>
                    {c.label[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Country */}
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {t.shop.allCountries}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  className={`tag ${activeCountry === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCountry('all')}>
                  🌍 {t.shop.allCountries}
                </button>
                {countries.map(c => (
                  <button key={c.id}
                    className={`tag ${activeCountry === c.id ? 'active' : ''}`}
                    onClick={() => setActiveCountry(c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="ui" style={{ fontSize: 13, color: '#555', letterSpacing: '0.06em', marginBottom: 24 }}>
            {filtered.length} {filtered.length === 1 ? 'shirt' : 'shirts'}
          </p>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 24
          }}>
            {filtered.map((p, i) => (
              <div key={p.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.05}s both` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US section */}
      <section style={{
        background: 'linear-gradient(180deg, var(--dark) 0%, #0a1a0a 100%)',
        padding: '80px 0',
        borderTop: '1px solid #1a3a1a'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              {lang === 'nl' ? 'Waarom GoalKit?' : lang === 'fr' ? 'Pourquoi GoalKit?' : 'Why GoalKit?'}
            </h2>
            <div className="divider" style={{ margin: '16px auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 32
          }}>
            {[
              {
                icon: '✅',
                title: { nl: '100% Authentiek', fr: '100% Authentique', en: '100% Authentic' },
                desc: { nl: 'Alleen officiële, gelicenseerde shirts.', fr: 'Uniquement des maillots officiels.', en: 'Only official, licensed shirts.' }
              },
              {
                icon: '🚀',
                title: { nl: 'Snelle levering', fr: 'Livraison rapide', en: 'Fast delivery' },
                desc: { nl: 'Geleverd binnen 24-48 uur.', fr: 'Livré en 24-48h.', en: 'Delivered within 24-48 hours.' }
              },
              {
                icon: '🔒',
                title: { nl: 'Veilig betalen', fr: 'Paiement sécurisé', en: 'Secure payment' },
                desc: { nl: 'Betalen via Stripe, 100% veilig.', fr: 'Paiement par Stripe, 100% sécurisé.', en: 'Payment via Stripe, 100% secure.' }
              },
              {
                icon: '↩️',
                title: { nl: '30 dagen retour', fr: '30 jours retour', en: '30-day returns' },
                desc: { nl: 'Gratis retourneren binnen 30 dagen.', fr: 'Retours gratuits sous 30 jours.', en: 'Free returns within 30 days.' }
              }
            ].map((item, i) => (
              <div key={i} style={{
                padding: 28,
                background: 'var(--dark-card)',
                border: '1px solid var(--dark-border)',
                borderRadius: 4,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 className="ui" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 8, textTransform: 'uppercase' }}>
                  {item.title[lang]}
                </h3>
                <p style={{ color: '#666', fontSize: 14 }}>{item.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 16 }}>
            {t.nav.contact}
          </h2>
          <div className="divider" />
          <p style={{ color: '#666', marginBottom: 32, marginTop: 16 }}>
            {lang === 'nl' ? 'Vragen? Neem contact op, we antwoorden binnen 24u.' :
             lang === 'fr' ? 'Des questions ? Contactez-nous, nous répondons en 24h.' :
             'Questions? Get in touch, we reply within 24h.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: lang === 'nl' ? 'Naam' : lang === 'fr' ? 'Nom' : 'Name', type: 'text' },
              { label: 'Email', type: 'email' },
              { label: lang === 'nl' ? 'Bericht' : lang === 'fr' ? 'Message' : 'Message', type: 'textarea' }
            ].map((field, i) => (
              <div key={i}>
                <label className="ui" style={{ fontSize: 12, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea rows={4} style={{
                    width: '100%', padding: '12px 16px',
                    background: 'var(--dark-card)', border: '1px solid var(--dark-border)',
                    color: '#fff', fontSize: 14, borderRadius: 4, outline: 'none',
                    fontFamily: 'var(--font-body)', resize: 'vertical',
                    transition: 'border-color 0.2s'
                  }}
                    onFocus={e => e.target.style.borderColor = 'var(--green)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dark-border)'} />
                ) : (
                  <input type={field.type} style={{
                    width: '100%', padding: '12px 16px',
                    background: 'var(--dark-card)', border: '1px solid var(--dark-border)',
                    color: '#fff', fontSize: 14, borderRadius: 4, outline: 'none',
                    fontFamily: 'var(--font-body)', transition: 'border-color 0.2s'
                  }}
                    onFocus={e => e.target.style.borderColor = 'var(--green)'}
                    onBlur={e => e.target.style.borderColor = 'var(--dark-border)'} />
                )}
              </div>
            ))}
            <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              {lang === 'nl' ? 'Versturen' : lang === 'fr' ? 'Envoyer' : 'Send'}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
