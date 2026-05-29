import { Link } from 'react-router-dom';

export const Footer = () => {
  const footerLinks = {
    Produit: ['Fonctionnalités', 'Templates', 'Intégrations', 'Pricing'],
    Ressources: ['Blog', 'Guides', 'Documentation', 'API'],
    Entreprise: ['À propos', 'Carrières', 'Contact', 'Presse'],
    Légal: ['Confidentialité', 'Conditions', 'Cookies'],
  };

  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-white">Bloge</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              La plateforme moderne pour créer, partager et découvrir du contenu exceptionnel.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Bloge. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'GitHub', 'Discord'].map((social) => (
              <a key={social} href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};