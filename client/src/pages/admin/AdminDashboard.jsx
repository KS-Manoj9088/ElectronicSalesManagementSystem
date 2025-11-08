import { useState, useEffect } from 'react';
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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-orange-600">
              ${stats.totalRevenue?.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Top Products */}
        {stats.topProducts && stats.topProducts.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Top Selling Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Product</th>
                    <th className="text-left p-2">Sold</th>
                    <th className="text-left p-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topProducts.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.totalSold}</td>
                      <td className="p-2">${product.revenue?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Orders */}
        {stats.recentOrders && stats.recentOrders.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.user?.name || order.user?.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${order.totalPrice?.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.orderStatus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Low Stock Products */}
        {stats.lowStockProducts && stats.lowStockProducts.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Low Stock Products</h2>
            <div className="space-y-2">
              {stats.lowStockProducts.map((product) => (
                <div key={product._id} className="flex justify-between items-center border-b pb-2">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-red-600 font-bold">Stock: {product.stock}</p>
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

