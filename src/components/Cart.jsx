import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [currentUser, setCurrentUser] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCart();
    fetchCurrentUser();
  }, []);

  // Fetch giỏ hàng từ API
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/cart");
      setCartData(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Error fetching cart");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/users/me");
      setCurrentUser(response.data.user || []);
      if (response.data.user?.address) {
        setAddress(response.data.user.address);
      }
      console.log(currentUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm format tiền VND
  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    })
      .format(amount)
      .replace("VND", " VND");
  };

  // Tính tổng tiền giỏ hàng
  const total = cartData?.totalAmount || 0;

  // Cập nhật handler cho payment method
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Xử lý thanh toán MoMo
  const handleMomoPayment = async () => {
    try {
      const response = await axiosInstance.post("/payment/momo", {
        amount: total,
      });
      window.location.href = response.data.payUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Có lỗi xảy ra khi thanh toán");
    }
  };

  // Thêm handler cho address
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Thêm các hàm xử lý tăng giảm số lượng
  const handleDecreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;

    try {
      console.log("Item being decreased:", item);

      const variantId = item.productVariantId;
      console.log("Using variantId:", variantId);

      const response = await axiosInstance.put(`/cart/item`, {
        productVariantId: variantId,
        quantity: item.quantity - 1,
      });

      console.log("API Response:", response.data);

      toast.success("Updated quantity");
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Error updating quantity");
    }
  };

  const handleIncreaseQuantity = async (item) => {
    try {
      console.log("Item being increased:", item);

      // Kiểm tra xem item có variantId không
      const variantId = item.productVariantId;
      console.log("Using variantId:", variantId);

      const response = await axiosInstance.put(`/cart/item`, {
        productVariantId: variantId,
        quantity: item.quantity + 1,
      });

      console.log("API Response:", response.data);

      toast.success("Updated quantity");
      fetchCart(); // Refresh cart data
    } catch (error) {
      console.error("Error updating quantity:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Error updating quantity");
    }
  };

  // Thêm useEffect để log cartData khi nó thay đổi
  useEffect(() => {
    console.log("Current cart data:", cartData);
  }, [cartData]);

  // Thêm hàm xử lý đặt hàng
  const handleOrder = async (e) => {
    e.preventDefault();

    if (!address) {
      toast.error("Vui lòng nhập địa chỉ giao hàng");
      return;
    }

    try {
      setIsLoading(true);
      const orderData = {
        items: cartData.items.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.productPrice,
        })),
        totalAmount: total,
        address: address,
        paymentMethod: paymentMethod,
      };

      const response = await axiosInstance.post("/orders", orderData);
      toast.success("Đặt hàng thành công!");
      navigate(`/confirm-order/${response.data.orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Your Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:w-[750px]">
            <div className="space-y-6">
              {cartData?.items.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a
                        href="#"
                        className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        {item.productName}
                      </a>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Size: {item.size}</span>
                        <span>•</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:order-3">
                      <button
                        type="button"
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity <= 1}
                        className={`flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 
                          ${
                            item.quantity <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-gray-100"
                          } 
                          focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white 
                          dark:hover:bg-gray-700 dark:focus:ring-gray-700`}
                      >
                        <svg
                          className="h-2 w-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>

                      <input
                        type="text"
                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        value={item.quantity}
                        readOnly
                      />

                      <button
                        type="button"
                        onClick={() => handleIncreaseQuantity(item)}
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900 
                          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-300 dark:border-gray-600 
                          dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        <svg
                          className="h-2 w-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        {formatVND(item.productPrice)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-96">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Total
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {formatVND(total)}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Order Date
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString("vi-VN")}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Delivery Address
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white w-64">
                      {currentUser?.address ? (
                        <div className="text-base font-medium text-gray-900 dark:text-white text-right">
                          {currentUser.address}
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={address}
                          onChange={handleAddressChange}
                          placeholder="Enter your address"
                          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 text-right"
                          required
                        />
                      )}
                    </dd>
                  </dl>
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Payment Method
                    </dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">
                      <select
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="cash">COD</option>
                        <option value="momo">MoMo</option>
                      </select>
                    </dd>
                  </dl>

                  {/* Form thanh toán MoMo */}
                  {paymentMethod === "momo" && (
                    <div className="mt-4 rounded-lg border border-pink-200 bg-pink-50 p-4 dark:border-pink-800 dark:bg-pink-900">
                      <div className="mb-4">
                        <p className="text-sm font-medium text-pink-800 dark:text-pink-200">
                          Pay with MoMo
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-pink-700 dark:text-pink-300">
                            {currentUser.firstName + " " + currentUser.lastName}
                          </p>
                          <p className="text-sm text-pink-700 dark:text-pink-300">
                            {currentUser.phoneNumber}
                          </p>
                        </div>
                        <p className="mt-3 text-sm text-pink-700 dark:text-pink-300">
                          Total: {formatVND(total)}
                        </p>
                      </div>
                      <button
                        onClick={handleMomoPayment}
                        className="w-full rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-pink-700 dark:hover:bg-pink-800"
                      >
                        Pay
                      </button>
                    </div>
                  )}
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    {formatVND(total)}
                  </dd>
                </dl>
              </div>

              <Link
                to={paymentMethod === "cash" ? "#" : "#"}
                className={`flex w-full items-center justify-center rounded-lg ${
                  paymentMethod === "cash"
                    ? "bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                    : "bg-gray-300 cursor-not-allowed"
                } px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 mt-4`}
                onClick={(e) => {
                  if (paymentMethod === "cash") {
                    handleOrder(e);
                  } else {
                    e.preventDefault();
                  }
                }}
              >
                {paymentMethod === "cash"
                  ? "Continue to payment"
                  : "Please pay with MoMo above"}
              </Link>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  role="button"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
