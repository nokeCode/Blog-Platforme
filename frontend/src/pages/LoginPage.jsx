import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm animate-fade-up stagger-1">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L2 4v4c0 3.5 6 6 6 6s6-2.5 6-6V4L8 1z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-[15px]">Beyond UI</span>
        </div>

        <h1 className="font-display text-3xl font-normal text-[var(--color-text)] mb-1">Bienvenue</h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">Connectez-vous à votre compte auteur</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@exemple.com"
              className="w-full px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Mot de passe</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 pr-10 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium rounded-xl hover:bg-[var(--color-accent-hover)] disabled:opacity-50 transition-colors mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <>
                <LogIn size={14} />
                Se connecter
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-[var(--color-text)] font-medium underline underline-offset-2">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  );
}
