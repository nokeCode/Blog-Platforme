require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');

const seedData = async () => {
  await connectDB();

  console.log('🌱 Nettoyage de la base de données...');
  await User.deleteMany({});
  await Post.deleteMany({});

  // ─── Create authors ───────────────────────────────────────
  console.log('👤 Création des utilisateurs...');
  const jennifer = await User.create({
    name: 'Jennifer Taylor',
    email: 'jennifer@beyondui.com',
    password: 'password123',
    role: 'author',
    avatar: 'https://i.pravatar.cc/64?img=47',
    bio: 'UI/UX Designer & Writer passionnée par les produits digitaux.',
  });

  const ryan = await User.create({
    name: 'Ryan Anderson',
    email: 'ryan@beyondui.com',
    password: 'password123',
    role: 'author',
    avatar: 'https://i.pravatar.cc/64?img=12',
    bio: 'Développeur front-end & blogeur tech.',
  });

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@beyondui.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/64?img=1',
  });

  // ─── Create posts ─────────────────────────────────────────
  console.log('📝 Création des articles...');

  const posts = [
    {
      title: 'Unlocking Business Efficiency with SaaS Solutions',
      excerpt: 'Discover how modern SaaS platforms are transforming the way businesses operate and scale.',
      content: `<p>In today's fast-paced digital landscape, businesses are constantly seeking ways to optimize their operations and reduce overhead. SaaS solutions have emerged as a powerful answer to this challenge, offering scalable, cost-effective alternatives to traditional software.</p><p>From project management to customer relationship management, the SaaS ecosystem has expanded to cover virtually every business need. Companies that adopt these solutions early gain a significant competitive advantage, being able to pivot quickly and scale their operations without massive upfront investments.</p><h2>Key Benefits of SaaS Adoption</h2><p>The primary advantage of SaaS is its accessibility. Teams can collaborate from anywhere in the world, accessing the same tools and data in real-time. This has become particularly valuable in the era of remote and hybrid work.</p><p>Cost predictability is another major draw. Rather than large capital expenditures, businesses pay predictable monthly or annual fees. This makes budgeting significantly easier and reduces financial risk.</p>`,
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      isFeatured: true,
      author: jennifer._id,
    },
    {
      title: 'Revolutionizing Industries Through SaaS Implementation',
      excerpt: 'How vertical SaaS is disrupting traditional industries from healthcare to finance.',
      content: '<p>Vertical SaaS solutions are tailored to specific industries, offering deep functionality that horizontal platforms simply cannot match...</p>',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
      isFeatured: true,
      author: jennifer._id,
    },
    {
      title: 'Synergizing SaaS and UX Design for Elevating Digital Experiences',
      excerpt: 'When great UX meets powerful SaaS, magic happens for end users.',
      content: '<p>The intersection of SaaS and UX design is where truly exceptional products are born...</p>',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=1200&q=80',
      isFeatured: true,
      author: ryan._id,
    },
    {
      title: 'Navigating SaaS Waters with Intuitive UI and UX',
      excerpt: 'User experience design principles that make SaaS products irresistible.',
      content: '<p>Building a SaaS product that users actually want to use requires deep investment in UX...</p>',
      category: 'UX',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      isFeatured: true,
      author: jennifer._id,
    },
    {
      title: 'Sculpting SaaS Success — The Art of UI and UX Design',
      excerpt: 'Design decisions that separate winning SaaS products from the rest.',
      content: '<p>Every pixel, every interaction, every micro-animation — in SaaS, design details are the product...</p>',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
      isFeatured: true,
      author: ryan._id,
    },
    {
      title: 'Transforming SaaS Platforms — A UI/UX Design Odyssey',
      excerpt: 'A deep dive into the redesign journey of a complex SaaS dashboard.',
      content: '<p>When we set out to redesign our flagship SaaS platform, we had no idea the journey would take us through three major pivots...</p>',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80',
      isFeatured: true,
      author: jennifer._id,
    },
    {
      title: 'Mastering UI Elements: A Practical Guide for Designers',
      excerpt: 'Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.',
      content: '<p>User interface design is both an art and a science. The best interfaces feel invisible — users accomplish their goals without thinking about the tool itself...</p>',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
      author: jennifer._id,
    },
    {
      title: 'Crafting Seamless Experiences: The Art of Intuitive UI Design',
      excerpt: 'Explore the principles and techniques that drive user-centric UI design, ensuring a seamless and intuitive experience.',
      content: '<p>Intuitive design is not about following conventions blindly — it is about understanding your users deeply enough to anticipate their needs...</p>',
      category: 'UX',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
      author: jennifer._id,
    },
    {
      title: 'Beyond Aesthetics: The Power of Emotional UX Design',
      excerpt: 'Delve into the realm of emotional design and discover how incorporating empathy and psychology elevates products.',
      content: '<p>Don Norman first introduced the concept of emotional design in his seminal book. Since then, the field has exploded with research showing that emotions drive decisions more than logic...</p>',
      category: 'UX',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
      author: ryan._id,
    },
    {
      title: 'The Future of Remote Work: Tools and Strategies for 2025',
      excerpt: 'How distributed teams are leveraging async-first tools to outperform co-located competitors.',
      content: '<p>Remote work has moved from a pandemic-driven necessity to a strategic competitive advantage for companies willing to invest in the right infrastructure...</p>',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1200&q=80',
      author: ryan._id,
    },
    {
      title: 'Design Systems: Building Consistency at Scale',
      excerpt: 'How to build and maintain design systems that scale with your product and team.',
      content: '<p>A design system is more than a component library — it is a shared language between designers and developers that enables teams to build faster and more consistently...</p>',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80',
      author: jennifer._id,
    },
    {
      title: 'Accessibility in Modern Web Design: Building for Everyone',
      excerpt: 'Building web experiences that work for everyone, regardless of ability or device.',
      content: '<p>Accessibility is not a feature — it is a fundamental aspect of quality software. Yet too many teams treat it as an afterthought...</p>',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
      author: ryan._id,
    },
  ];

  for (const postData of posts) {
    await Post.create(postData);
  }

  console.log(`✅ ${posts.length} articles créés avec succès`);
  console.log('\n📋 Comptes de test :');
  console.log('  Author 1 → jennifer@beyondui.com / password123');
  console.log('  Author 2 → ryan@beyondui.com / password123');
  console.log('  Admin    → admin@beyondui.com / admin123');

  mongoose.disconnect();
  process.exit(0);
};

seedData().catch((err) => {
  console.error('❌ Erreur lors du seed :', err);
  process.exit(1);
});
