import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showAlert('Please login to add items to cart', 'warning');
      return;
    }
    try {
      await addToCart(product._id, 1);
      showAlert('Product added to cart!', 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Failed to add to cart', 'error');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
      <Link to={`/products/${product._id}`}>
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {product.discount > 0 && (
            <span className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              -{product.discount}% OFF
            </span>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ Featured
            </span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 font-medium">{product.brand}</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            {product.discount > 0 ? (
              <div>
                <span className="text-2xl font-bold text-blue-600">
                  ${product.finalPrice?.toFixed(2) || product.price?.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  ${product.price?.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                ${product.price?.toFixed(2)}
              </span>
            )}
          </div>
          {product.rating > 0 && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-sm text-gray-700 ml-1 font-semibold">
                {product.rating?.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 ml-1">
                ({product.numReviews})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
          }`}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Out of Stock
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

