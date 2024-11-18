import React, { useState, useEffect } from "react";
import axios from "axios";

const ProcessOrder = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/orders/pending"
      );
      setPendingOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError("Có lỗi xảy ra khi tải dữ liệu đơn hàng");
      setLoading(false);
      console.error("Error fetching orders data:", err);
    }
  };

  const handleAccept = (order) => {
    // Xử lý logic khi accept đơn hàng
    console.log("Accept order:", order.oID);
  };

  const handleReject = (order) => {
    // Xử lý logic khi reject đơn hàng
    console.log("Reject order:", order.oID);
  };

  const handleViewDetail = (order) => {
    // Xử lý logic khi xem chi tiết đơn hàng
    console.log("View detail order:", order.oID);
  };
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="flex items-center flex-1 space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl pb-5">
              Process Order
            </h2>
          </div>
          <div className="relative overflow-hidden bg-white  dark:bg-gray-800 sm:rounded-lg">
            <div className="overflow-x-auto">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {pendingOrders.map((order, index) => (
                  <OrderItem
                    key={index}
                    orderId={order.oID}
                    date={order.createDate}
                    price={order.totalPrice}
                    status={order.status}
                    statusColor={getStatusColor(order.status)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderItem = ({ orderId, date, price, status, statusColor }) => (
  <div className="flex flex-wrap items-center gap-y-4 py-3">
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Order ID:
      </dt>
      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
        <a href="#" className="hover:underline">
          {orderId}
        </a>
      </dd>
    </dl>
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Order Date:
      </dt>
      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
        {date}
      </dd>
    </dl>
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Total Price:
      </dt>
      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
        {price}
      </dd>
    </dl>
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Status:
      </dt>
      <dd
        className={`me-2 mt-1.5 inline-flex items-center rounded bg-${statusColor}-100 px-2.5 py-0.5 text-xs font-medium text-${statusColor}-800 dark:bg-${statusColor}-900 dark:text-${statusColor}-300`}
      >
        <StatusIcon status={status} />
        {status}
      </dd>
    </dl>
    <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
      <td className="px-4 py-1.5">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleAccept(order)}
            className="rounded-lg border border-green-700 px-4 py-1.5 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900"
          >
            Accept
          </button>
          <button
            onClick={() => handleReject(order)}
            className="rounded-lg border border-red-700 px-4 py-1.5 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
          >
            Reject
          </button>
          <button
            onClick={() => handleViewDetail(order)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 whitespace-nowrap"
          >
            View Detail
          </button>
        </div>
      </td>
    </div>
  </div>
);

const StatusIcon = ({ status }) => {
  if (status === "pending") {
    return (
      <svg
        className="me-1 h-3 w-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
        />
      </svg>
    );
  }
  return null;
};

const getStatusColor = (status) => {
  if (status === "pending") {
    return "yellow";
  }
  return "gray";
};

export default ProcessOrder;
