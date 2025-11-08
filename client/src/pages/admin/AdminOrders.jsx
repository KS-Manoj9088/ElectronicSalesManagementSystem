import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../../utils/api';
import { useAlert } from '../../context/AlertContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    page: 1,
  });
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getAllOrders(filters);
      setOrders(res.data.orders || res.data);
      if (res.data.pages) {
        setPagination({
          page: res.data.page,
          pages: res.data.pages,
          total: res.data.total,
        });
      }
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to fetch orders',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status, trackingNumber = '') => {
    try {
      await ordersAPI.updateOrderStatus(orderId, { status, trackingNumber });
      showAlert('Order status updated successfully!', 'success');
      fetchOrders();
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to update order status',
        'error'
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/admin/dashboard" className="text-gray-600 hover:text-blue-600 font-semibold">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 gradient-text">Manage Orders</h1>
          <p className="text-gray-600">View and update order status</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Orders</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 text-lg">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {order.user?.name || order.user?.email}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
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
                      <div key={idx} className="flex items-center gap-4 text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600">
                          Qty: {item.quantity} × ${item.price?.toFixed(2)}
                        </span>
                        <span className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address:</h3>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress?.addressLine1}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                        {order.shippingAddress?.pincode}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {order.orderStatus === 'Processing' && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusUpdate(order._id, 'Shipped', '')
                            }
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Mark as Shipped
                          </button>
                        </>
                      )}
                      {order.orderStatus === 'Shipped' && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600 mt-2">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            {[...Array(pagination.pages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setFilters({ ...filters, page: i + 1 })}
                className={`px-4 py-2 border rounded-md ${
                  pagination.page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminOrders;

