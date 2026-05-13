import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { getPostById } from '../utils/api';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(id).then((data) => {
      setPost(data);
      setLoading(false);
    });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-medium">Post not found</p>
        <Link to="/blog" className="text-sm text-[var(--color-text-muted)] underline">← Back to blog</Link>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-8 transition-colors"
      >
        <ArrowLeft size={14} />
        Back to blog
      </Link>

      {/* Category */}
      {post.category && (
        <span className="inline-block bg-[var(--color-bg)] text-xs font-medium text-[var(--color-text-muted)] px-3 py-1 rounded-full mb-4 border border-[var(--color-border)]">
          {post.category}
        </span>
      )}

      {/* Title */}
      <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight text-[var(--color-text)] mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          {post.author?.avatar ? (
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={14} className="text-gray-500" />
            </div>
          )}
          <span className="text-sm font-medium text-[var(--color-text)]">{post.author?.name || 'Unknown'}</span>
        </div>
        {post.readTime && (
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
            <Clock size={13} />
            {post.readTime}
          </div>
        )}
      </div>

      {/* Hero image */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-sm max-w-none text-[var(--color-text)] leading-relaxed">
        {post.content ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <div className="space-y-4 text-[15px]">
            <p>{post.excerpt || 'Full content coming soon. Stay tuned for updates!'}</p>
            <p className="text-[var(--color-text-muted)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
