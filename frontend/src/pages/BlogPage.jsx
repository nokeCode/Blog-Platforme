import { useEffect, useState } from 'react';
import { getPosts } from '../utils/api';
import PostCard from '../components/PostCard';

export const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const data = await getPosts();
      setPosts(data || []);
      setLoading(false);
    };

    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">Explore the latest published posts from the blog.</p>
        </div>

        {loading ? (
          <div className="min-h-[240px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center text-gray-600">
            Aucun article trouvé pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <PostCard key={post._id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
