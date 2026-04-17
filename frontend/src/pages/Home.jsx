import { useEffect, useState } from 'react'
import axios from 'axios'
import HeroPost from '../components/HeroPost'
import FeaturedPosts from '../components/FeaturePosts'
import RecentPosts from '../components/RecentPosts'

function Home() {
  const [heroPost, setHeroPost] = useState(null)
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const postsRes = await axios.get('http://localhost:5000/api/posts')
      const allPosts = postsRes.data

      const heroRes = await axios.get('http://localhost:5000/api/posts/hero/featured')
      setHeroPost(heroRes.data)

      const featuredRes = await axios.get('http://localhost:5000/api/posts/featured/list')
      setFeaturedPosts(featuredRes.data.filter(p => p._id !== heroRes.data?._id).slice(0, 5))

      setRecentPosts(allPosts.filter(p => p._id !== heroRes.data?._id).slice(0, 3))
      
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HeroPost post={heroPost} />
        </div>
        <div className="lg:col-span-1">
          <FeaturedPosts posts={featuredPosts} />
        </div>
      </div>
      <RecentPosts posts={recentPosts} />
    </div>
  )
}

export default Home