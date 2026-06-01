import React from 'react'
import { Link } from 'react-router-dom'
import PostCard from './PostCard'

function RecentPosts({ posts, layout = 'grid' }) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
        <Link
          to="/blog"
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          All Posts
        </Link>
      </div>

      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post, i) => (
            <PostCard key={post._id} post={post} index={i} layout="horizontal" />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecentPosts