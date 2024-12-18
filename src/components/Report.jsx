import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios"; // Đảm bảo import axiosInstance
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Report = () => {
  const [orders, setOrders] = useState([]); // Thêm state để lưu trữ đơn hàng
  const [totalOrders, setTotalOrders] = useState(0); // Biến để lưu số lượng đơn hàng
  const [totalValue, setTotalValue] = useState(0); // Biến để lưu tổng giá trị đơn hàng
  const [averageOrderValue, setAverageOrderValue] = useState(0); // Biến để lưu giá trị trung bình đơn hàng
  const [topProducts, setTopProducts] = useState([]); // Add a state for top products

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      if (response.data.success) {
        setOrders(response.data.orders); // Lưu dữ liệu đơn hàng vào state
        setTotalOrders(response.data.orders.length); // Cập nhật số lượng đơn hàng
        setTotalValue(calculateTotalValue(response.data.orders)); // Tính tổng giá trị đơn hàng
        setAverageOrderValue(calculateAverageOrderValue(response.data.orders)); // Tính giá trị trung bình đơn hàng
        console.log("Dữ liệu đơn hàng:", response.data.orders);
      } else {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
      setTotalOrders(0); // Đặt lại totalOrders về 0 nếu có lỗi
      setTotalValue(0); // Đặt lại totalValue về 0 nếu có lỗi
      setAverageOrderValue(0); // Đặt lại averageOrderValue về 0 nếu có lỗi
    }
  };

  const calculateTotalValue = (orders) => {
    return orders.reduce((acc, order) => acc + order.total, 0); // Tính tổng giá trị
  };

  const calculateAverageOrderValue = (orders) => {
    if (orders.length === 0) return 0; // Trả về 0 nếu không có đơn hàng
    const total = calculateTotalValue(orders); // Tính tổng giá trị
    return total / orders.length; // Tính giá trị trung bình
  };

  const fetchTopProducts = async () => {
    try {
      const response = await axiosInstance.get("/products/top-selling");
      if (response.data.success) {
        setTopProducts(response.data.topProducts); // Update top products from API response
      } else {
        console.error("Error fetching top products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Gọi hàm để lấy dữ liệu đơn hàng
    fetchTopProducts(); // Fetch top products
  }, []);

  // Sắp xếp đơn hàng theo ngày giảm dần
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  const handleExport = async () => {
    const input = document.getElementById("report-content"); // ID của phần nội dung cần xuất
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 190; // Width of the image in PDF
    const pageHeight = pdf.internal.pageSize.height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("report.pdf"); // Tên file PDF
  };

  return (
    <div className="p-4">
      <div id="report-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Sales Report
          </h2>
          <button
            onClick={handleExport}
            className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Export to PDF
          </button>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Orders
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalOrders !== undefined ? totalOrders : 0}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </h3>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {totalValue.toLocaleString("vi-VN", {
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
              {averageOrderValue.toLocaleString("vi-VN", {
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
                {topProducts.map((product, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2">{product.productName}</td>
                    <td className="px-4 py-2">{product.quantitySold}</td>
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
                {sortedOrders.map((order, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="px-4 py-2">#{order.orderId}</td>
                    <td className="px-4 py-2">
                      {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-4 py-2">
                      {order.total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "In-transit"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : order.status === "Deliveried"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : order.status === "Rejected"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : ""
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
    </div>
  );
};

export default Report;
