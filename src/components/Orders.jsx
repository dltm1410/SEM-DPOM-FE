import React, { useState } from "react";
import orders from "../data/order.json"; // Assuming your order data is in this path

const Orders = () => {
  const [orderType, setOrderType] = useState("All orders");
  const [duration, setDuration] = useState("all time");

  const filteredOrders = orders.filter((order) => {
    // Filter based on selected order type
    const typeMatch = orderType === "All orders" || order.status === orderType;

    // Parse the order creation date
    const orderDate = new Date(order.createDate);
    const currentDate = new Date();
    let dateMatch = false;

    // Apply duration filtering logic
    switch (duration) {
      case "this week":
        const startOfWeek = new Date(
          currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        );
        dateMatch = orderDate >= startOfWeek && orderDate <= new Date();
        break;
      case "this month":
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        dateMatch = orderDate >= startOfMonth && orderDate <= new Date();
        break;
      case "last 3 months":
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        dateMatch = orderDate >= threeMonthsAgo && orderDate <= new Date();
        break;
      case "last 6 months":
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        dateMatch = orderDate >= sixMonthsAgo && orderDate <= new Date();
        break;
      case "this year":
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        dateMatch = orderDate >= startOfYear && orderDate <= new Date();
        break;
      default:
        dateMatch = true;
    }

    return typeMatch && dateMatch;
  });

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>

            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="order-type"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select order type
                </label>
                <select
                  id="order-type"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  <option value="All orders">All orders</option>
                  <option value="pre-order">Pre-order</option>
                  <option value="transit">In transit</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <span className="inline-block text-gray-500 dark:text-gray-400">
                from
              </span>

              <div>
                <label
                  htmlFor="duration"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select duration
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  <option value="this week">this week</option>
                  <option value="this month">this month</option>
                  <option value="last 3 months">the last 3 months</option>
                  <option value="last 6 months">the last 6 months</option>
                  <option value="this year">this year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order, index) => (
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

          <nav
            className="mt-6 flex items-center justify-center sm:mt-8"
            aria-label="Page navigation example"
          >
            <ul className="flex h-8 items-center -space-x-px text-sm">
              {/* Pagination code can go here if needed */}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

const OrderItem = ({ orderId, date, price, status, statusColor }) => (
  <div className="flex flex-wrap items-center gap-y-4 py-6">
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
        Date:
      </dt>
      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
        {date}
      </dd>
    </dl>
    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
        Price:
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
      <button
        type="button"
        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
      >
        Cancel order
      </button>
      <a
        href="#"
        className="w-full inline-flex justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
      >
        View details
      </a>
    </div>
  </div>
);

const StatusIcon = ({ status }) => {
  let icon;

  switch (status) {
    case "Delivered":
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
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
      );
    case "Cancelled":
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
            d="M6 18 17.94 6M18 18 6.06 6"
          />
        </svg>
      );
    case "In-transit":
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
            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
          />
        </svg>
      );
    case "Pending":
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
    default:
      icon = "help";
  }
};
const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "green";
    case "Cancelled":
      return "red";
    case "In-transit":
      return "blue";
    case "Pending":
      return "yellow";
    default:
      return "gray";
  }
};

export default Orders;
