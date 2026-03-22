import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';

const tabs = ['orders', 'requests', 'profile'];

export default function AccountPage() {
  const { lang } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');
  const [data, setData] = useState({ orders: [], requests: [], user: null });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [profile, setProfile] = useState({ name:'', phone:'', address:'', city:'', postal_code:'', country:'' });

  const labels = {
    nl: {
      title: 'Mijn Account', orders: 'Bestellingen', requests: 'Aanvragen', profile: 'Mijn Gegevens',
      logout: 'Uitloggen', noOrders: 'Je hebt nog geen bestellingen.', noRequests: 'Je hebt nog geen speciale aanvragen.',
      order: 'Bestelling', date: 'Datum', status: 'Status', total: 'Totaal', invoice: 'Factuur',
      name: 'Naam', phone: 'Telefoon', address: 'Adres', city: 'Stad', postal: 'Postcode', country: 'Land',
      save: 'Opslaan', saved: '✓ Opgeslagen!',
      newRequest: 'Nieuwe aanvraag indienen',
      statusLabels: { pending:'In behandeling', processing:'In verwerking', shipped:'Verzonden', delivered:'Geleverd', cancelled:'Geannuleerd' },
    },
    fr: {
      title: 'Mon Compte', orders: 'Commandes', requests: 'Demandes', profile: 'Mes Données',
      logout: 'Se déconnecter', noOrders: "Vous n'avez pas encore de commandes.", noRequests: "Vous n'avez pas encore de demandes spéciales.",
      order: 'Commande', date: 'Date', status: 'Statut', total: 'Total', invoice: 'Facture',
      name: 'Nom', phone: 'Téléphone', address: 'Adresse', city: 'Ville', postal: 'Code postal', country: 'Pays',
      save: 'Enregistrer', saved: '✓ Enregistré !',
      newRequest: 'Nouvelle demande spéciale',
      statusLabels: { pending:'En attente', processing:'En traitement', shipped:'Expédié', delivered:'Livré', cancelled:'Annulé' },
    },
    en: {
      title: 'My Account', orders: 'Orders', requests: 'Requests', profile: 'My Details',
      logout: 'Logout', noOrders: "You don't have any orders yet.", noRequests: "You don't have any custom requests yet.",
      order: 'Order', date: 'Date', status: 'Status', total: 'Total', invoice: 'Invoice',
      name: 'Name', phone: 'Phone', address: 'Address', city: 'City', postal: 'Postal code', country: 'Country',
      save: 'Save', saved: '✓ Saved!',
      newRequest: 'Submit new request',
      statusLabels: { pending:'Pending', processing:'Processing', shipped:'Shipped', delivered:'Delivered', cancelled:'Cancelled' },
    },
  }[lang];

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/account').then(r => r.json()).then(d => {
        setData(d);
        if (d.user) setProfile({
          name: d.user.name || '',
          phone: d.user.phone || '',
          address: d.user.address || '',
          city: d.user.city || '',
          postal_code: d.user.postal_code || '',
          country: d.user.country || '',
        });
        setLoading(false);
      });
    }
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/account', { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(profile) });
    setSaving(false);
    setSaveMsg(labels.saved);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const statusColor = (s) => ({
    pending: '#f0a000', processing: '#003DA5', shipped: '#6b1020', delivered: '#1a7a1a', cancelled: '#888'
  }[s] || '#888');

  if (status === 'loading' || loading) return (
    <>
      <Navbar />
      <div style={{ minHeight:'70vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f7f0e6' }}>
        <p style={{ color:'#8a7060', fontFamily:'var(--font-u)', fontSize:16 }}>⏳ Laden...</p>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Head><title>{labels.title} – GoalKit</title></Head>
      <Navbar />

      <div style={{ background:'#f7f0e6', minHeight:'80vh', padding:'40px 24px' }}>
        <div className="container" style={{ maxWidth:960 }}>

          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32, flexWrap:'wrap', gap:16 }}>
            <div>
              <h1 className="display" style={{ fontSize:'clamp(32px,5vw,56px)', color:'#1a0a0e' }}>{labels.title}</h1>
              <p style={{ color:'#8a7060', fontSize:14, marginTop:4 }}>👋 {session?.user?.name || session?.user?.email}</p>
            </div>
            <button onClick={() => signOut({ callbackUrl:'/' })} className="btn btn-outline" style={{ fontSize:13 }}>
              {labels.logout}
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', gap:4, marginBottom:32, borderBottom:'2px solid #e2d4c0', paddingBottom:0 }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="ui"
                style={{ padding:'10px 20px', fontSize:14, fontWeight:700, letterSpacing:'0.05em', textTransform:'uppercase', cursor:'pointer', background:'transparent', border:'none', borderBottom: activeTab===tab ? '2px solid #6b1020' : '2px solid transparent', color: activeTab===tab ? '#6b1020' : '#8a7060', marginBottom:'-2px', transition:'all 0.2s' }}>
                {labels[tab]}
              </button>
            ))}
          </div>

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div>
              {data.orders.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px 0' }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>📦</div>
                  <p style={{ color:'#8a7060', fontSize:16, marginBottom:24 }}>{labels.noOrders}</p>
                  <Link href="/#shop" className="btn btn-primary">{lang==='nl'?'Ga winkelen':lang==='fr'?'Aller magasiner':'Go shopping'}</Link>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {data.orders.map(order => (
                    <div key={order.id} style={{ background:'#faf5ee', border:'1px solid #e2d4c0', borderRadius:8, padding:24 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:16 }}>
                        <div>
                          <p className="ui" style={{ fontSize:13, color:'#8a7060', letterSpacing:'0.08em', textTransform:'uppercase' }}>{labels.order} #{order.id?.slice(0,8)}</p>
                          <p style={{ fontSize:13, color:'#8a7060', marginTop:2 }}>📅 {new Date(order.created_at).toLocaleDateString(lang==='nl'?'nl-BE':lang==='fr'?'fr-BE':'en-GB')}</p>
                        </div>
                        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                          <span style={{ background:statusColor(order.status), color:'#fff', padding:'4px 12px', borderRadius:2, fontSize:12, fontFamily:'var(--font-u)', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                            {labels.statusLabels[order.status] || order.status}
                          </span>
                          <span className="display" style={{ fontSize:20, color:'#6b1020' }}>€{order.total?.toFixed(2)}</span>
                        </div>
                      </div>
                      {order.items && (
                        <div style={{ borderTop:'1px solid #e2d4c0', paddingTop:12 }}>
                          {(typeof order.items === 'string' ? JSON.parse(order.items) : order.items).map((item, i) => (
                            <p key={i} style={{ fontSize:13, color:'#8a7060', padding:'4px 0' }}>
                              👕 {item.name} · {item.size} × {item.qty}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REQUESTS TAB */}
          {activeTab === 'requests' && (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24, flexWrap:'wrap', gap:12 }}>
                <p style={{ color:'#8a7060', fontSize:14 }}>{data.requests.length} {lang==='nl'?'aanvragen':lang==='fr'?'demandes':'requests'}</p>
                <Link href="/custom-request" className="btn btn-primary" style={{ fontSize:13 }}>+ {labels.newRequest}</Link>
              </div>
              {data.requests.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px 0' }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>🎽</div>
                  <p style={{ color:'#8a7060', fontSize:16, marginBottom:24 }}>{labels.noRequests}</p>
                  <Link href="/custom-request" className="btn btn-primary">{labels.newRequest}</Link>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {data.requests.map(req => (
                    <div key={req.id} style={{ background:'#faf5ee', border:'1px solid #e2d4c0', borderRadius:8, padding:24, display:'flex', gap:20, flexWrap:'wrap' }}>
                      {req.image_url && <img src={req.image_url} alt="Shirt" style={{ width:80, height:80, objectFit:'cover', borderRadius:4, border:'1px solid #e2d4c0', flexShrink:0 }} />}
                      <div style={{ flex:1 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8, flexWrap:'wrap', gap:8 }}>
                          <p style={{ fontSize:13, color:'#8a7060' }}>📅 {new Date(req.created_at).toLocaleDateString()}</p>
                          <span style={{ background:statusColor(req.status), color:'#fff', padding:'3px 10px', borderRadius:2, fontSize:11, fontFamily:'var(--font-u)', fontWeight:700, textTransform:'uppercase' }}>
                            {labels.statusLabels[req.status] || req.status}
                          </span>
                        </div>
                        <p style={{ fontSize:14, color:'#1a0a0e', lineHeight:1.6 }}>{req.description}</p>
                        {req.purchase_link && (
                          <a href={req.purchase_link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop:12, display:'inline-flex', fontSize:13, padding:'8px 20px' }}>
                            🛒 {lang==='nl'?'Koop nu':lang==='fr'?'Acheter':'Buy now'}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div style={{ maxWidth:560 }}>
              <div style={{ background:'#faf5ee', border:'1px solid #e2d4c0', borderRadius:8, padding:32, display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { key:'name', label:labels.name },
                  { key:'phone', label:labels.phone },
                  { key:'address', label:labels.address },
                  { key:'city', label:labels.city },
                  { key:'postal_code', label:labels.postal },
                  { key:'country', label:labels.country },
                ].map(f => (
                  <div key={f.key}>
                    <label className="ui" style={{ fontSize:12, color:'#8a7060', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:6 }}>{f.label}</label>
                    <input type="text" value={profile[f.key]} onChange={e => setProfile({...profile,[f.key]:e.target.value})}
                      style={{ width:'100%', padding:'11px 14px', background:'#fff', border:'1px solid #e2d4c0', color:'#1a0a0e', fontSize:14, borderRadius:4, outline:'none', fontFamily:'var(--font-b)' }}
                      onFocus={e => e.target.style.borderColor='#6b1020'}
                      onBlur={e => e.target.style.borderColor='#e2d4c0'} />
                  </div>
                ))}

                <div style={{ display:'flex', alignItems:'center', gap:16, marginTop:8 }}>
                  <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ opacity:saving?0.7:1 }}>
                    {saving ? '⏳ ...' : labels.save}
                  </button>
                  {saveMsg && <span style={{ color:'#1a7a1a', fontFamily:'var(--font-u)', fontWeight:700, fontSize:14 }}>{saveMsg}</span>}
                </div>

                <div style={{ borderTop:'1px solid #e2d4c0', paddingTop:20, marginTop:4 }}>
                  <p className="ui" style={{ fontSize:12, color:'#8a7060', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12 }}>
                    {lang==='nl'?'Wachtwoord':lang==='fr'?'Mot de passe':'Password'}
                  </p>
                  <Link href="/change-password" className="btn btn-outline" style={{ fontSize:13 }}>
                    {lang==='nl'?'Wachtwoord wijzigen':lang==='fr'?'Changer le mot de passe':'Change password'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
