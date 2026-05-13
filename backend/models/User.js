const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est requis'],
      trim: true,
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'author', 'admin'],
      default: 'author',
    },
    bio: {
      type: String,
      maxlength: [300, 'La bio ne peut pas dépasser 300 caractères'],
      default: '',
    },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Return safe user object
userSchema.methods.toSafeObject = function () {
  const { password, __v, ...rest } = this.toObject();
  return rest;
};

module.exports = mongoose.model('User', userSchema);
