import React from 'react'
import { Link } from 'react-router-dom'

function HeroPost({ post }) {
  if (!post) return null

  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
      <Link to={`/post/${post._id}`}>
        <div className="aspect-[16/9] relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl">
              {post.title}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HeroPost