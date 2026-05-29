import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Buttom';

const featuredPost = {
  id: 1,
  image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=500&fit=crop',
  category: 'Business',
  title: 'Unlocking Business Efficiency with SaaS Solutions',
};

const sidebarPosts = [
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop',
    title: 'Revolutionizing industries through SaaS implementation',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=150&fit=crop',
    title: 'Synergizing saas and UX design for elevating digital experiences',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop',
    title: 'Navigating saas waters with intuitive UI and UX',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=150&fit=crop',
    title: 'Sculpting saas success - the art of UI and UX design',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=150&fit=crop',
    title: 'Transforming saas platforms - a UI/UX design odyssey',
  },
];

const recentPosts = [
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=250&fit=crop',
    title: 'Mastering UI Elements: A Practical Guide for Designers',
    excerpt: 'Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.',
    author: 'Jennifer Taylor',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    readTime: '3 min read',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
    title: 'Crafting Seamless Experiences: The Art of Intuitive UI Design',
    excerpt: 'Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience.',
    author: 'Jennifer Taylor',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face',
    readTime: '5 min read',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=250&fit=crop',
    title: 'Beyond Aesthetics: The Power of Emotional UX Design',
    excerpt: 'Delve into the realm of emotional design and discover how incorporating empathy and psychology creates meaningful connections.',
    author: 'Ryan A.',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    readTime: '2 min read',
  },
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post - Large */}
          <div className="lg:col-span-2">
            <Link to={`/post/${featuredPost.id}`} className="group block relative rounded-2xl overflow-hidden aspect-[16/10]">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-4 border border-white/30">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-blue-200 transition-colors">
                  {featuredPost.title}
                </h2>
              </div>
            </Link>
          </div>

          {/* Sidebar - Other Featured Posts */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Other featured posts</h3>
            <div className="space-y-4">
              {sidebarPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="group flex gap-4 items-start p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
          <Link to="/articles">
            <Button variant="outline" size="sm" className="rounded-full px-6">
              All Posts
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <article key={post.id} className="group">
              <Link to={`/post/${post.id}`} className="block">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};