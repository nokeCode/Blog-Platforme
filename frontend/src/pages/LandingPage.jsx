import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Buttom';
import FeaturedHero from '../components/FeaturedHero';
import RecentPosts from '../components/RecentPosts';
import { getFeaturedPost, getOtherFeatured, getRecentPosts } from '../utils/api';

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

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {loading ? (
          <div className="min-h-[450px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <FeaturedHero post={featuredPost} otherPosts={otherFeatured} />
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
          <Link to="/blog">
            <Button variant="outline" size="sm" className="rounded-full px-6">
              All Posts
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="min-h-[260px] flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
          </div>
        ) : (
          <RecentPosts posts={recentPosts} />
        )}
      </section>
    </div>
  );
};