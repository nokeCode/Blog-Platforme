const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
      trim: true,
      maxlength: [150, 'Le titre ne peut pas dépasser 150 caractères'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      maxlength: [300, "L'extrait ne peut pas dépasser 300 caractères"],
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    imagePublicId: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Business', 'Design', 'Technology', 'UX', 'Development', 'Other'],
      default: 'Other',
    },
    tags: [{ type: String, trim: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: String,
      default: '',
    },
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title
postSchema.pre('save', async function (next) {
  if (this.isModified('title') || !this.slug) {
    const slugModule = require('slug');
    const base = slugModule(this.title, { lower: true });
    // Ensure uniqueness
    let candidate = base;
    let count = 0;
    while (await mongoose.model('Post').findOne({ slug: candidate, _id: { $ne: this._id } })) {
      count++;
      candidate = `${base}-${count}`;
    }
    this.slug = candidate;
  }

  // Auto-compute readTime
  if (this.isModified('content') && this.content) {
    const words = this.content.split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    this.readTime = `${minutes} min read`;
  }

  next();
});

// Virtual: populate author name for list views
postSchema.virtual('authorInfo', {
  ref: 'User',
  localField: 'author',
  foreignField: '_id',
  justOne: true,
});

postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);
