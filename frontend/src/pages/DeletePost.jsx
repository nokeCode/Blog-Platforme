import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Buttom';
import { deletePost } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export const DeletePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth, loading } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !isAuth) {
      navigate('/login');
    }
  }, [isAuth, loading, navigate]);

  const handleDelete = async () => {
    setDeleting(true);
    setError('');
    try {
      await deletePost(id);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer le post.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Delete Post</h1>
        <p className="text-gray-600 mb-8">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            variant="secondary"
            className="w-full justify-center py-3"
            onClick={() => navigate('/dashboard')}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            className="w-full justify-center py-3 bg-red-600 hover:bg-red-700 shadow-red-500/30"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Suppression…' : 'Supprimer'}
          </Button>
        </div>
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};