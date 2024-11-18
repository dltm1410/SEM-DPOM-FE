import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        console.log("orderId", orderId);
        const response = await axiosInstance.get(`/orders/id/${orderId}`);
        setOrderDetails(response.data);
        console.log("orderDetails", response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Cannot load order details");
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

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Thank you for your order!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
          Đơn hàng{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            #{orderDetails?.order.orderId}
          </span>{" "}
          sẽ được xử lý trong vòng 24 giờ làm việc. Chúng tôi sẽ thông báo qua
          email khi đơn hàng được gửi đi.
        </p>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Ngày đặt hàng
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {new Date(orderDetails?.order.orderDate).toLocaleDateString("vi-VN")}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Phương thức thanh toán
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">

              Thanh toán khi nhận hàng

            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Địa chỉ giao hàng
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {orderDetails?.order.shippingAddress}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
              Tổng tiền
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(orderDetails?.order.total)}
            </dd>
          </dl>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/orders"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Xem đơn hàng của bạn
          </Link>
          <Link
            to="/"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrder;
