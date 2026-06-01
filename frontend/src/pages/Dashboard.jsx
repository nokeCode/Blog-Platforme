import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Edit3, Plus, User } from 'lucide-react';
import { getMyPosts, deletePost } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Buttom';

export const Dashboard = () => {
  const { user, isAuth, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, loading, navigate]);

  useEffect(() => {
    if (!isAuth) return;

    const fetchPosts = async () => {
      setLoadingPosts(true);
      setError('');
      try {
        const res = await getMyPosts();
        setPosts(res.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Impossible de charger vos articles.');
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [isAuth]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Voulez-vous vraiment supprimer cet article ?');
    if (!confirmed) return;

    try {
      await deletePost(id);
      setPosts((current) => current.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer l’article.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">Profil auteur</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bonjour, {user?.name || 'Auteur'}</h1>
            <p className="mt-2 text-sm text-gray-600">Gérez vos articles, éditez-les ou supprimez-les depuis votre espace personnel.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/create">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={16} />
                Nouvel article
              </Button>
            </Link>
            <Button variant="secondary" className="flex items-center gap-2" onClick={() => navigate('/blog')}>
              <User size={16} />
              Voir le blog
            </Button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700 mb-8">
            {error}
          </div>
        )}

        <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Mes articles</h2>
              <p className="text-sm text-gray-500">{posts.length} article{posts.length > 1 ? 's' : ''} publié{posts.length > 1 ? 's' : ''}</p>
            </div>
            <span className="text-sm text-gray-500">Dernière mise à jour</span>
          </div>

          {loadingPosts ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-24 rounded-3xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg font-medium">Vous n'avez pas encore d'articles.</p>
              <p className="mt-2 text-sm text-gray-500">Publiez votre premier article pour le partager avec vos lecteurs.</p>
              <Link to="/create" className="inline-flex mt-6 items-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition-colors">
                Écrire un article
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <article key={post._id} className="rounded-3xl border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[var(--color-text-muted)]">{post.category || 'Sans catégorie'}</p>
                      <Link to={`/post/${post._id}`} className="text-xl font-semibold text-gray-900 hover:text-[var(--color-accent)] transition-colors block truncate">
                        {post.title}
                      </Link>
                      <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">{post.excerpt || 'Aucun extrait disponible.'}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:items-end">
                      <span className="text-xs uppercase tracking-[0.2em] text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600">
                        {post.readTime || 'Lecture rapide'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link to={`/edit/${post._id}`} className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <Edit3 size={16} />
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
