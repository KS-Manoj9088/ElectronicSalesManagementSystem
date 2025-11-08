import { useState, useEffect } from 'react';
import { wishlistAPI } from '../utils/api';
import { useAlert } from '../context/AlertContext';
import ProductCard from '../components/ProductCard';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/Loading';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await wishlistAPI.getWishlist();
      setWishlist(res.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await wishlistAPI.removeFromWishlist(productId);
      showAlert('Removed from wishlist', 'success');
      fetchWishlist();
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to remove from wishlist',
        'error'
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          {wishlist?.products && wishlist.products.length > 0 && (
            <button
              onClick={async () => {
                if (
                  window.confirm(
                    'Are you sure you want to clear your wishlist?'
                  )
                ) {
                  try {
                    await wishlistAPI.clearWishlist();
                    showAlert('Wishlist cleared', 'success');
                    fetchWishlist();
                  } catch (error) {
                    showAlert(
                      error.response?.data?.message ||
                        'Failed to clear wishlist',
                      'error'
                    );
                  }
                }
              }}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {!wishlist?.products || wishlist.products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
            <p className="text-gray-500">
              Add products to your wishlist to save them for later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.products.map((product) => (
              <div key={product._id} className="relative">
                <ProductCard product={product} />
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Remove from wishlist"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Wishlist;

