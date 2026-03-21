import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';

export default function SuccessPage() {
  const { lang, clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, []);

  const msg = {
    nl: { title: 'Bestelling bevestigd!', sub: 'Bedankt voor je aankoop. Je ontvangt een bevestigingsmail.', btn: 'Verder winkelen' },
    fr: { title: 'Commande confirmée!', sub: 'Merci pour votre achat. Vous recevrez un e-mail de confirmation.', btn: 'Continuer mes achats' },
    en: { title: 'Order confirmed!', sub: 'Thank you for your purchase. You will receive a confirmation email.', btn: 'Continue shopping' }
  }[lang];

  return (
    <>
      <Head><title>✅ {msg.title} – GoalKit</title></Head>
      <Navbar />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🎉</div>
          <h1 className="display" style={{ fontSize: 48, marginBottom: 16, color: 'var(--green)' }}>{msg.title}</h1>
          <p style={{ color: '#888', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>{msg.sub}</p>
          <Link href="/#shop" className="btn btn-primary" style={{ fontSize: 14 }}>
            {msg.btn} →
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
