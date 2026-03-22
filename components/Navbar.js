import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function Navbar() {
  const { lang, setLang, items } = useCartStore();
  const { data: session } = useSession();
  const t = translations[lang];
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(247,240,230,0.97)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e2d4c0',
      boxShadow: '0 2px 20px rgba(107,16,32,0.08)',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 70
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.jpeg"
            alt="GoalKit"
            style={{ height: 56, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
          {[
            { href: '/', label: t.nav.home },
            { href: '/#shop', label: t.nav.shop },
            { href: '/#contact', label: t.nav.contact },
            { href: '/custom-request', label: lang==='nl'?'Speciale Aanvraag':lang==='fr'?'Demande Spéciale':'Custom Request' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              className="ui"
              style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8a7060', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#6b1020'}
              onMouseLeave={e => e.target.style.color = '#8a7060'}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Language switcher */}
          <div style={{ display: 'flex', gap: 4 }}>
            {['nl', 'fr', 'en'].map(l => (
              <button key={l} onClick={() => setLang(l)}
                className="ui"
                style={{
                  padding: '4px 8px', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  borderRadius: 2, border: '1px solid',
                  borderColor: lang === l ? '#6b1020' : '#e2d4c0',
                  background: lang === l ? '#6b1020' : 'transparent',
                  color: lang === l ? '#f5ede0' : '#8a7060',
                  transition: 'all 0.2s', cursor: 'pointer'
                }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Cart */}
          <Link href="/cart" style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            justifyContent: 'center', width: 44, height: 44,
            border: '1px solid #e2d4c0', borderRadius: 4,
            transition: 'all 0.2s', color: '#6b1020'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#6b1020'; e.currentTarget.style.color = '#f5ede0'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6b1020'; }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: '#6b1020', color: '#f5ede0',
                width: 18, height: 18, borderRadius: '50%',
                fontSize: 11, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-ui)'
              }}>{itemCount}</span>
            )}
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
