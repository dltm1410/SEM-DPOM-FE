import React, { useState } from "react";
import orderProducts from "../data/orderproduct.json";
const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
const OrderProduct = () => {
  const handleCancel = (orderId) => {
    console.log("Cancel order:", orderId);
  };

  const handleViewDetail = (order) => {
    console.log("View detail:", order);
  };

  return (
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Track Orders
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-base font-medium text-gray-500 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-4 font-medium">
                  Order ID
                </th>
                <th scope="col" className="px-4 py-4 font-medium">
                  Order Date
                </th>
                <th scope="col" className="px-4 py-4 font-medium">
                  Total
                </th>
                <th scope="col" className="px-4 py-4 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-4 font-medium">
                  Status
                </th>
                <th scope="col" className="px-4 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((order) => (
                <tr
                  key={order.orderproductID}
                  className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #{order.orderproductID}
                  </td>
                  <td className="px-4 py-3">
                    {new Date().toLocaleDateString()}{" "}
                    {/* Thay bằng order.orderDate khi có data */}
                  </td>
                  <td className="px-4 py-3">{formatVND(order.total)}</td>
                  <td className="px-4 py-3">{order.quantity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full 
                      ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : order.status === "in-transit"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleCancel(order.orderproductID)}
                      disabled={order.status === "delivered"}
                      className={`px-3 py-1 rounded-lg border text-xs font-medium
                        ${
                          order.status === "delivered"
                            ? "border-gray-300 text-gray-300 cursor-not-allowed"
                            : "border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
                        }`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleViewDetail(order)}
                      className="px-3 py-1 rounded-lg border border-gray-200 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700"
                    >
                      View Detail
                    </button>
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

export default OrderProduct;
