import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { ordersAPI, authAPI } from '../utils/api';
import Loading from '../components/Loading';
import ProtectedRoute from '../components/ProtectedRoute';

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const { user } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    taxPrice: 0,
    shippingPrice: 0,
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await authAPI.getProfile();
      setAddresses(res.data.addresses || []);
      const defaultAddress = res.data.addresses?.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.addAddress(newAddress);
      showAlert('Address added successfully!', 'success');
      setShowNewAddress(false);
      fetchAddresses();
      setNewAddress({
        fullName: user?.name || '',
        phone: user?.phone || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false,
      });
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to add address',
        'error'
      );
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress && !showNewAddress) {
      showAlert('Please select or add a shipping address', 'warning');
      return;
    }

    const shippingAddress = selectedAddress || newAddress;
    if (!shippingAddress.addressLine1 || !shippingAddress.city) {
      showAlert('Please complete the address form', 'warning');
      return;
    }

    setLoading(true);
    try {
      const res = await ordersAPI.createOrder({
        shippingAddress,
        taxPrice: orderData.taxPrice,
        shippingPrice: orderData.shippingPrice,
      });
      showAlert('Order placed successfully!', 'success');
      await fetchCart();
      navigate(`/orders/${res.data._id}`);
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to place order',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={() => navigate('/products')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Address */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

              {/* Existing Addresses */}
              {addresses.length > 0 && (
                <div className="mb-4 space-y-2">
                  {addresses.map((address) => (
                    <label
                      key={address._id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer ${
                        selectedAddress?._id === address._id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={selectedAddress?._id === address._id}
                        onChange={() => {
                          setSelectedAddress(address);
                          setShowNewAddress(false);
                        }}
                        className="mr-2"
                      />
                      <div>
                        <p className="font-semibold">{address.fullName}</p>
                        <p className="text-gray-600">{address.addressLine1}</p>
                        {address.addressLine2 && (
                          <p className="text-gray-600">{address.addressLine2}</p>
                        )}
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p className="text-gray-600">Phone: {address.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Add New Address Button */}
              <button
                onClick={() => {
                  setShowNewAddress(!showNewAddress);
                  setSelectedAddress(null);
                }}
                className="w-full border-2 border-dashed border-gray-300 p-4 rounded-lg hover:border-blue-600 transition-colors text-gray-600"
              >
                {showNewAddress ? 'Cancel' : '+ Add New Address'}
              </button>

              {/* New Address Form */}
              {showNewAddress && (
                <form onSubmit={handleAddressSubmit} className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.fullName}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, fullName: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={newAddress.phone}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.addressLine1}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, addressLine1: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={newAddress.addressLine2}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, addressLine2: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, state: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddress.pincode}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, pincode: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, isDefault: e.target.checked })
                      }
                      className="mr-2"
                    />
                    <label htmlFor="isDefault" className="text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Address
                  </button>
                </form>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    {item.product?.images && item.product.images.length > 0 ? (
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded"></div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold">{item.product?.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × ${item.price?.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>${cart.itemsPrice?.toFixed(2) || cart.totalPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={orderData.taxPrice}
                    onChange={(e) =>
                      setOrderData({ ...orderData, taxPrice: parseFloat(e.target.value) || 0 })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                  />
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={orderData.shippingPrice}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        shippingPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-right"
                  />
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">
                      $
                      {(
                        (cart.itemsPrice || cart.totalPrice) +
                        orderData.taxPrice +
                        orderData.shippingPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading || (!selectedAddress && !showNewAddress)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;

