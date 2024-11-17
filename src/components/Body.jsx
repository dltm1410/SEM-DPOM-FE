import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";
import { toast } from "react-toastify";

const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Tách thành component riêng để dễ quản lý
const ProductCard = ({ product, onAddToCart, onProductClick }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        className="h-56 w-full cursor-pointer"
        onClick={() => onProductClick(product._id)}
      >
        <img
          className="mx-auto h-full dark:hidden"
          src={
            product.image ||
            "https://flowbite.s3.amazonaws.com/blocks/e-commerce/products/default.svg"
          }
          alt={product.name}
        />
        <img
          className="mx-auto hidden h-full dark:block"
          src={
            product.image ||
            "https://flowbite.s3.amazonaws.com/blocks/e-commerce/products/default-dark.svg"
          }
          alt={product.name}
        />
      </div>

      <div className="pt-6">
        {/* Product Info */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 me-2 rounded px-2.5 py-0.5 text-xs font-medium">
            {product.material}
          </span>

          {/* Quick Actions */}
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              title="Quick look"
            >
              {/* Quick look icon */}
            </button>
            <button
              type="button"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              title="Add to favorites"
            >
              {/* Favorite icon */}
            </button>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/product-detail/${product._id}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-4 w-4 ${
                  index < product.rating ? "text-yellow-400" : "text-gray-300"
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
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {product.rating}
          </p>
        </div>
        <ul class="mt-2 flex items-center gap-4">
          <li class="flex items-center gap-2">
            <svg
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
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
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Fast Delivery
            </p>
          </li>

          <li class="flex items-center gap-2">
            <svg
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Best Price
            </p>
          </li>
        </ul>

        {/* Price and Add to Cart */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
            {formatVND(product.price)}
          </p>
          <button
            type="button"
            onClick={() => onAddToCart(product._id)}
            className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            {/* Cart icon */}
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Gộp 2 hàm fetch và search thành 1
  const fetchProducts = async (currentPage, query = "") => {
    try {
      setLoading(true);
      const endpoint = query
        ? `/products/search?q=${query}&page=${currentPage}`
        : `/products?page=${currentPage}`;

      const response = await axiosInstance.get(endpoint);

      if (currentPage === 1) {
        setProducts(response.data.products);
      } else {
        setProducts((prev) => [...prev, ...response.data.products]);
      }

      setHasMore(response.data.hasMore);
    } catch (err) {
      setError(
        query
          ? "Có lỗi xảy ra khi tìm kiếm sản phẩm"
          : "Có lỗi xảy ra khi tải dữ liệu sản phẩm"
      );
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load products khi page thay đổi
  useEffect(() => {
    fetchProducts(page, searchQuery);
  }, [page]);

  // Xử lý search với debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (page === 1) {
        fetchProducts(1, searchQuery);
      } else {
        setPage(1); // Reset về trang 1 khi search
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleProductClick = async (productId) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      navigate(`/product-detail/${productId}`, {
        state: { product: response.data },
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Không thể tải thông tin sản phẩm");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axiosInstance.post("/cart/add", {
        productId,
        quantity: 1,
      });
      toast.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Không thể thêm vào giỏ hàng");
    }
  };

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="w-full text-center">
            <button
              type="button"
              onClick={handleShowMore}
              className="hover:text-primary-700 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Xem thêm
            </button>
          </div>
        )}

        {/* Loading & Error States */}
        {loading && (
          <div className="w-full text-center">
            <p>Đang tải...</p>
          </div>
        )}
        {error && (
          <div className="w-full text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Body;
