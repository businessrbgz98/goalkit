import Link from 'next/link';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function Footer() {
  const { lang } = useCartStore();
  const t = translations[lang];

  return (
    <footer style={{ background: '#1a0a0e', marginTop: 0 }}>
      {/* Top bar */}
      <div style={{ background: '#6b1020', padding: '12px 0', textAlign: 'center' }}>
        <p className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f5ede0' }}>
          ⚽ {t.hero.badge} &nbsp;|&nbsp; 🔒 {t.footer.secure} Stripe &nbsp;|&nbsp; 📦 24-48h
        </p>
      </div>

      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <img src="/logo.jpeg" alt="GoalKit" style={{ height: 60, width: 'auto', objectFit: 'contain', marginBottom: 16 }} />
            <p style={{ color: '#8a6060', fontSize: 14, lineHeight: 1.7 }}>{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a4040', marginBottom: 16 }}>
              {t.footer.links}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ href: '/', label: t.nav.home }, { href: '/#shop', label: t.nav.shop }, { href: '/cart', label: t.nav.cart }].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#6a4040', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#f5ede0'}
                  onMouseLeave={e => e.target.style.color = '#6a4040'}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a4040', marginBottom: 16 }}>
              {t.footer.contact}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ color: '#6a4040', fontSize: 14 }}>📧 info@goalkit.be</p>
              <p style={{ color: '#6a4040', fontSize: 14 }}>📞 +32 (0)2 123 45 67</p>
              <p style={{ color: '#6a4040', fontSize: 14 }}>🏠 Brussel, België</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6a4040', marginBottom: 16 }}>
              {t.footer.newsletter}
            </h4>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder={t.footer.newsletterPlaceholder}
                style={{ flex: 1, padding: '10px 14px', background: '#2a0a14', border: '1px solid #3a1020', borderRight: 'none', color: '#f5ede0', fontSize: 13, borderRadius: '4px 0 0 4px', outline: 'none', fontFamily: 'var(--font-body)' }} />
              <button className="btn btn-primary" style={{ borderRadius: '0 4px 4px 0', padding: '10px 16px', fontSize: 12 }}>
                {t.footer.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #2a0a14', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#4a2020', fontSize: 13 }}>© 2024 GoalKit. {t.footer.rights}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            {['💳 Visa', '💳 Mastercard', '💳 Bancontact', '💳 iDEAL'].map(p => (
              <span key={p} style={{ color: '#4a2020', fontSize: 12, fontFamily: 'var(--font-ui)' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
