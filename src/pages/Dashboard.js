import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Users, Package, DollarSign, Star, Award, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const { employees, products, employeesLoading, productsLoading, fetchEmployees, fetchProducts } = useApp();

  const handleRefresh = async () => {
    await Promise.all([fetchEmployees(), fetchProducts()]);
  };

  const isLoading = employeesLoading || productsLoading;

  if (isLoading && employees.length === 0 && products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalEmployees = employees.length;
  const totalProducts = products.length;
  const totalIncentives = products.reduce((sum, p) => sum + (p.incentive || 0), 0);

  // Use only products that have a valid numeric rating > 0
  const ratedValues = products
    .map(p => {
      const value = Number(p.rating);
      return Number.isFinite(value) ? value : null;
    })
    .filter(value => value !== null && value > 0);

  const averageRating = ratedValues.length
    ? (ratedValues.reduce((sum, value) => sum + value, 0) / ratedValues.length).toFixed(1)
    : '0.0';

  // Category distribution
  const categoryData = products.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: product.category, value: 1 });
    }
    return acc;
  }, []);

  // Company distribution
  const companyData = products.reduce((acc, product) => {
    const company = product.company || product.companyName || 'Unknown';
    const stock = product.stock || 1; // Default to 1 if no stock data
    const existing = acc.find(item => item.name === company);
    if (existing) {
      existing.value += stock;
    } else {
      acc.push({ name: company, value: stock });
    }
    return acc;
  }, []).filter(item => item.value > 0).slice(0, 6);

  // Price range data
  const priceRangeData = [
    { range: '0-20k', count: products.filter(p => p.price && p.price < 20000).length },
    { range: '20k-40k', count: products.filter(p => p.price && p.price >= 20000 && p.price < 40000).length },
    { range: '40k-60k', count: products.filter(p => p.price && p.price >= 40000 && p.price < 60000).length },
    { range: '60k+', count: products.filter(p => p.price && p.price >= 60000).length },
  ].filter(item => item.count > 0);

  const COLORS = ['#FF6600', '#FF8533', '#FFA366', '#FFC299', '#FFE0CC'];

  const stats = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'from-primary to-primary-600',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      textColor: 'text-primary dark:text-primary-400',
    },
    {
      title: 'Top Rated (Avg)',
      value: averageRating,
      icon: Star,
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      textColor: 'text-yellow-500 dark:text-yellow-400',
    },
    {
      title: 'Total Incentives',
      value: `₹${totalIncentives.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  const topProducts = products
    .filter(p => p.rating || p.price) // Show products with rating or price data
    .sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.price || 0) - (a.price || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl px-5 py-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Welcome back! Here's what's happening with your products today.
          </p>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRefresh}
          disabled={isLoading}
          className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
        </motion.button>
      </div>

      {isLoading && (employees.length > 0 || products.length > 0) && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-40">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">Processing...</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Products by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Price Range Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Price Range Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priceRangeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="range" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="count" fill="#FF6600" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Stock by Company */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Stock Inventory by Company
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companyData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis type="number" stroke="#6B7280" />
            <YAxis dataKey="name" type="category" stroke="#6B7280" width={80} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '12px',
                color: '#fff'
              }}
            />
            <Bar dataKey="value" fill="#FF6600" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Rated Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Rated Products
          </h3>
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
        <div className="space-y-3">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.company} • {product.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {product.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
