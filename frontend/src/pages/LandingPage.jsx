import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedPost, getOtherFeatured, getRecentPosts } from '../utils/api';

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function Avatar({ author, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-[11px]' : 'w-9 h-9 text-sm';
  if (author?.avatar) {
    return <img src={author.avatar} alt={author.name} className={`${sz} rounded-full object-cover ring-2 ring-white`} />;
  }
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white ring-2 ring-white`}>
      {author?.name?.[0]?.toUpperCase() || 'A'}
    </div>
  );
}

// ─── Hero: Main Featured Post ────────────────────────────────────────────────

function HeroPost({ post }) {
  if (!post) return null;
  return (
    <Link
      to={`/post/${post._id}`}
      className="group relative block rounded-3xl overflow-hidden bg-gray-900"
      style={{ minHeight: 480 }}
    >
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-[1.03] group-hover:opacity-65 transition-all duration-700 ease-out"
        />
      )}
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Badge FEATURED */}
      <div className="absolute top-6 left-6">
        <span className="inline-flex items-center gap-1.5 bg-amber-400 text-gray-900 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-900 inline-block" />
          Featured
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        {post.category && (
          <span className="inline-block border border-white/40 text-white/80 text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
            {post.category}
          </span>
        )}
        <h2 className="font-serif text-white text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-2xl group-hover:text-amber-50 transition-colors duration-300">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-white/70 text-base leading-relaxed max-w-xl mb-6 line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3">
          <Avatar author={post.author} />
          <div>
            <p className="text-white text-sm font-semibold">{post.author?.name || 'Author'}</p>
            <p className="text-white/50 text-xs">{formatDate(post.createdAt)} · {post.readTime || '5 min read'}</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
            Read story
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Sidebar Featured Posts ──────────────────────────────────────────────────

function SidebarPost({ post, index }) {
  return (
    <Link
      to={`/post/${post._id}`}
      className="group flex gap-4 p-3 -mx-3 rounded-2xl hover:bg-amber-50 transition-colors duration-200"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
        <span className="font-serif text-amber-600 font-bold text-sm">{index + 1}</span>
      </div>
      <div className="flex-1 min-w-0">
        {post.category && (
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500 block mb-1">{post.category}</span>
        )}
        <p className="text-gray-800 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
          {post.title}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Avatar author={post.author} size="sm" />
          <span className="text-xs text-gray-400">{post.author?.name}</span>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      {post.image && (
        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
    </Link>
  );
}

// ─── Recent Post Card ────────────────────────────────────────────────────────

function PostCard({ post }) {
  return (
    <Link
      to={`/post/${post._id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-100/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/9] bg-gray-100">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="text-amber-300">
              <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 6.5v1M12 16.5v1M6.5 12h1M16.5 12h1M8.4 8.4l.7.7M14.9 14.9l.7.7M14.9 8.4l-.7.7M8.4 14.9l-.7.7" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
        {post.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-gray-900 text-lg font-bold leading-snug mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors duration-200">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100 mt-auto">
          <Avatar author={post.author} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-700 truncate">{post.author?.name || 'Author'}</p>
          </div>
          <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(post.createdAt)}</span>
          {post.readTime && (
            <>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{post.readTime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Skeleton Loader ─────────────────────────────────────────────────────────

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Hero skeleton */}
      <Skeleton className="w-full rounded-3xl" style={{ height: 480 }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full aspect-[16/9]" />
            <Skeleton className="w-3/4 h-5" />
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-5/6 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section Divider ─────────────────────────────────────────────────────────

function SectionHeader({ title, linkTo = '/blog', linkLabel = 'View all' }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-1 h-7 bg-amber-400 rounded-full" />
        <h2 className="font-serif text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <Link
        to={linkTo}
        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
      >
        {linkLabel}
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}

// ─── Landing Page ────────────────────────────────────────────────────────────

export const LandingPage = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [otherFeatured, setOtherFeatured] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [hero, others, recent] = await Promise.all([
        getFeaturedPost(),
        getOtherFeatured(),
        getRecentPosts(),
      ]);
      setFeaturedPost(hero);
      setOtherFeatured(others);
      setRecentPosts(recent);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF8' }}>
      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1.2fr] gap-6">
          {/* Main hero */}
          <HeroPost post={featuredPost} />

          {/* Sidebar trending */}
          {otherFeatured.length > 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <span className="w-5 h-5 rounded-full bg-amber-400 flex-shrink-0" />
                <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500">Trending now</h3>
              </div>
              <div className="space-y-4 flex-1">
                {otherFeatured.map((post, i) => (
                  <SidebarPost key={post._id} post={post} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Topic Tags Strip ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase flex-shrink-0 pr-2">Browse:</span>
          {['Technology', 'Design', 'Science', 'Culture', 'Business', 'Health', 'Lifestyle', 'Politics'].map(tag => (
            <Link
              key={tag}
              to={`/blog?category=${tag.toLowerCase()}`}
              className="flex-shrink-0 px-4 py-1.5 bg-white text-gray-600 text-xs font-semibold rounded-full border border-gray-200 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50 transition-all duration-200"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 my-4" />
      </div>

      {/* ── Recent Posts ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader title="Latest Stories" />
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="text-amber-400">
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2zM13 4v6h6" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No stories published yet.</p>
            <Link to="/create" className="mt-4 inline-block text-amber-600 font-semibold text-sm hover:underline">
              Write the first one →
            </Link>
          </div>
        )}

        {/* View all CTA */}
        {recentPosts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/30"
            >
              Explore all articles
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* ── Newsletter Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-12 md:px-16 md:py-14 text-center"
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-400/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-400/5 translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10">
            <span className="inline-block bg-amber-400/20 text-amber-300 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Newsletter
            </span>
            <h3 className="font-serif text-white text-3xl md:text-4xl font-bold mb-3">
              Stories worth reading,<br />
              <span className="text-amber-400">every week.</span>
            </h3>
            <p className="text-white/60 text-base mb-8 max-w-md mx-auto">
              Join thousands of readers who get our best content delivered straight to their inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 bg-white/10 text-white placeholder-white/40 rounded-xl border border-white/20 focus:outline-none focus:border-amber-400/60 text-sm backdrop-blur-sm transition-colors"
              />
              <button className="px-6 py-3.5 bg-amber-400 text-gray-900 font-bold text-sm rounded-xl hover:bg-amber-300 transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-white/30 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};