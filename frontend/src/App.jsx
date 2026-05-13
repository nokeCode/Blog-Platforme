import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/admin/DashboardPage';
import PostEditorPage from './pages/admin/PostEditorPage';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-6xl font-normal text-[var(--color-text)]">404</h1>
      <p className="text-[var(--color-text-muted)]">Page introuvable</p>
      <a href="/" className="text-sm text-[var(--color-text)] underline underline-offset-4">← Retour à l'accueil</a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<PostDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/get-started" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/new" element={<PostEditorPage />} />
            <Route path="/dashboard/edit/:id" element={<PostEditorPage />} />
            <Route path="/features" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/demo" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
