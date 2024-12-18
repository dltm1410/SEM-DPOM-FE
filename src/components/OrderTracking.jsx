import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

function OrderTracking() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        console.log(orderId);
        const response = await axiosInstance.get(`/orders/id/${orderId}`);

        console.log("API Response:", response.data);

        if (response.data.success && response.data.order) {
          setOrderDetails(response.data.order);
        } else {
          toast.error("Không tìm thấy đơn hàng");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Không thể tải thông tin đơn hàng");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">Order not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Giữ nguyên phần style animation */}
      <style>
        {`
          @keyframes moveToInTransit {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .progress-line {
            position: absolute;
            height: 2px;
            background-color: rgb(37 99 235);
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            animation: moveToInTransit 3s linear infinite;
          }
          .truck-animation {
            position: absolute;
            right: -24px;
            top: -12px;
          }
        `}
      </style>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Tracking Order #{""}
            <span className="cursor-help" title={orderDetails.orderId}>
              {orderDetails.orderId.substring(0, 10)}...
            </span>
          </h2>

          <div className="mt-6 flex flex-col gap-8 sm:mt-8 lg:flex-row">
            {/* Danh sách sản phẩm */}
            <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
              {orderDetails.items?.map((item, index) => (
                <div key={index} className="space-y-4 p-6">
                  <div className="flex items-center gap-6">
                    <div className="min-w-0 flex-1 font-medium text-gray-900 dark:text-white">
                      {item.productName}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">
                        Product Code:
                      </span>{" "}
                      {item.productId}
                    </p>
                    <div className="flex items-center justify-end gap-4">
                      <p className="text-base font-normal text-gray-900 dark:text-white">
                        x{item.quantity}
                      </p>
                      <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chi tiết đơn hàng */}
            <div className="grow">
              <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Order Date
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(orderDetails.orderDate).toLocaleDateString(
                        "vi-VN"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {orderDetails.status}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(orderDetails.total)}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 gap-4 sm:flex sm:items-center">
                  {orderDetails.status !== "Cancelled" &&
                    orderDetails.status !== "Delivered" && (
                      <button
                        type="button"
                        className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderTracking;
