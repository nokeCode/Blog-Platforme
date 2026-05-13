import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPosts, deletePost } from '../../utils/api';

export default function DashboardPage() {
  const { user, isAuth, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuth) navigate('/login');
  }, [authLoading, isAuth, navigate]);

  useEffect(() => {
    if (isAuth) {
      getPosts().then((data) => {
        // Handle both array and paginated response
        const list = Array.isArray(data) ? data : data?.data || [];
        setPosts(list);
        setLoading(false);
      });
    }
  }, [isAuth]);

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet article ?')) return;
    setDeleting(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert('Erreur lors de la suppression');
    } finally {
      setDeleting(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-up stagger-1">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text)]">Tableau de bord</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            Bienvenue, <span className="font-medium text-[var(--color-text)]">{user?.name}</span>
          </p>
        </div>
        <Link
          to="/dashboard/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium rounded-xl hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Plus size={15} />
          Nouvel article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-fade-up stagger-2">
        {[
          { label: 'Total articles', value: posts.length },
          { label: 'Publiés', value: posts.filter((p) => p.published !== false).length },
          { label: 'Mis en avant', value: posts.filter((p) => p.isFeatured).length },
          { label: 'Vues totales', value: posts.reduce((acc, p) => acc + (p.views || 0), 0) },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[var(--color-border)] rounded-2xl p-5">
            <p className="text-2xl font-semibold text-[var(--color-text)]">{stat.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Posts table */}
      <div className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden animate-fade-up stagger-3">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-sm font-semibold text-[var(--color-text)]">Mes articles</h2>
        </div>

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[var(--color-text-muted)] mb-4">Aucun article pour le moment</p>
            <Link
              to="/dashboard/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white text-sm rounded-xl"
            >
              <Plus size={14} /> Créer mon premier article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]">
            {posts.map((post) => (
              <div key={post._id} className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--color-bg)] transition-colors">
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {post.image && (
                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">{post.title}</p>
                    {post.isFeatured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-[var(--color-text-muted)]">{post.category}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{post.readTime}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published !== false
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {post.published !== false ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <Link
                    to={`/blog/${post._id}`}
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                    title="Voir"
                  >
                    <Eye size={14} />
                  </Link>
                  <Link
                    to={`/dashboard/edit/${post._id}`}
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deleting === post._id}
                    className="p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                    title="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
