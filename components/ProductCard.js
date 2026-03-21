import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function ProductCard({ product }) {
  const { lang, addItem } = useCartStore();
  const t = translations[lang];
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  const name = product.name[lang];
  const badgeLabel = product.badge
    ? (product.badge === 'bestseller' ? t.shop.bestseller
      : product.badge === 'new' ? t.shop.new
      : product.badge === 'champion' ? t.shop.champion : null)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!selectedSize) {
      alert(t.product?.selectSize || 'Selecteer een maat');
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <Link href={`/product/${product.id}`}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#111' }}>
          <img
            src={product.image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {badgeLabel && (
              <span className={`badge ${product.badge === 'champion' ? 'badge-gold' : product.badge === 'bestseller' ? 'badge-green' : 'badge-red'}`}>
                {badgeLabel}
              </span>
            )}
            <span className="badge" style={{ background: 'rgba(0,0,0,0.7)', color: '#aaa', border: '1px solid #2a2a2a' }}>
              {product.flag} {product.type === 'home' ? t.shop.home : t.shop.away}
            </span>
          </div>

          {product.stock <= 5 && product.stock > 0 && (
            <span className="badge badge-red" style={{ position: 'absolute', top: 12, right: 12 }}>
              {product.stock} left
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div>
          {product.club && (
            <p className="ui" style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
              {product.club}
            </p>
          )}
          <Link href={`/product/${product.id}`}>
            <h3 className="ui" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.03em', lineHeight: 1.3 }}>
              {name}
            </h3>
          </Link>
        </div>

        {/* Colors */}
        <div style={{ display: 'flex', gap: 6 }}>
          {product.colors.map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: c, border: '1px solid #333' }} />
          ))}
        </div>

        {/* Size selector */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {product.sizes.map(s => (
            <button key={s} onClick={() => setSelectedSize(s)}
              className="ui"
              style={{
                padding: '4px 10px', fontSize: 12, fontWeight: 700,
                border: '1px solid',
                borderColor: selectedSize === s ? 'var(--green)' : '#2a2a2a',
                background: selectedSize === s ? 'var(--green)' : 'transparent',
                color: selectedSize === s ? '#fff' : '#888',
                borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s',
                letterSpacing: '0.05em', textTransform: 'uppercase'
              }}>
              {s}
            </button>
          ))}
        </div>

        {/* Price + Add */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span className="display" style={{ fontSize: 22, color: 'var(--gold)' }}>
            €{product.price.toFixed(2)}
          </span>
          {product.stock > 0 ? (
            <button
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: 12 }}
              onClick={handleAdd}>
              {added ? '✓ OK' : t.shop.addToCart}
            </button>
          ) : (
            <span className="ui" style={{ color: '#666', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.shop.outOfStock}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
