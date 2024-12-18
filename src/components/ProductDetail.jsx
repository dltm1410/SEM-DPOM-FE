import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [variants, setVariants] = useState([]);
  const [variantStock, setVariantStock] = useState(0);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/id/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Cannot load product information");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  useEffect(() => {
    const fetchVariants = async () => {
      console.log("Fetching variants for product:", id);
      try {
        const response = await axiosInstance.get(
          `/products/variants/${id}`
        );
        console.log("Raw variants data:", response.data);

        const variantsArray = response.data?.variants || response.data || [];
        console.log("Processed variants:", variantsArray);

        setVariants(Array.isArray(variantsArray) ? variantsArray : []);
      } catch (error) {
        console.error("Error fetching variants:", error);
        setVariants([]);
      }
    };

    fetchVariants();
  }, [id]);

  useEffect(() => {
    if (variants.length > 0) {
      const currentVariant = variants.find(
        (variant) =>
          variant.size === selectedSize && variant.color === selectedColor
      );
      setVariantStock(currentVariant?.quantity || 0);
    }
  }, [selectedSize, selectedColor, variants]);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      if (product) {
        try {
          const response = await axiosInstance.post("/products/recommend", {
            productName: product.title,
          });
          setRecommendedProducts(response.data.similarProducts || []);
        } catch (error) {
          console.error("Error fetching recommended products:", error);
        }
      }
    };

    fetchRecommendedProducts();
  }, [product]);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(variantStock, prev + 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, Math.min(variantStock, value)));
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);

      const currentVariant = variants.find(
        (variant) =>
          variant.size === selectedSize && variant.color === selectedColor
      );

      if (!currentVariant) {
        toast.error("Cannot find product variant");
        return;
      }

      console.log("Adding to cart with data:", {
        productVariantId: currentVariant._id,
        quantity: quantity,
      });

      const response = await axiosInstance.post("/cart", {
        productVariantId: currentVariant._id,
        quantity: quantity,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Added to cart!");
        setQuantity(1);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      console.log("Error response:", error.response);

      if (error.response?.status === 401) {
        toast.error("Please login to add to cart");
        navigate("/signin");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred, please try again"
        );
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    if (selectedColor) {
      const currentVariant = variants.find(
        (variant) => variant.size === size && variant.color === selectedColor
      );
      setVariantStock(currentVariant?.quantity || 0);
    } else {
      const totalStockForSize = variants
        .filter(variant => variant.size === size)
        .reduce((total, variant) => total + variant.quantity, 0);
      setVariantStock(totalStockForSize);
    }
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (selectedSize) {
      const currentVariant = variants.find(
        (variant) => variant.size === selectedSize && variant.color === color
      );
      setVariantStock(currentVariant?.quantity || 0);
    } else {
      const totalStockForColor = variants
        .filter(variant => variant.color === color)
        .reduce((total, variant) => total + variant.quantity, 0);
      setVariantStock(totalStockForColor);
    }
  };

  useEffect(() => {
    console.log("Current variants state:", variants);
  }, [variants]);

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
                disabled={!selectedSize || !selectedColor || variantStock === 0}
                className={`text-white mt-4 sm:mt-0 ${
                  !selectedSize || !selectedColor || variantStock === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                } focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none flex items-center justify-center`}
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
                {!selectedSize
                  ? "Please select size"
                  : !selectedColor
                  ? "Please select color"
                  : "Add to cart"}
              </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
                Size
              </h3>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
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
                  { name: "White", class: "bg-white" },
                  { name: "Black", class: "bg-gray-900" },
                  { name: "Blue", class: "bg-blue-600" },
                  { name: "Green", class: "bg-green-600" },
                  { name: "Red", class: "bg-red-600" },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color.name)}
                    className={`w-8 h-8 rounded-full border border-gray-200 ${
                      color.class
                    } 
                      ${
                        selectedColor === color.name
                          ? "ring-2 ring-primary-700"
                          : ""
                      }
                      hover:ring-2 hover:ring-primary-700 focus:ring-2 focus:ring-primary-700`}
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
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    disabled={!selectedSize || variantStock === 0}
                    className={`px-3 py-1 text-gray-900 bg-white border border-gray-200 rounded-l-lg 
                      ${
                        !selectedSize || variantStock === 0
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={!selectedSize || variantStock === 0}
                    className="w-16 px-3 py-1 text-center text-gray-900 bg-white border-y border-gray-200 focus:ring-0"
                  />
                  <button
                    onClick={increaseQuantity}
                    disabled={!selectedSize || quantity >= variantStock}
                    className={`px-3 py-1 text-gray-900 bg-white border border-gray-200 rounded-r-lg 
                      ${
                        !selectedSize || quantity >= variantStock
                          ? "cursor-not-allowed opacity-50"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {!selectedSize && !selectedColor
                    ? "Please select size and color"
                    : !selectedSize
                    ? "Please select size"
                    : !selectedColor
                    ? "Please select color"
                    : variantStock > 0
                    ? `Available: ${variantStock}`
                    : "Out of stock"}
                </span>
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

        {/* Recommended Products Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Sản phẩm bạn có thể thích</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.slice(0, 4).map((recommendedProduct) => (
                <div key={recommendedProduct._id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="h-56 w-full cursor-pointer" onClick={() => navigate(`/product-detail/${recommendedProduct._id}`)}>
                    <img
                      className="mx-auto h-full dark:hidden"
                      src={recommendedProduct.image || "https://flowbite.s3.amazonaws.com/blocks/e-commerce/products/default.svg"}
                      alt={recommendedProduct.name}
                    />
                    <img
                      className="mx-auto hidden h-full dark:block"
                      src={recommendedProduct.image || "https://flowbite.s3.amazonaws.com/blocks/e-commerce/products/default-dark.svg"}
                      alt={recommendedProduct.name}
                    />
                  </div>
                  <div className="pt-6">
                    <Link to={`/product-detail/${recommendedProduct._id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">
                      {recommendedProduct.title}
                    </Link>
                    <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
                      {formatVND(recommendedProduct.price)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Không có sản phẩm nào được đề xuất.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
