import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Image, Save, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getPostById, createPost, updatePost } from '../../utils/api';

const CATEGORIES = ['Business', 'Design', 'Technology', 'UX', 'Development', 'Other'];

export default function PostEditorPage() {
  const { id } = useParams(); // id = undefined for new post
  const isEdit = Boolean(id);
  const { isAuth, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Design',
    tags: '',
    isFeatured: false,
    published: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuth) navigate('/login');
  }, [authLoading, isAuth, navigate]);

  useEffect(() => {
    if (isEdit) {
      getPostById(id).then((post) => {
        if (post) {
          setForm({
            title: post.title || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            category: post.category || 'Design',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
            isFeatured: post.isFeatured || false,
            published: post.published !== false,
          });
          if (post.image) setImagePreview(post.image);
        }
        setFetchLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Le titre est requis');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (imageFile) formData.append('image', imageFile);

      if (isEdit) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 animate-fade-up stagger-1">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-xl hover:bg-[var(--color-border)] transition-colors text-[var(--color-text-muted)]"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-xl font-semibold text-[var(--color-text)]">
          {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image upload */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text)] mb-2">Image de couverture</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg)] cursor-pointer hover:border-[var(--color-accent)] transition-colors flex items-center justify-center group"
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm font-medium">Changer l'image</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
                <Image size={24} />
                <p className="text-sm">Cliquez pour ajouter une image</p>
                <p className="text-xs opacity-60">JPG, PNG, WebP · max 5 MB</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Titre *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Titre de l'article..."
            className="w-full px-4 py-3 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)] transition-all"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Extrait</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            placeholder="Un résumé court qui apparaîtra dans les listes..."
            rows={2}
            maxLength={300}
            className="w-full px-4 py-3 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)] resize-none transition-all"
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-1 text-right">{form.excerpt.length}/300</p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Contenu</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Rédigez votre article ici... (HTML supporté)"
            rows={14}
            className="w-full px-4 py-3 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)] resize-y font-mono transition-all"
          />
        </div>

        {/* Category + Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)]"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text)] mb-1.5">Tags (séparés par virgule)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="design, ux, saas"
              className="w-full px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6 pt-2">
          {[
            { key: 'isFeatured', label: 'Mettre en avant' },
            { key: 'published', label: 'Publier immédiatement' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  form[key] ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form[key] ? 'translate-x-4' : 'translate-x-0.5'
                }`} />
              </div>
              <span className="text-sm text-[var(--color-text)]">{label}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 text-sm font-medium border border-[var(--color-border)] rounded-xl hover:bg-[var(--color-bg)] transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium rounded-xl hover:bg-[var(--color-accent-hover)] disabled:opacity-50 transition-colors"
          >
            {loading ? <Loader size={14} className="animate-spin" /> : <Save size={14} />}
            {isEdit ? 'Mettre à jour' : 'Publier l\'article'}
          </button>
        </div>
      </form>
    </main>
  );
}
