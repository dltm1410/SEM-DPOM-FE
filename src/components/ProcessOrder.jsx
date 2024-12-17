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
      console.log(response.data.orders);
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
      await axiosInstance.put(`/orders/status`, {
        orderId: orderId,
        status: "In-transit",
      });
      toast.success("Đã chấp nhận đơn hàng");
      fetchOrders(); // Refresh danh sách
    } catch (error) {
      toast.error("Không thể chấp nhận đơn hàng");
      console.error("Error accepting order:", error);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await axiosInstance.put(`/orders/status`, {
        orderId: orderId,
        status: "Rejected",
      });
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
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Process Orders
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
                  Status
                </th>
                <th scope="col" className="px-4 py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className="cursor-help" title={order?.orderId || ""}>
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
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full 
                          ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : order.status === "accepted"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleAccept(order.orderId)}
                      disabled={
                        order.status === "Accepted" ||
                        order.status === "Rejected"
                      }
                      className={`px-3 py-1 rounded-lg border text-xs font-medium
                        ${
                          order.status === "Accepted" ||
                          order.status === "Rejected"
                            ? "border-gray-300 text-gray-300 cursor-not-allowed"
                            : "border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                        }`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(order.orderId)}
                      disabled={
                        order.status === "Accepted" ||
                        order.status === "Rejected"
                      }
                      className={`px-3 py-1 rounded-lg border text-xs font-medium
                        ${
                          order.status === "Accepted" ||
                          order.status === "Rejected"
                            ? "border-gray-300 text-gray-300 cursor-not-allowed"
                            : "border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
                        }`}
                    >
                      Reject
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

export default ProcessOrder;
