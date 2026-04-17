import React from 'react'
import { Link } from 'react-router-dom'

function FeaturedPosts({ posts }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Other featured posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="flex gap-4 group cursor-pointer"
          >
            <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedPosts