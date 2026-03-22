import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';
import { PERSONALIZATION_PRICE } from '../data/products';

export default function ProductCard({ product }) {
  const { lang, addItem } = useCartStore();
  const t = translations[lang];
  const [selectedSize, setSelectedSize] = useState(null);
  const [personalize, setPersonalize] = useState(false);
  const [added, setAdded] = useState(false);

  const name = product.name[lang];
  const totalPrice = personalize ? product.price + PERSONALIZATION_PRICE : product.price;

  const typeLabel = {
    home: { nl:'Thuis', fr:'Domicile', en:'Home' },
    away: { nl:'Uit', fr:'Extérieur', en:'Away' },
    third: { nl:'Derde', fr:'Third', en:'Third' },
    concept: { nl:'Concept', fr:'Concept', en:'Concept' },
  }[product.type]?.[lang] || product.type;

  const badgeLabel = product.badge === 'bestseller' ? t.shop.bestseller
    : product.badge === 'new' ? t.shop.new
    : product.badge === 'champion' ? t.shop.champion : null;

  const badgeColor = product.badge === 'champion'
    ? { bg:'#6b1020', color:'#f5ede0' }
    : product.badge === 'new'
    ? { bg:'#8b1830', color:'#f5ede0' }
    : { bg:'#4a0a15', color:'#f5ede0' };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!selectedSize) { alert(t.product?.selectSize || 'Kies een maat'); return; }
    addItem({ ...product, personalize }, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card" style={{ display:'flex', flexDirection:'column' }}>
      <Link href={`/product/${product.id}`}>
        <div style={{ position:'relative', aspectRatio:'4/5', overflow:'hidden', background:'#f0e8d8' }}>
          <img src={product.image} alt={name}
            style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }}
            onMouseEnter={e => e.target.style.transform='scale(1.05)'}
            onMouseLeave={e => e.target.style.transform='scale(1)'}
            onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;flex-direction:column;gap:8px"><span style="font-size:48px">${product.flag}</span><span style="color:#8a7060;font-size:13px;font-family:var(--font-ui)">${name}</span></div>`; }}
          />
          <div style={{ position:'absolute', top:10, left:10, display:'flex', flexDirection:'column', gap:5 }}>
            {badgeLabel && <span className="badge" style={{ background:badgeColor.bg, color:badgeColor.color }}>{badgeLabel}</span>}
            <span className="badge" style={{ background:'rgba(247,240,230,0.92)', color:'#6b1020', border:'1px solid #e2d4c0', fontSize:10 }}>
              {product.flag} {typeLabel}
            </span>
          </div>
          {product.league && (
            <span style={{ position:'absolute', bottom:10, left:10, background:'rgba(107,16,32,0.85)', color:'#f5ede0', fontSize:10, padding:'2px 8px', borderRadius:2, fontFamily:'var(--font-ui)', fontWeight:700, letterSpacing:'0.05em' }}>
              {product.league}
            </span>
          )}
        </div>
      </Link>

      <div style={{ padding:14, display:'flex', flexDirection:'column', gap:8, flex:1 }}>
        {product.club && <p style={{ fontFamily:'var(--font-u)', fontSize:11, color:'#6b1020', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>{product.club}</p>}
        <Link href={`/product/${product.id}`}>
          <p style={{ fontFamily:'var(--font-u)', fontSize:15, fontWeight:700, color:'#1a0a0e', lineHeight:1.3 }}>{name}</p>
        </Link>

        {/* Kleuren */}
        <div style={{ display:'flex', gap:5 }}>
          {product.colors.map((c,i) => <div key={i} style={{ width:12, height:12, borderRadius:'50%', background:c, border:'1px solid #d4c0a0' }} />)}
        </div>

        {/* Maten */}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {product.sizes.map(s => (
            <button key={s} onClick={() => setSelectedSize(s)}
              style={{
                padding:'3px 9px', fontSize:11, fontWeight:700,
                fontFamily:'var(--font-u)', letterSpacing:'0.05em', textTransform:'uppercase',
                border:'1px solid', borderRadius:2, cursor:'pointer', transition:'all 0.15s',
                borderColor: selectedSize===s ? '#6b1020' : '#e2d4c0',
                background: selectedSize===s ? '#6b1020' : 'transparent',
                color: selectedSize===s ? '#f5ede0' : '#8a7060',
              }}>{s}</button>
          ))}
        </div>

        {/* Personalisatie optie */}
        <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', padding:'8px 10px', background: personalize ? 'rgba(107,16,32,0.08)' : 'rgba(107,16,32,0.03)', border:`1px solid ${personalize ? '#6b1020' : '#e2d4c0'}`, borderRadius:3, transition:'all 0.2s' }}>
          <input type="checkbox" checked={personalize} onChange={e => setPersonalize(e.target.checked)}
            style={{ accentColor:'#6b1020', width:14, height:14 }} />
          <div>
            <p style={{ fontFamily:'var(--font-u)', fontSize:11, fontWeight:700, color:'#6b1020', letterSpacing:'0.05em', textTransform:'uppercase' }}>
              ✍️ {lang==='nl' ? 'Naam + Nummer' : lang==='fr' ? 'Nom + Numéro' : 'Name + Number'}
            </p>
            <p style={{ fontSize:10, color:'#8a7060' }}>+€{PERSONALIZATION_PRICE.toFixed(2)}</p>
          </div>
        </label>

        {/* Prijs + Toevoegen */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto' }}>
          <div>
            <span style={{ fontFamily:'var(--font-d)', fontSize:20, color:'#6b1020' }}>€{totalPrice.toFixed(2)}</span>
            {personalize && <span style={{ fontSize:10, color:'#8a7060', display:'block', fontFamily:'var(--font-u)' }}>{lang==='nl'?'incl. personalisatie':lang==='fr'?'incl. personnalisation':'incl. personalization'}</span>}
          </div>
          <button className="btn btn-primary" style={{ padding:'7px 14px', fontSize:11 }} onClick={handleAdd}>
            {added ? '✓' : t.shop.addToCart}
          </button>
        </div>
      </div>
    </div>
  );
}
