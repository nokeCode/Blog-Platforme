import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Buttom';
import { getPostById, updatePost } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: '',
  });
  const [loadingPost, setLoadingPost] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, loading, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoadingPost(true);
      setError('');
      try {
        const res = await getPostById(id);
        const post = res?.data?.data;
        if (post) {
          setFormData({
            title: post.title || '',
            category: post.category || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            image: post.image || '',
          });
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Impossible de charger l’article.');
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await updatePost(id, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de mettre à jour l’article.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Modifier l’article</h1>
          <p className="text-gray-600 mb-8">Mettez à jour le contenu de votre article.</p>

          {loadingPost ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Business">Business</option>
                  <option value="Design">Design</option>
                  <option value="Technology">Technology</option>
                  <option value="Productivity">Productivity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  required
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  required
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-y"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="flex gap-4 pt-4 flex-col sm:flex-row">
                <Button type="submit" variant="primary" className="flex-1 justify-center py-3" disabled={saving}>
                  {saving ? 'Enregistrement…' : 'Enregistrer les modifications'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 justify-center py-3"
                  onClick={() => navigate('/dashboard')}
                >
                  Annuler
                </Button>
              </div>
            </form>
          )}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};