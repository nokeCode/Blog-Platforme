import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Buttom';
import { createPost } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export const CreatePost = () => {
  const navigate = useNavigate();
  const { isAuth, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    image: '',
    imageFile: null,
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('category', formData.category);
    payload.append('excerpt', formData.excerpt);
    payload.append('content', formData.content);
    if (formData.imageFile) {
      payload.append('image', formData.imageFile);
    } else if (formData.image.trim()) {
      payload.append('image', formData.image.trim());
    }

    try {
      await createPost(payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de créer le post.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600 mb-8">Share your thoughts with the world</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Enter post title"
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
                <option value="">Select a category</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Technology">Technology</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optionnel)</label>
              <input
                type="url"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image depuis votre machine</label>
              <input
                type="file"
                accept="image/*"
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
              />
              {formData.imageFile && (
                <p className="mt-2 text-sm text-gray-500">Fichier sélectionné : {formData.imageFile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
              <textarea
                required
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="Short description of your post"
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
                placeholder="Write your post content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <div className="flex gap-4 pt-4 flex-col sm:flex-row">
              <Button type="submit" variant="primary" className="flex-1 justify-center py-3" disabled={saving}>
                {saving ? 'Publication…' : 'Publier l’article'}
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