import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Homepage', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'Features', to: '/features' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact us', to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuth, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4l6-3 6 3v4c0 3.5-6 6-6 6S2 11.5 2 8V4z" fill="white" opacity="0.3"/>
              <path d="M8 1L2 4v4c0 3.5 6 6 6 6s6-2.5 6-6V4L8 1z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[var(--color-text)]">Beyond UI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm rounded-lg transition-colors ${isActive ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]'}`
              }>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAuth ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg)] transition-colors">
                <LayoutDashboard size={13} /> Dashboard
              </Link>
              <button onClick={logout} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors">
                <LogOut size={13} /> Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg)] transition-colors">Demo</Link>
              <Link to="/get-started" className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors">Get Started</Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-[var(--color-bg)]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-border)] px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm rounded-lg transition-colors ${isActive ? 'text-[var(--color-text)] font-medium bg-[var(--color-bg)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`
              }>
              {link.label}
            </NavLink>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            {isAuth ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-sm text-center border border-[var(--color-border)] rounded-lg">Dashboard</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="px-4 py-2 text-sm text-center text-white bg-[var(--color-accent)] rounded-lg">Déconnexion</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-sm text-center border border-[var(--color-border)] rounded-lg">Connexion</Link>
                <Link to="/get-started" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-sm text-center text-white bg-[var(--color-accent)] rounded-lg">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
