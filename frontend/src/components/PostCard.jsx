import React from 'react'
import { Link } from 'react-router-dom'

function PostCard({ post }) {
  return (
    <Link to={`/post/${post._id}`} className="group block">
      <div className="rounded-2xl overflow-hidden mb-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {post.excerpt}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
        <span className="text-gray-400">•</span>
        <span className="text-sm text-gray-500">{post.readTime}</span>
      </div>
    </Link>
  )
}

export default PostCard