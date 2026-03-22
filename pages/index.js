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
        <meta name="description" content="Official football shirts from the best national teams and clubs." />
        <link rel="icon" href="/logo.jpeg" />
      </Head>

      <Navbar />

      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f7f0e6 0%, #f0e8d8 50%, #e8dcc8 100%)',
      }}>
        {/* Decoratieve cirkels */}
        <div style={{ position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)', width: 600, height: 600, borderRadius: '50%', border: '2px solid rgba(107,16,32,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '6%', top: '50%', transform: 'translateY(-50%)', width: 350, height: 350, borderRadius: '50%', border: '1px solid rgba(107,16,32,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: '55%', top: 0, bottom: 0, width: '1px', background: 'rgba(107,16,32,0.07)', pointerEvents: 'none' }} />

        {/* Vlaggen rechts */}
        <div style={{ position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 16, opacity: 0.35 }}>
          {['🇧🇪','🇫🇷','🇳🇱','🇩🇪','🇪🇸','🏴󠁧󠁢󠁥󠁮󠁧󠁿','🇵🇹','🇮🇹'].map((f,i) => (
            <span key={i} style={{ fontSize: 28 }}>{f}</span>
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ marginBottom: 24 }}>
              <span className="badge badge-green" style={{ fontSize: 12 }}>
                ⚽ {t.hero.badge}
              </span>
            </div>

            <h1 className="display" style={{
              fontSize: 'clamp(60px, 10vw, 118px)',
              lineHeight: 0.95,
              marginBottom: 24,
              color: '#1a0a0e',
            }}>
              {t.hero.title}
              <br />
              <span style={{ color: '#6b1020' }}>{t.hero.titleAccent}</span>
            </h1>

            <p style={{ fontSize: 18, color: '#8a7060', maxWidth: 440, lineHeight: 1.7, marginBottom: 40 }}>
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
            <div style={{ marginTop: 60, display: 'flex', gap: 40, borderTop: '1px solid rgba(107,16,32,0.15)', paddingTop: 32 }}>
              {[
                { num: '200+', label: { nl: 'Shirts', fr: 'Maillots', en: 'Shirts' } },
                { num: '30+', label: { nl: 'Teams', fr: 'Équipes', en: 'Teams' } },
                { num: '10K+', label: { nl: 'Klanten', fr: 'Clients', en: 'Customers' } }
              ].map(s => (
                <div key={s.num}>
                  <p className="display" style={{ fontSize: 32, color: '#6b1020' }}>{s.num}</p>
                  <p className="ui" style={{ fontSize: 13, color: '#8a7060', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {s.label[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" style={{ padding: '80px 0', background: '#f7f0e6' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <p className="ui" style={{ fontSize: 13, color: '#6b1020', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
              — Collection 2024/25
            </p>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 0.95, color: '#1a0a0e' }}>
              {t.shop.title}
            </h2>
            <div className="divider" />
          </div>

          {/* Filters */}
          <div style={{ marginBottom: 40, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{t.shop.filter}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c.id} className={`tag ${activeCategory === c.id ? 'active' : ''}`} onClick={() => setActiveCategory(c.id)}>
                    {c.label[lang]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{t.shop.allCountries}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button className={`tag ${activeCountry === 'all' ? 'active' : ''}`} onClick={() => setActiveCountry('all')}>🌍 {t.shop.allCountries}</button>
                {countries.map(c => (
                  <button key={c.id} className={`tag ${activeCountry === c.id ? 'active' : ''}`} onClick={() => setActiveCountry(c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="ui" style={{ fontSize: 13, color: '#8a7060', marginBottom: 24 }}>{filtered.length} shirts</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {filtered.map((p, i) => (
              <div key={p.id} style={{ animation: `fadeUp 0.4s ease ${i * 0.05}s both` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ background: '#f0e8d8', padding: '80px 0', borderTop: '1px solid #e2d4c0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 60px)', color: '#1a0a0e' }}>
              {lang === 'nl' ? 'Waarom GoalKit?' : lang === 'fr' ? 'Pourquoi GoalKit?' : 'Why GoalKit?'}
            </h2>
            <div className="divider" style={{ margin: '16px auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
            {[
              { icon: '✅', title: { nl: '100% Authentiek', fr: '100% Authentique', en: '100% Authentic' }, desc: { nl: 'Alleen officiële shirts.', fr: 'Uniquement des maillots officiels.', en: 'Only official shirts.' } },
              { icon: '🚀', title: { nl: 'Snelle levering', fr: 'Livraison rapide', en: 'Fast delivery' }, desc: { nl: 'Binnen 24-48 uur.', fr: 'En 24-48h.', en: 'Within 24-48 hours.' } },
              { icon: '🔒', title: { nl: 'Veilig betalen', fr: 'Paiement sécurisé', en: 'Secure payment' }, desc: { nl: 'Via Stripe, 100% veilig.', fr: 'Via Stripe, 100% sécurisé.', en: 'Via Stripe, 100% secure.' } },
              { icon: '↩️', title: { nl: '30 dagen retour', fr: '30 jours retour', en: '30-day returns' }, desc: { nl: 'Gratis retourneren.', fr: 'Retours gratuits.', en: 'Free returns.' } },
            ].map((item, i) => (
              <div key={i} style={{ padding: 28, background: '#faf5ee', border: '1px solid #e2d4c0', borderRadius: 4, textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 className="ui" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8, color: '#1a0a0e' }}>{item.title[lang]}</h3>
                <p style={{ color: '#8a7060', fontSize: 14 }}>{item.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 0', background: '#f7f0e6' }}>
        <div className="container" style={{ maxWidth: 600 }}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: 16, color: '#1a0a0e' }}>{t.nav.contact}</h2>
          <div className="divider" />
          <p style={{ color: '#8a7060', marginBottom: 32, marginTop: 16 }}>
            {lang === 'nl' ? 'Vragen? We antwoorden binnen 24u.' : lang === 'fr' ? 'Des questions ? Nous répondons en 24h.' : 'Questions? We reply within 24h.'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: lang === 'nl' ? 'Naam' : lang === 'fr' ? 'Nom' : 'Name', type: 'text' },
              { label: 'Email', type: 'email' },
              { label: lang === 'nl' ? 'Bericht' : lang === 'fr' ? 'Message' : 'Message', type: 'textarea' }
            ].map((field, i) => (
              <div key={i}>
                <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea rows={4} style={{ width: '100%', padding: '12px 16px', background: '#faf5ee', border: '1px solid #e2d4c0', color: '#1a0a0e', fontSize: 14, borderRadius: 4, outline: 'none', fontFamily: 'var(--font-body)', resize: 'vertical', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#6b1020'}
                    onBlur={e => e.target.style.borderColor = '#e2d4c0'} />
                ) : (
                  <input type={field.type} style={{ width: '100%', padding: '12px 16px', background: '#faf5ee', border: '1px solid #e2d4c0', color: '#1a0a0e', fontSize: 14, borderRadius: 4, outline: 'none', fontFamily: 'var(--font-body)', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#6b1020'}
                    onBlur={e => e.target.style.borderColor = '#e2d4c0'} />
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
