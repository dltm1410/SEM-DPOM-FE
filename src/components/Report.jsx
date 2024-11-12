import React, { useState } from "react";

const Report = () => {
  // Mock data cho báo cáo
  const reportData = {
    totalOrders: 150,
    totalRevenue: 15000000,
    averageOrderValue: 100000,
    topProducts: [
      { name: "Product A", quantity: 50, revenue: 5000000 },
      { name: "Product B", quantity: 30, revenue: 3000000 },
      { name: "Product C", quantity: 25, revenue: 2500000 },
    ],
    recentOrders: [
      { id: "#123", date: "2024-03-15", total: 150000, status: "Completed" },
      { id: "#124", date: "2024-03-14", total: 200000, status: "Processing" },
      { id: "#125", date: "2024-03-13", total: 180000, status: "Completed" },
    ],
  };

  const handleExport = () => {
    // Xử lý logic export report
    console.log("Exporting report...");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Sales Report
        </h2>
        <button
          onClick={handleExport}
          className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Export
        </button>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Orders
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {reportData.totalOrders}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Total Revenue
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {reportData.totalRevenue.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Average Order Value
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {reportData.averageOrderValue.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Average Rating
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            4.7
          </p>
        </div>
      </div>

      {/* Top sản phẩm */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Products
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">
                  Product Name
                </th>
                <th scope="col" className="px-4 py-2">
                  Quantity Sold
                </th>
                <th scope="col" className="px-4 py-2">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.topProducts.map((product, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.quantity}</td>
                  <td className="px-4 py-2">
                    {product.revenue.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Orders
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">
                  Order ID
                </th>
                <th scope="col" className="px-4 py-2">
                  Date
                </th>
                <th scope="col" className="px-4 py-2">
                  Total
                </th>
                <th scope="col" className="px-4 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.recentOrders.map((order, index) => (
                <tr key={index} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">
                    {order.total.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
