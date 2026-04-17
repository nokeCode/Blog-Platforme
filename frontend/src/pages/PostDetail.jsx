import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Edit, Trash2, Clock, User } from 'lucide-react'

function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
      setPost(res.data)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`)
        navigate('/')
      } catch (error) {
        console.error('Erreur:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post non trouvé</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          Retour
        </Link>
        <div className="flex gap-3">
          <Link to={`/edit/${id}`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Edit className="w-4 h-4" />
            Modifier
          </Link>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      </div>

      <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full mb-4">
        {post.category}
      </span>

      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

      <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {post.author.name}
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </div>
        <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
      </div>

      <div className="rounded-2xl overflow-hidden mb-8">
        <img src={post.image} alt={post.title} className="w-full aspect-[21/9] object-cover" />
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
        <div className="text-gray-800 whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  )
}

export default PostDetail