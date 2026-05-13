import { Link } from 'react-router-dom';

export default function PostCard({ post, index = 0 }) {
  const delays = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5'];
  const delay = delays[index % delays.length];

  return (
    <Link
      to={`/blog/${post._id}`}
      className={`group block bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] hover:shadow-md transition-all duration-300 animate-fade-up ${delay}`}
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden bg-[var(--color-bg)]">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {post.category && (
          <span className="inline-block text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2.5 py-1 rounded-full mb-3">
            {post.category}
          </span>
        )}
        <h3 className="text-[15px] font-semibold leading-snug text-[var(--color-text)] group-hover:text-gray-600 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Author */}
        <div className="flex items-center gap-2">
          {post.author?.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-600">
              {post.author?.name?.[0] || 'A'}
            </div>
          )}
          <span className="text-xs text-[var(--color-text-muted)]">{post.author?.name}</span>
          {post.readTime && (
            <>
              <span className="text-[var(--color-border)]">·</span>
              <span className="text-xs text-[var(--color-text-muted)]">{post.readTime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
