export const MOCK_FEATURED_POST = {
  _id: '1',
  title: 'Unlocking Business Efficiency with SaaS Solutions',
  category: 'Business',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
  author: { name: 'Jennifer Taylor', avatar: 'https://i.pravatar.cc/32?img=47' },
  readTime: '4 min read',
  createdAt: new Date().toISOString(),
};

export const MOCK_OTHER_FEATURED = [
  {
    _id: '2',
    title: 'Revolutionizing industries through SaaS implementation',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200&q=80',
  },
  {
    _id: '3',
    title: 'Synergizing saas and UX design for elevating digital experiences',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=200&q=80',
  },
  {
    _id: '4',
    title: 'Navigating saas waters with intuitive UI and UX',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80',
  },
  {
    _id: '5',
    title: 'Sculpting saas success - the art of UI and UX design',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=200&q=80',
  },
  {
    _id: '6',
    title: 'Transforming saas platforms - a UI/UX design odyssey',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=200&q=80',
  },
];

export const MOCK_RECENT_POSTS = [
  {
    _id: '7',
    title: 'Mastering UI Elements: A Practical Guide for Designers',
    excerpt: 'Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    author: { name: 'Jennifer Taylor', avatar: 'https://i.pravatar.cc/32?img=47' },
    readTime: '3 min read',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '8',
    title: 'Crafting Seamless Experiences: The Art of Intuitive UI Design',
    excerpt: 'Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and in...',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
    author: { name: 'Jennifer Taylor', avatar: 'https://i.pravatar.cc/32?img=47' },
    readTime: '5 min read',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '9',
    title: 'Beyond Aesthetics: The Power of Emotional UX Design',
    excerpt: 'Delve into the realm of emotional design and discover how incorporating empathy and psychol...',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
    author: { name: 'Ryan A.', avatar: 'https://i.pravatar.cc/32?img=12' },
    readTime: '2 min read',
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_ALL_POSTS = [
  ...MOCK_RECENT_POSTS,
  {
    _id: '10',
    title: 'The Future of Remote Work: Tools and Strategies',
    excerpt: 'Discover the best tools and strategies to enhance your remote work experience.',
    image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&q=80',
    author: { name: 'Ryan A.', avatar: 'https://i.pravatar.cc/32?img=12' },
    readTime: '6 min read',
    category: 'Technology',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '11',
    title: 'Design Systems: Building Consistency at Scale',
    excerpt: 'Learn how to build and maintain design systems that scale with your product.',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=600&q=80',
    author: { name: 'Jennifer Taylor', avatar: 'https://i.pravatar.cc/32?img=47' },
    readTime: '7 min read',
    category: 'Design',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '12',
    title: 'Accessibility in Modern Web Design',
    excerpt: 'Building web experiences that work for everyone, regardless of ability.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    author: { name: 'Ryan A.', avatar: 'https://i.pravatar.cc/32?img=12' },
    readTime: '4 min read',
    category: 'Design',
    createdAt: new Date().toISOString(),
  },
];
