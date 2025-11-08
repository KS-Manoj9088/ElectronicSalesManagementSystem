import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { wishlistAPI } from '../utils/api';
import Loading from '../components/Loading';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [inWishlist, setInWishlist] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchProduct();
    checkWishlist();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await productsAPI.getProduct(id);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      showAlert('Product not found', 'error');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await wishlistAPI.getWishlist();
      const wishlist = res.data;
      setInWishlist(
        wishlist.products?.some((p) => p._id === id || p.toString() === id)
      );
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showAlert('Please login to add items to cart', 'warning');
      navigate('/login');
      return;
    }
    try {
      await addToCart(product._id, quantity);
      showAlert('Product added to cart!', 'success');
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to add to cart',
        'error'
      );
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      showAlert('Please login to add to wishlist', 'warning');
      navigate('/login');
      return;
    }
    try {
      if (inWishlist) {
        await wishlistAPI.removeFromWishlist(id);
        setInWishlist(false);
        showAlert('Removed from wishlist', 'success');
      } else {
        await wishlistAPI.addToWishlist(id);
        setInWishlist(true);
        showAlert('Added to wishlist', 'success');
      }
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to update wishlist',
        'error'
      );
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showAlert('Please login to add reviews', 'warning');
      return;
    }
    try {
      await productsAPI.addReview(id, review);
      showAlert('Review added successfully!', 'success');
      setReview({ rating: 5, comment: '' });
      fetchProduct();
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to add review',
        'error'
      );
    }
  };

  if (loading) return <Loading />;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="mb-4">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`${product.name} ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    selectedImage === idx ? 'border-blue-600' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>
          
          <div className="flex items-center gap-4 mb-4">
            {product.rating > 0 && (
              <div className="flex items-center">
                <span className="text-yellow-500 text-xl">★</span>
                <span className="ml-1">
                  {product.rating?.toFixed(1)} ({product.numReviews} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="mb-6">
            {product.discount > 0 ? (
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  ${product.finalPrice?.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 line-through ml-2">
                  ${product.price?.toFixed(2)}
                </span>
                <span className="ml-2 text-red-600 font-semibold">
                  -{product.discount}% OFF
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-blue-600">
                ${product.price?.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Specifications */}
          {product.specifications && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <span className="font-semibold">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="mb-6">
            <p className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          {/* Quantity & Actions */}
          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-lg border ${
                    inWishlist
                      ? 'bg-red-100 border-red-500 text-red-600'
                      : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {inWishlist ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        
        {/* Add Review Form */}
        {isAuthenticated && (
          <form onSubmit={handleAddReview} className="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={review.rating}
                onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your review..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;

