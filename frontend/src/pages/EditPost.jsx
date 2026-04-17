import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '', category: 'Business', content: '', excerpt: '', image: '',
    author: { name: '', avatar: '' }, readTime: '', featured: false
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const categories = ['Business', 'Design', 'Technology', 'Lifestyle']

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => { setFormData(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, formData)
      navigate(`/post/${id}`)
    } catch (error) {
      alert('Erreur lors de la mise à jour')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'authorName') {
      setFormData(prev => ({ ...prev, author: { ...prev.author, name: value } }))
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }
  }

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin h-12 w-12 border-b-2 border-gray-900"></div></div>

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
          <select name="category" value={formData.category} onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none">
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">URL de l'image</label>
          <input type="url" name="image" value={formData.image} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Extrait</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
          <input type="text" name="authorName" value={formData.author?.name || ''} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temps de lecture</label>
          <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mettre en vedette</label>
        </div>
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => navigate(`/post/${id}`)}
            className="flex-1 px-6 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
          <button type="submit" disabled={submitting}
            className="flex-1 px-6 py-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50">
            {submitting ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPost