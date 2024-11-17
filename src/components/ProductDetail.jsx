import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Trắng");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Không thể tải thông tin sản phẩm");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);

      const response = await axiosInstance.post("/cart", {
        productId: id,

        quantity: quantity,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Đã thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 401) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
        navigate("/signin");
      } else if (error.response?.status === 400) {
        toast.error(
          error.response.data.message || "Không thể thêm vào giỏ hàng"
        );
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      }
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Không tìm thấy sản phẩm</div>;
  }

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full dark:hidden"
              src={
                product.image ||
                "https://flowbite.s3.amazonaws.com/blocks/e-commerce/products/default.svg"
              }
              alt={product.title}
            />
            <img
              className="w-full hidden dark:block"
              src={
                product.image ||
                "https://flowbite.s3.amazonaws.com/blocks/e-commerce/products/default-dark.svg"
              }
              alt={product.title}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {product.title}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {formatVND(product.price)}
              </p>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < product.rating
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  ({product.rating})
                </p>
                <a
                  href="#reviews"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  {product.reviewCount} Reviews
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to favorites
              </button>

              <button
                onClick={handleAddToCart}
                className="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Size
              </h3>
              <div className="flex gap-2">
                {["S", "M", "L", "XL", "2XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border 
                      ${
                        selectedSize === size
                          ? "bg-primary-600 text-white border-primary-600"
                          : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100"
                      } 
                      dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Color
              </h3>
              <div className="flex gap-2">
                {[
                  { name: "Trắng", class: "bg-white" },
                  { name: "Đen", class: "bg-gray-900" },
                  { name: "Xanh", class: "bg-blue-600" },
                  { name: "Đỏ", class: "bg-red-600" },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border border-gray-200 ${color.class} hover:ring-2 hover:ring-primary-700 focus:ring-2 focus:ring-primary-700`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Số lượng
              </h3>
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:ring-2 focus:ring-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 px-3 py-1 text-center text-gray-900 bg-white border-y border-gray-200 focus:ring-0 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                />
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 focus:ring-2 focus:ring-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {product.description}
            </p>

            {product.additionalInfo && (
              <p className="text-gray-500 dark:text-gray-400">
                {product.additionalInfo}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
