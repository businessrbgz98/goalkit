import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, items } = useCartStore();
  const t = translations[lang];
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #1a3a1a',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 64
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>⚽</span>
          <span className="display" style={{ fontSize: 26, color: '#f8f8f8', letterSpacing: '0.1em' }}>
            GOAL<span style={{ color: 'var(--green)' }}>KIT</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          <Link href="/" className="ui" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#aaa'}>
            {t.nav.home}
          </Link>
          <Link href="/#shop" className="ui" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#aaa'}>
            {t.nav.shop}
          </Link>
          <Link href="/#contact" className="ui" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = '#aaa'}>
            {t.nav.contact}
          </Link>
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
                  borderColor: lang === l ? 'var(--green)' : '#2a2a2a',
                  background: lang === l ? 'var(--green)' : 'transparent',
                  color: lang === l ? '#fff' : '#888',
                  transition: 'all 0.2s', cursor: 'pointer'
                }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Cart */}
          <Link href="/cart" style={{
            position: 'relative', display: 'flex', alignItems: 'center',
            justifyContent: 'center', width: 42, height: 42,
            border: '1px solid #2a2a2a', borderRadius: 4,
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                background: 'var(--green)', color: '#fff',
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
