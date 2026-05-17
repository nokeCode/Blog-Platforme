import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut, ChevronDown, Shield, Home, Info, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Homepage', to: '/', icon: Home },
  { label: 'About us', to: '/about', icon: Info },
  { label: 'Blog', to: '/blog', icon: BookOpen },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuth, logout, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const Brand = () => (
    <Link 
      to="/" 
      className="flex items-center gap-3 shrink-0 group"
    >
      <div className="relative w-9 h-9 bg-[var(--color-accent)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20 group-hover:shadow-[var(--color-accent)]/40 group-hover:scale-105 transition-all duration-300">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4l6-3 6 3v4c0 3.5-6 6-6 6S2 11.5 2 8V4z"
            fill="white"
            opacity="0.3"
          />
          <path
            d="M8 1L2 4v4c0 3.5 6 6 6 6s6-2.5 6-6V4L8 1z"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[15px] tracking-tight text-[var(--color-text)] leading-tight">
          Blog Platform
        </span>
        <span className="text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase font-medium hidden sm:block">
          Create & Share
        </span>
      </div>
    </Link>
  );

  const DesktopNavLinks = () => (
    <nav
      className="hidden md:flex flex-1 justify-center items-center gap-4"
      aria-label="Navigation principale"
    >
      {NAV_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative px-5 py-2.5 text-base font-medium rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'text-[var(--color-accent)] font-semibold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-2.5">
                  <Icon size={18} className={`transition-all duration-200 ${isActive ? 'text-[var(--color-accent)]' : 'opacity-60 group-hover:opacity-100'}`} />
                  <span className="relative z-10">{link.label}</span>
                </div>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full" />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );

  const AuthActions = ({ variant }) => {
    const isMobile = variant === 'mobile';

    if (isAuth) {
      if (isMobile) {
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-bg)] rounded-xl mb-2">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Shield size={18} className="text-[var(--color-accent)]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  {user?.name || 'Utilisateur'}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  Connecté
                </span>
              </div>
            </div>
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg)] transition-colors"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        );
      }

      return (
        <div className="hidden md:flex items-center gap-2 flex-shrink-0" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[var(--color-bg)] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Shield size={14} className="text-[var(--color-accent)]" />
              </div>
              <span className="text-sm font-medium text-[var(--color-text)] hidden lg:block">
                {user?.name || 'Mon compte'}
              </span>
              <ChevronDown 
                size={14} 
                className={`text-[var(--color-text-muted)] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-black/5 border border-[var(--color-border)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[var(--color-border)] mb-1">
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    {user?.name || 'Utilisateur'}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {user?.email || 'utilisateur@email.com'}
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
                >
                  <LayoutDashboard size={15} className="text-[var(--color-text-muted)]" />
                  Dashboard
                </Link>
                <div className="border-t border-[var(--color-border)] mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (isMobile) {
      return (
        <div className="flex flex-col gap-2">
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2.5 text-sm font-medium text-center text-[var(--color-text)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg)] transition-colors"
          >
            Connexion
          </Link>
          <Link
            to="/get-started"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2.5 text-sm font-medium text-center text-white bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Get Started
          </Link>
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center gap-4 flex-shrink-0">
        <Link
          to="/login"
          className="px-6 py-2.5 text-base font-medium text-[var(--color-text)] border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg)] hover:border-[var(--color-text-muted)] transition-all duration-200"
        >
          Connexion
        </Link>
        <Link
          to="/get-started"
          className="px-6 py-2.5 text-base font-medium text-white bg-[var(--color-accent)] rounded-xl hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent)]/25 active:scale-95 transition-all duration-200"
        >
          Get Started
        </Link>
      </div>
    );
  };

  return (
    <>
      <header 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-black/5 border-b border-[var(--color-border)]/60' 
            : 'bg-white border-b border-[var(--color-border)]'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7.5xl mx-auto flex items-center justify-between h-16 gap-8">
            <Brand />

            <DesktopNavLinks />

            <AuthActions variant="desktop" />

            {/* Bouton hamburger amélioré */}
            <button
              className="md:hidden relative w-10 h-10 rounded-xl hover:bg-[var(--color-bg)] transition-colors flex items-center justify-center"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute left-0 block w-5 h-0.5 bg-[var(--color-text)] rounded-full transition-all duration-300 ${menuOpen ? 'top-2 rotate-45' : 'top-0.5'}`} />
                <span className={`absolute left-0 top-2 block w-5 h-0.5 bg-[var(--color-text)] rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                <span className={`absolute left-0 block w-5 h-0.5 bg-[var(--color-text)] rounded-full transition-all duration-300 ${menuOpen ? 'top-2 -rotate-45' : 'top-3.5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Menu mobile amélioré */}
        <div 
          className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${
            menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
          
          <div className={`absolute top-0 left-0 right-0 bg-white shadow-xl transition-all duration-300 transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
              <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <nav className="space-y-1">
                  {NAV_LINKS.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200 ${
                            isActive
                              ? 'text-[var(--color-accent)] font-semibold bg-[var(--color-accent)]/5'
                              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)]'
                          }`
                        }
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          animation: menuOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                        }}
                      >
                        <Icon size={18} className={location.pathname === link.to ? 'text-[var(--color-accent)]' : ''} />
                        {link.label}
                      </NavLink>
                    );
                  })}
                </nav>

                <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
                  <AuthActions variant="mobile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Espace réservé pour le header fixe */}
      <div className="h-16" />
    </>
  );
}