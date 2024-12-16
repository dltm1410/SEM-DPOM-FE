import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const ProcessOrder = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setPendingOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError("Có lỗi xảy ra khi tải dữ liệu đơn hàng");
      setLoading(false);
      console.error("Error fetching orders data:", err);
    }
  };

  const formatOrderId = (orderId) => {
    if (!orderId) return "";
    return orderId.substring(0, 10) + "...";
  };

  const handleAccept = async (orderId) => {
    try {
      await axiosInstance.post("/orders/accept", { orderId });
      toast.success("Đã chấp nhận đơn hàng");
      fetchOrders(); // Refresh danh sách
    } catch (error) {
      toast.error("Không thể chấp nhận đơn hàng");
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await axiosInstance.post("/orders/reject", { orderId });
      toast.success("Đã từ chối đơn hàng");
      fetchOrders(); // Refresh danh sách
    } catch (error) {
      toast.error("Không thể từ chối đơn hàng");
      console.error("Error rejecting order:", error);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "gray";

    switch (status.toLowerCase()) {
      case "pending":
        return "yellow";
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Process Order
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Order ID
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Order Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Total Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3">
                      <span
                        className="cursor-help"
                        title={order?.orderId || ""}
                      >
                        #{formatOrderId(order?.orderId)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {order?.orderDate
                        ? new Date(order.orderDate).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {order?.total
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.total)
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {order?.status && (
                        <span
                          className={`bg-${getStatusColor(order.status)}-100 
                            text-${getStatusColor(order.status)}-800 
                            text-xs font-medium px-2.5 py-0.5 rounded 
                            dark:bg-${getStatusColor(order.status)}-900 
                            dark:text-${getStatusColor(order.status)}-300`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            order?.orderId && handleAccept(order.orderId)
                          }
                          disabled={!order?.orderId}
                          className="rounded-lg border border-green-700 px-4 py-1.5 text-center text-sm font-medium text-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            order?.orderId && handleReject(order.orderId)
                          }
                          disabled={!order?.orderId}
                          className="rounded-lg border border-red-700 px-4 py-1.5 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOrder;
