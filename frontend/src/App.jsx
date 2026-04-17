import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'

function App() {
  return (
    <div className="min-h-screen bg-[#6b7280] flex justify-center items-start py-8 px-4">
      <div className="w-full max-w-[1200px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <Navbar />
        <main className="px-8 pb-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App