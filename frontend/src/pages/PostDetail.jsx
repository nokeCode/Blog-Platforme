import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Buttom';

const mockPost = {
  id: 1,
  title: 'Unlocking Business Efficiency with SaaS Solutions',
  category: 'Business',
  image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=600&fit=crop',
  content: `
    <p>In today's rapidly evolving digital landscape, businesses are constantly seeking ways to streamline operations and maximize productivity. Software as a Service (SaaS) solutions have emerged as a game-changing approach to achieving these goals.</p>
    
    <h3>The Rise of SaaS</h3>
    <p>The SaaS model has transformed how organizations access and utilize software. Instead of purchasing and maintaining expensive on-premise infrastructure, companies can now leverage cloud-based solutions that offer scalability, flexibility, and cost-effectiveness.</p>
    
    <h3>Key Benefits</h3>
    <ul>
      <li>Reduced upfront costs</li>
      <li>Automatic updates and maintenance</li>
      <li>Enhanced collaboration capabilities</li>
      <li>Improved data security</li>
    </ul>
    
    <p>By embracing SaaS solutions, businesses can focus on their core competencies while leaving the technical complexities to specialized providers.</p>
  `,
  author: 'Jennifer Taylor',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  date: 'May 15, 2026',
  readTime: '8 min read',
};

export const PostDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={mockPost.image}
          alt={mockPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4 border border-white/30">
            {mockPost.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            {mockPost.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Author Info */}
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-100">
          <img
            src={mockPost.authorAvatar}
            alt={mockPost.author}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">{mockPost.author}</p>
            <p className="text-sm text-gray-500">
              {mockPost.date} · {mockPost.readTime}
            </p>
          </div>
          <div className="ml-auto flex gap-3">
            <Link to={`/edit/${id}`}>
              <Button variant="outline" size="sm">Edit</Button>
            </Link>
            <Link to={`/delete/${id}`}>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                Delete
              </Button>
            </Link>
          </div>
        </div>

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600"
          dangerouslySetInnerHTML={{ __html: mockPost.content }}
        />
      </div>
    </div>
  );
};