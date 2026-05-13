import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import PostCard from '../components/PostCard';
import { getPosts } from '../utils/api';

const CATEGORIES = ['All', 'Business', 'Design', 'Technology', 'UX'];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filtered = posts.filter((p) => {
    const matchQ = p.title.toLowerCase().includes(query.toLowerCase());
    const matchC = activeCategory === 'All' || p.category === activeCategory;
    return matchQ && matchC;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-up stagger-1">
        <h1 className="font-display text-4xl font-normal text-[var(--color-text)] mb-2">All Posts</h1>
        <p className="text-[var(--color-text-muted)]">Explore articles on design, UX, and SaaS.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 animate-fade-up stagger-2">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--color-border)] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/10 focus:border-[var(--color-accent)]"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm rounded-xl shrink-0 transition-colors font-medium ${
                activeCategory === cat
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-white text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-[var(--color-text-muted)]">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
