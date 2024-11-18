import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const Payment = () => {
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    fullName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post("/payment", paymentInfo);
      if (response.status === 200) {
        toast.success("Thanh toán thành công!");
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Thanh toán thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Thanh toán
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form
              onSubmit={handleSubmit}
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8"
            >
              <div className="mb-6 grid grid-cols-2 gap-4">
                {/* Full Name Input */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Họ tên (như trên thẻ)*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={paymentInfo.fullName}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>

                {/* Card Number Input */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="cardNumber"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Số thẻ*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                    required
                  />
                </div>

                {/* Card Expiration */}
                <div>
                  <label
                    htmlFor="expiration"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ngày hết hạn*
                  </label>
                  <input
                    type="text"
                    id="expiration"
                    value={paymentInfo.expiration}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                {/* CVV Input */}
                <div>
                  <label
                    htmlFor="cvv"
                    className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CVV*
                    <button
                      type="button"
                      data-tooltip-target="cvv-desc"
                      className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                    >
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </label>
                  <input
                    type="number"
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="•••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Thanh toán ngay"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
