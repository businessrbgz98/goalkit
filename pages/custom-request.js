import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';

export default function CustomRequestPage() {
  const { lang } = useCartStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', description: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    nl: {
      title: 'Speciale Aanvraag',
      subtitle: 'Heb je een shirt gezien dat je niet in ons aanbod vindt? Dien een aanvraag in en we contacteren je binnen 24 uur met een aankooplink.',
      name: 'Naam', email: 'E-mailadres', phone: 'Telefoonnummer (optioneel)',
      desc: 'Omschrijving van het shirt', descPlaceholder: 'Beschrijf het shirt zo gedetailleerd mogelijk: ploeg, kleur, seizoen, bijzonderheden...',
      photo: 'Foto uploaden (optioneel)', photoBtn: 'Kies een foto',
      btn: 'Aanvraag indienen',
      successTitle: 'Aanvraag ontvangen! 🎉',
      successMsg: 'We contacteren je binnen 24 uur via e-mail met een aankooplink.',
      badge: '⏱️ Antwoord binnen 24 uur',
    },
    fr: {
      title: 'Demande Spéciale',
      subtitle: "Vous avez vu un maillot que vous ne trouvez pas dans notre offre ? Soumettez une demande et nous vous contacterons dans les 24h avec un lien d'achat.",
      name: 'Nom', email: 'Adresse e-mail', phone: 'Téléphone (optionnel)',
      desc: 'Description du maillot', descPlaceholder: 'Décrivez le maillot en détail : équipe, couleur, saison, particularités...',
      photo: 'Télécharger une photo (optionnel)', photoBtn: 'Choisir une photo',
      btn: 'Soumettre la demande',
      successTitle: 'Demande reçue ! 🎉',
      successMsg: "Nous vous contacterons dans les 24h par e-mail avec un lien d'achat.",
      badge: '⏱️ Réponse dans les 24h',
    },
    en: {
      title: 'Custom Request',
      subtitle: "Seen a shirt you can't find in our collection? Submit a request and we'll contact you within 24 hours with a purchase link.",
      name: 'Name', email: 'Email address', phone: 'Phone number (optional)',
      desc: 'Shirt description', descPlaceholder: 'Describe the shirt in detail: team, color, season, special features...',
      photo: 'Upload a photo (optional)', photoBtn: 'Choose a photo',
      btn: 'Submit request',
      successTitle: 'Request received! 🎉',
      successMsg: "We'll contact you within 24 hours by email with a purchase link.",
      badge: '⏱️ Response within 24 hours',
    },
  }[lang];

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, imageBase64: image }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>{labels.title} – GoalKit</title></Head>
      <Navbar />

      <div style={{ background: '#f7f0e6', minHeight: '80vh', padding: '60px 24px' }}>
        <div className="container" style={{ maxWidth: 680 }}>

          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <span className="badge" style={{ background: '#6b1020', color: '#f5ede0', marginBottom: 16, display: 'inline-block' }}>
              {labels.badge}
            </span>
            <h1 className="display" style={{ fontSize: 'clamp(36px,6vw,72px)', color: '#1a0a0e', lineHeight: 0.95, marginBottom: 16 }}>
              {labels.title}
            </h1>
            <div className="divider" />
            <p style={{ color: '#8a7060', fontSize: 16, lineHeight: 1.7, marginTop: 16, maxWidth: 520 }}>
              {labels.subtitle}
            </p>
          </div>

          {success ? (
            <div style={{ background: '#faf5ee', border: '2px solid #6b1020', borderRadius: 8, padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <h2 className="display" style={{ fontSize: 36, color: '#6b1020', marginBottom: 12 }}>{labels.successTitle}</h2>
              <p style={{ color: '#8a7060', fontSize: 16, lineHeight: 1.7 }}>{labels.successMsg}</p>
              <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => { setSuccess(false); setForm({ name:'',email:'',phone:'',description:'' }); setImagePreview(null); }}>
                {lang==='nl' ? 'Nieuwe aanvraag' : lang==='fr' ? 'Nouvelle demande' : 'New request'}
              </button>
            </div>
          ) : (
            <div style={{ background: '#faf5ee', border: '1px solid #e2d4c0', borderRadius: 8, padding: 40 }}>
              {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 4, padding: '12px 16px', marginBottom: 20, color: '#cc2200', fontSize: 14 }}>⚠️ {error}</div>}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[{ key:'name', label:labels.name, type:'text' }, { key:'email', label:labels.email, type:'email' }].map(f => (
                    <div key={f.key}>
                      <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} required
                        style={{ width:'100%', padding:'11px 14px', background:'#fff', border:'1px solid #e2d4c0', color:'#1a0a0e', fontSize:14, borderRadius:4, outline:'none', fontFamily:'var(--font-b)' }}
                        onFocus={e => e.target.style.borderColor='#6b1020'}
                        onBlur={e => e.target.style.borderColor='#e2d4c0'} />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{labels.phone}</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})}
                    style={{ width:'100%', padding:'11px 14px', background:'#fff', border:'1px solid #e2d4c0', color:'#1a0a0e', fontSize:14, borderRadius:4, outline:'none', fontFamily:'var(--font-b)' }}
                    onFocus={e => e.target.style.borderColor='#6b1020'}
                    onBlur={e => e.target.style.borderColor='#e2d4c0'} />
                </div>

                <div>
                  <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{labels.desc} *</label>
                  <textarea rows={5} value={form.description} onChange={e => setForm({...form,description:e.target.value})} required
                    placeholder={labels.descPlaceholder}
                    style={{ width:'100%', padding:'11px 14px', background:'#fff', border:'1px solid #e2d4c0', color:'#1a0a0e', fontSize:14, borderRadius:4, outline:'none', fontFamily:'var(--font-b)', resize:'vertical' }}
                    onFocus={e => e.target.style.borderColor='#6b1020'}
                    onBlur={e => e.target.style.borderColor='#e2d4c0'} />
                </div>

                <div>
                  <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>{labels.photo}</label>
                  <label style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'#fff', border:'1px solid #e2d4c0', borderRadius:4, cursor:'pointer', fontFamily:'var(--font-u)', fontSize:13, fontWeight:700, letterSpacing:'0.05em', transition:'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='#6b1020'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='#e2d4c0'}>
                    📎 {labels.photoBtn}
                    <input type="file" accept="image/*" onChange={handleImage} style={{ display:'none' }} />
                  </label>
                  {imagePreview && (
                    <div style={{ marginTop: 12, position:'relative', display:'inline-block' }}>
                      <img src={imagePreview} alt="Preview" style={{ height:120, borderRadius:4, border:'1px solid #e2d4c0', objectFit:'cover' }} />
                      <button type="button" onClick={() => { setImage(null); setImagePreview(null); }}
                        style={{ position:'absolute', top:-8, right:-8, background:'#6b1020', color:'#fff', width:20, height:20, borderRadius:'50%', border:'none', cursor:'pointer', fontSize:12, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf:'flex-start', fontSize:15, padding:'14px 36px', opacity:loading?0.7:1 }} disabled={loading}>
                  {loading ? '⏳ ...' : labels.btn + ' →'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
