import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAlert } from '../context/AlertContext';
import Loading from '../components/Loading';

const Cart = () => {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to update cart',
        'error'
      );
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      showAlert('Item removed from cart', 'success');
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to remove item',
        'error'
      );
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await clearCart();
        showAlert('Cart cleared', 'success');
      } catch (error) {
        showAlert(
          error.response?.data?.message || 'Failed to clear cart',
          'error'
        );
      }
    }
  };

  if (loading) return <Loading />;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to your cart!</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800 font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md flex gap-4"
            >
              {item.product?.images && item.product.images.length > 0 ? (
                <img
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <div className="flex-1">
                <Link
                  to={`/products/${item.product?._id || item.product}`}
                  className="text-lg font-semibold hover:text-blue-600 transition-colors"
                >
                  {item.product?.name || 'Product'}
                </Link>
                <p className="text-gray-600 text-sm mb-2">
                  {item.product?.brand || 'Brand'}
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ${item.price?.toFixed(2)}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <label className="text-sm font-medium">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      disabled={item.quantity >= (item.product?.stock || 0)}
                      className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:text-red-800 ml-4"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Stock: {item.product?.stock || 0}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cart.itemsPrice?.toFixed(2) || cart.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Items:</span>
                <span>{cart.totalItems}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    ${cart.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center mt-4 text-blue-600 hover:text-blue-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

