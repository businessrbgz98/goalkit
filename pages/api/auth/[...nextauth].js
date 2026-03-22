import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../../../lib/supabase';

export const authOptions = {
  providers: [
    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Email + Wachtwoord
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Wachtwoord', type: 'password' },
      },
      async authorize(credentials) {
        const supabase = supabaseAdmin();
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (!user) throw new Error('Geen account gevonden met dit e-mailadres.');
        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) throw new Error('Verkeerd wachtwoord.');

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Bij Google login: maak account aan als het nog niet bestaat
      if (account.provider === 'google') {
        const supabase = supabaseAdmin();
        const { data: existing } = await supabase
          .from('users')
          .select('id')
          .eq('email', user.email)
          .single();

        if (!existing) {
          await supabase.from('users').insert({
            email: user.email,
            name: user.name,
            provider: 'google',
            created_at: new Date().toISOString(),
          });
        }
      }
      return true;
    },

    async session({ session }) {
      const supabase = supabaseAdmin();
      const { data: user } = await supabase
        .from('users')
        .select('id, name, email')
        .eq('email', session.user.email)
        .single();

      if (user) session.user.id = user.id;
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
