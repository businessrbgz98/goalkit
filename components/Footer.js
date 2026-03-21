import Link from 'next/link';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function Footer() {
  const { lang } = useCartStore();
  const t = translations[lang];

  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid #1a3a1a',
      marginTop: 80
    }}>
      {/* Top bar */}
      <div style={{
        background: 'var(--green)',
        padding: '12px 0',
        textAlign: 'center'
      }}>
        <p className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ⚽ {t.hero.badge} &nbsp;|&nbsp; 🔒 {t.footer.secure} Stripe &nbsp;|&nbsp; 📦 24-48h delivery
        </p>
      </div>

      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 40
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 24 }}>⚽</span>
              <span className="display" style={{ fontSize: 24 }}>
                GOAL<span style={{ color: 'var(--green)' }}>KIT</span>
              </span>
            </div>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
              {t.footer.links}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/', label: t.nav.home },
                { href: '/#shop', label: t.nav.shop },
                { href: '/cart', label: t.nav.cart },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#666', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = '#666'}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
              {t.footer.contact}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ color: '#666', fontSize: 14 }}>📧 info@goalkit.be</p>
              <p style={{ color: '#666', fontSize: 14 }}>📞 +32 (0)2 123 45 67</p>
              <p style={{ color: '#666', fontSize: 14 }}>🏠 Brussel, België</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="ui" style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888', marginBottom: 16 }}>
              {t.footer.newsletter}
            </h4>
            <div style={{ display: 'flex', gap: 0 }}>
              <input type="email" placeholder={t.footer.newsletterPlaceholder}
                style={{
                  flex: 1, padding: '10px 14px',
                  background: '#111', border: '1px solid #222',
                  borderRight: 'none', color: '#fff', fontSize: 13,
                  borderRadius: '4px 0 0 4px', outline: 'none',
                  fontFamily: 'var(--font-body)'
                }} />
              <button className="btn btn-primary" style={{ borderRadius: '0 4px 4px 0', padding: '10px 16px', fontSize: 12 }}>
                {t.footer.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #111',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <p style={{ color: '#444', fontSize: 13 }}>
            © 2024 GoalKit. {t.footer.rights}
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {['💳 Visa', '💳 Mastercard', '💳 Stripe'].map(p => (
              <span key={p} style={{ color: '#444', fontSize: 12, fontFamily: 'var(--font-ui)', letterSpacing: '0.05em' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
