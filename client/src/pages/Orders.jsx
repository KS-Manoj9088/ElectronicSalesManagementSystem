import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../utils/api';
import { useAlert } from '../context/AlertContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/Loading';
import { getImageUrl } from '../utils/imageUtils';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getMyOrders();
      setOrders(res.data);
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to fetch orders',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }
    try {
      await ordersAPI.cancelOrder(orderId);
      showAlert('Order cancelled successfully', 'success');
      fetchOrders();
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to cancel order',
        'error'
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No orders yet</p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.orderStatus === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : order.orderStatus === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                    <p className="text-lg font-bold mt-2">
                      ${order.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold mb-2">Order Items:</h3>
                  <div className="space-y-2">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        {item.image && (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                            key={item.image}
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
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

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address:</h3>
                      <p className="text-gray-600">
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="text-gray-600">
                        {order.shippingAddress?.addressLine1}
                      </p>
                      {order.shippingAddress?.addressLine2 && (
                        <p className="text-gray-600">
                          {order.shippingAddress.addressLine2}
                        </p>
                      )}
                      <p className="text-gray-600">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                        {order.shippingAddress?.pincode}
                      </p>
                      <p className="text-gray-600">
                        Phone: {order.shippingAddress?.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Order Summary:</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Items:</span>
                          <span>${order.itemsPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${order.taxPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>${order.shippingPrice?.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t pt-1">
                          <span>Total:</span>
                          <span>${order.totalPrice?.toFixed(2)}</span>
                        </div>
                      </div>
                      {order.trackingNumber && (
                        <p className="mt-2 text-sm text-gray-600">
                          Tracking: {order.trackingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  {order.orderStatus === 'Processing' && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  <Link
                    to={`/orders/${order._id}`}
                    className="ml-4 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Orders;

