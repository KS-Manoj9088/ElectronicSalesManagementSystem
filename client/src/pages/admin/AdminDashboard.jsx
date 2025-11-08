import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import { useAlert } from '../../context/AlertContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await adminAPI.getDashboardStats();
      setStats(res.data);
    } catch (error) {
      showAlert(
        error.response?.data?.message || 'Failed to fetch dashboard stats',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!stats) return null;

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 gradient-text">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store, products, orders, and users</p>
        </div>

        {/* Admin Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link
            to="/admin/products"
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-gray-100 text-center"
          >
            <div className="text-3xl mb-2">📦</div>
            <div className="font-semibold text-gray-800">Products</div>
            <div className="text-sm text-gray-500">Manage inventory</div>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-gray-100 text-center"
          >
            <div className="text-3xl mb-2">📋</div>
            <div className="font-semibold text-gray-800">Orders</div>
            <div className="text-sm text-gray-500">Track orders</div>
          </Link>
          <Link
            to="/admin/users"
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-gray-100 text-center"
          >
            <div className="text-3xl mb-2">👥</div>
            <div className="font-semibold text-gray-800">Users</div>
            <div className="text-sm text-gray-500">Manage users</div>
          </Link>
          <Link
            to="/admin/dashboard"
            className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 text-white text-center"
          >
            <div className="text-3xl mb-2">📊</div>
            <div className="font-semibold">Dashboard</div>
            <div className="text-sm opacity-90">View stats</div>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-700 text-sm font-semibold">Total Users</h3>
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-4xl font-extrabold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-700 text-sm font-semibold">Total Products</h3>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-4xl font-extrabold text-green-600">{stats.totalProducts}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg border border-purple-200 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-700 text-sm font-semibold">Total Orders</h3>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-4xl font-extrabold text-purple-600">{stats.totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg border border-orange-200 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-700 text-sm font-semibold">Total Revenue</h3>
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-4xl font-extrabold text-orange-600">
              ${stats.totalRevenue?.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Top Products */}
        {stats.topProducts && stats.topProducts.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Top Selling Products</h2>
              <Link
                to="/admin/products"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                Manage All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Sold</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topProducts.map((product, index) => (
                    <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-gray-400 w-8">{index + 1}</span>
                          <div>
                            <p className="font-semibold text-gray-800">{product.name}</p>
                            {product.image && (
                              <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded mt-2" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                          {product.totalSold}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-lg font-bold text-green-600">
                          ${product.revenue?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        {stats.recentOrders && stats.recentOrders.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-blue-300"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-gray-800">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {order.user?.name || order.user?.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-blue-600">
                        ${order.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Stock Products */}
        {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl shadow-lg border-2 border-red-200">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">Low Stock Alert</h2>
            </div>
            <div className="space-y-3">
              {stats.lowStockProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg border border-red-200 flex justify-between items-center hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    )}
                    <p className="font-semibold text-gray-800">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-bold text-lg">Stock: {product.stock}</p>
                    <Link
                      to="/admin/products"
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Restock →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;

