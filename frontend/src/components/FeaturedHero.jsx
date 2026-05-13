import { Link } from 'react-router-dom';

export default function FeaturedHero({ post, otherPosts = [] }) {
  if (!post) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-12">
      {/* Main featured post */}
      <Link
        to={`/blog/${post._id}`}
        className="group relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3] lg:aspect-auto lg:min-h-[340px] block animate-fade-up stagger-1"
      >
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-70 transition-all duration-500"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {post.category && (
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full mb-3 border border-white/20">
              {post.category}
            </span>
          )}
          <h2 className="font-display text-white text-2xl md:text-3xl font-normal leading-tight">
            {post.title}
          </h2>
        </div>
      </Link>

      {/* Other featured posts sidebar */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 animate-fade-up stagger-2">
        <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Other featured posts</h3>
        <div className="space-y-1">
          {otherPosts.map((item, i) => (
            <Link
              key={item._id}
              to={`/blog/${item._id}`}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--color-bg)] transition-colors group"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <p className="text-xs font-medium text-[var(--color-text)] leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
