import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border)] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[var(--color-accent)] rounded-md flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L2 4v4c0 3.5 6 6 6 6s6-2.5 6-6V4L8 1z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-sm">Beyond UI</span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              Insights on design, development, and building products people love.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Company</h4>
            <ul className="space-y-2">
              {['About us', 'Features', 'Blog', 'Contact'].map(item => (
                <li key={item}><Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <li key={item}><Link to="/" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Follow us</h4>
            <ul className="space-y-2">
              {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map(item => (
                <li key={item}><a href="#" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[var(--color-text-muted)]">© {new Date().getFullYear()} Beyond UI. All rights reserved.</p>
          <p className="text-xs text-[var(--color-text-muted)]">Built with React & MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
