import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedHero from '../components/FeaturedHero';
import PostCard from '../components/PostCard';
import { getFeaturedPost, getOtherFeatured, getRecentPosts } from '../utils/api';

export default function HomePage() {
  const [featured, setFeatured] = useState(null);
  const [otherFeatured, setOtherFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [f, of_, r] = await Promise.all([
          getFeaturedPost(),
          getOtherFeatured(),
          getRecentPosts(),
        ]);
        setFeatured(f);
        setOtherFeatured(of_);
        setRecent(r);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
          <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Hero */}
      <FeaturedHero post={featured} otherPosts={otherFeatured} />

      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-6 animate-fade-up stagger-3">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Recent Posts</h2>
          <Link
            to="/blog"
            className="text-sm font-medium text-[var(--color-text)] border border-[var(--color-border)] px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
