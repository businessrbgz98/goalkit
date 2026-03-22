import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { useCartStore } from '../../lib/store';
import { translations } from '../../data/translations';
import { products } from '../../data/products';

export async function getStaticPaths() {
  return {
    paths: products.map(p => ({ params: { id: p.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const product = products.find(p => p.id === params.id);
  const related = products.filter(p => p.country === product.country && p.id !== product.id).slice(0, 4);
  return { props: { product, related } };
}

export default function ProductPage({ product, related }) {
  const { lang, addItem } = useCartStore();
  const t = translations[lang];
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const name = product.name[lang];
  const desc = (product.description || product.desc || {})[lang] || '';

  const handleAdd = () => {
    if (!selectedSize) {
      alert(t.product.selectSize);
      return;
    }
    addItem(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <Head>
        <title>{name} – GoalKit</title>
        <meta name="description" content={desc} />
      </Head>

      <Navbar />

      <div className="container" style={{ padding: '40px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ color: '#555', fontSize: 13 }}>Home</Link>
          <span style={{ color: '#333' }}>/</span>
          <Link href="/#shop" style={{ color: '#555', fontSize: 13 }}>{t.nav.shop}</Link>
          <span style={{ color: '#333' }}>/</span>
          <span style={{ color: '#fff', fontSize: 13 }}>{name}</span>
        </div>

        {/* Product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 60,
          marginBottom: 80
        }}>
          {/* Image */}
          <div style={{
            aspectRatio: '4/5',
            background: '#111',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid #1a3a1a'
          }}>
            {!imgError ? (
              <img
                src={product.image}
                alt={name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: 16
              }}>
                <span style={{ fontSize: 64 }}>{product.flag}</span>
                <span className="display" style={{ fontSize: 24, color: '#333' }}>{name}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div>
              {product.club && (
                <p className="ui" style={{ color: 'var(--green)', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {product.club}
                </p>
              )}
              <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, marginBottom: 8 }}>
                {name}
              </h1>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{product.flag}</span>
                <span className="ui" style={{ color: '#666', fontSize: 13 }}>
                  {product.country} · {product.type === 'home' ? t.shop.home : t.shop.away}
                </span>
                {product.badge && (
                  <span className={`badge ${product.badge === 'champion' ? 'badge-gold' : product.badge === 'bestseller' ? 'badge-green' : 'badge-red'}`}>
                    {product.badge === 'bestseller' ? t.shop.bestseller : product.badge === 'new' ? t.shop.new : t.shop.champion}
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div>
              <span className="display" style={{ fontSize: 48, color: 'var(--gold)' }}>
                €{product.price.toFixed(2)}
              </span>
              <p className="ui" style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
                {product.stock > 0 ? `✓ ${t.product.inStock} (${product.stock})` : t.shop.outOfStock}
              </p>
            </div>

            {/* Colors */}
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Colors
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {product.colors.map((c, i) => (
                  <div key={i} style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: c, border: '2px solid #333'
                  }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {t.product.selectSize}
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    className="ui"
                    style={{
                      padding: '10px 18px', fontSize: 14, fontWeight: 700,
                      border: '1px solid',
                      borderColor: selectedSize === s ? 'var(--green)' : '#2a2a2a',
                      background: selectedSize === s ? 'var(--green)' : 'transparent',
                      color: selectedSize === s ? '#fff' : '#888',
                      borderRadius: 4, cursor: 'pointer', transition: 'all 0.15s',
                      letterSpacing: '0.05em', textTransform: 'uppercase'
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="ui" style={{ fontSize: 12, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                {t.product.quantity}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 120 }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: 36, height: 36, border: '1px solid #2a2a2a',
                    background: '#111', color: '#fff', fontSize: 18,
                    borderRadius: '4px 0 0 4px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>−</button>
                <div style={{
                  flex: 1, height: 36, border: '1px solid #2a2a2a',
                  borderLeft: 'none', borderRight: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15
                }}>{quantity}</div>
                <button onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: 36, height: 36, border: '1px solid #2a2a2a',
                    background: '#111', color: '#fff', fontSize: 18,
                    borderRadius: '0 4px 4px 0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>+</button>
              </div>
            </div>

            {/* Add to cart */}
            {product.stock > 0 ? (
              <button className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px', alignSelf: 'flex-start' }} onClick={handleAdd}>
                {added ? '✓ Toegevoegd!' : t.shop.addToCart}
              </button>
            ) : (
              <p className="ui" style={{ color: '#666', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t.shop.outOfStock}
              </p>
            )}

            {/* Description */}
            <div style={{
              padding: 20,
              background: 'var(--dark-card)',
              border: '1px solid var(--dark-border)',
              borderRadius: 4
            }}>
              <p className="ui" style={{ fontSize: 12, color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                {t.product.description}
              </p>
              <p style={{ color: '#aaa', fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="display" style={{ fontSize: 36, marginBottom: 24 }}>
              {lang === 'nl' ? 'Gerelateerd' : lang === 'fr' ? 'Similaires' : 'Related'}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 20
            }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
