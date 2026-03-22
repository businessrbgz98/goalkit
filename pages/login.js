import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../lib/store';
import { translations } from '../data/translations';

export default function LoginPage() {
  const { lang } = useCartStore();
  const t = translations[lang];
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', { email, password, redirect: false });
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/account');
    }
  };

  const handleGoogle = () => signIn('google', { callbackUrl: '/account' });

  const labels = {
    nl: { title: 'Inloggen', email: 'E-mailadres', password: 'Wachtwoord', btn: 'Inloggen', google: 'Inloggen met Google', noAccount: 'Nog geen account?', register: 'Registreer hier', forgot: 'Wachtwoord vergeten?' },
    fr: { title: 'Se connecter', email: 'Adresse e-mail', password: 'Mot de passe', btn: 'Se connecter', google: 'Connexion avec Google', noAccount: 'Pas encore de compte ?', register: "S'inscrire", forgot: 'Mot de passe oublié ?' },
    en: { title: 'Login', email: 'Email address', password: 'Password', btn: 'Login', google: 'Login with Google', noAccount: 'No account yet?', register: 'Register here', forgot: 'Forgot password?' },
  }[lang];

  return (
    <>
      <Head><title>{labels.title} – GoalKit</title></Head>
      <Navbar />
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', background: '#f7f0e6' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <img src="/logo.png" alt="GoalKit" style={{ height: 60, margin: '0 auto 16px' }} />
            <h1 className="display" style={{ fontSize: 40, color: '#1a0a0e' }}>{labels.title}</h1>
          </div>

          <div style={{ background: '#faf5ee', border: '1px solid #e2d4c0', borderRadius: 8, padding: 32 }}>
            {/* Google */}
            <button onClick={handleGoogle}
              style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, background: '#fff', border: '1px solid #e2d4c0', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-u)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 20, transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#6b1020'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2d4c0'}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              {labels.google}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: '#e2d4c0' }} />
              <span style={{ color: '#8a7060', fontSize: 12, fontFamily: 'var(--font-u)', letterSpacing: '0.08em' }}>OF</span>
              <div style={{ flex: 1, height: 1, background: '#e2d4c0' }} />
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 4, padding: '10px 14px', marginBottom: 16, color: '#cc2200', fontSize: 13 }}>
                ⚠️ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{labels.email}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '11px 14px', background: '#fff', border: '1px solid #e2d4c0', color: '#1a0a0e', fontSize: 14, borderRadius: 4, outline: 'none', fontFamily: 'var(--font-b)' }}
                  onFocus={e => e.target.style.borderColor = '#6b1020'}
                  onBlur={e => e.target.style.borderColor = '#e2d4c0'} />
              </div>
              <div>
                <label className="ui" style={{ fontSize: 12, color: '#8a7060', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{labels.password}</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                  style={{ width: '100%', padding: '11px 14px', background: '#fff', border: '1px solid #e2d4c0', color: '#1a0a0e', fontSize: 14, borderRadius: 4, outline: 'none', fontFamily: 'var(--font-b)' }}
                  onFocus={e => e.target.style.borderColor = '#6b1020'}
                  onBlur={e => e.target.style.borderColor = '#e2d4c0'} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                {loading ? '⏳ ...' : labels.btn}
              </button>
            </form>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <p style={{ fontSize: 13, color: '#8a7060' }}>
                {labels.noAccount} <Link href="/register" style={{ color: '#6b1020', fontWeight: 700 }}>{labels.register}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
