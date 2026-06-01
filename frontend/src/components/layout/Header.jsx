import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Buttom';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuth, user, logout } = useAuth();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Articles', href: '/blog' },
    { name: 'Auteurs', href: '/auteurs' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-900 bg-clip-text text-transparent">
              Bloge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthPage && (
              isAuth ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm">Mon profil</Button>
                  </Link>
                  <Link to="/create">
                    <Button variant="primary" size="sm">Nouveau post</Button>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Connexion</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="primary" size="sm">S'inscrire</Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-base font-medium text-gray-700 hover:text-primary-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuth && (
              <>
                <Link
                  to="/dashboard"
                  className="block text-base font-medium text-gray-700 hover:text-primary-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon profil
                </Link>
                <Link
                  to="/create"
                  className="block text-base font-medium text-gray-700 hover:text-primary-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nouveau post
                </Link>
              </>
            )}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              {isAuth ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Déconnexion
                </button>
              ) : (
                <> 
                  <Link to="/login" className="block w-full">
                    <Button variant="ghost" className="w-full justify-center">Connexion</Button>
                  </Link>
                  <Link to="/signup" className="block w-full">
                    <Button variant="primary" className="w-full justify-center">S'inscrire</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};