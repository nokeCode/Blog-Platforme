import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { BlogPage } from './pages/BlogPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { CreatePost } from './pages/CreatePost';
import { EditPost } from './pages/EditPost';
import { DeletePost } from './pages/DeletePost';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/delete/:id" element={<DeletePost />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;