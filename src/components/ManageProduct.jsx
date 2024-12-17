import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";
const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ManageProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    stock: "",
    address: "",
    phone: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    rating: "0",
  });
  const [categoryMap, setCategoryMap] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
    description: "",
  });
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/products");
        setProducts(response.data.products || []);
        console.log(response.data.products);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const map = categories.reduce((acc, cat) => {
      acc[cat._id] = cat.name;
      return acc;
    }, {});
    setCategoryMap(map);
  }, [categories]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/products", newProduct);
      if (response.status === 201) {
        setProducts([...products, response.data]);
        setIsModalOpen(false);
        setNewProduct({
          name: "",
          category: "",
          stock: "",
          price: "",
          rating: "0",
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateStockModalOpen(false);
    setUpdateForm({
      stock: "",
      address: "",
      phone: "",
    });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.title,
      category: product.categoryId,
      price: product.price,
      rating: product.rating,
      description: product.description || "",
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/products/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== productId));
        setIsConfirmDeleteOpen(false);
        setProductToDelete(null);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-gray-500">All Products:</span>
                <span className="dark:text-white">{products.length}</span>
              </h5>
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add new product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all"
                        type="checkbox"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-all" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Rating
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="w-4 px-4 py-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.title}
                    </td>
                    <td className="px-4 py-4">
                      <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        {categoryMap[product.categoryId] || "Không có danh mục"}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {formatVND(product.price)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-900 dark:text-white">
                          {product.rating || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        <div
                          className={`inline-block w-4 h-4 mr-2 ${
                            product.totalStock > 1000
                              ? "bg-green-500"
                              : product.totalStock > 900
                              ? "bg-yellow-300"
                              : "bg-red-700"
                          } rounded-full`}
                        ></div>
                        {product.totalStock}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsUpdateStockModalOpen(true);
                          }}
                          className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:text-blue-100 dark:hover:bg-blue-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleEditClick(product)}
                          className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:bg-yellow-700 dark:text-yellow-100 dark:hover:bg-yellow-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setIsConfirmDeleteOpen(true);
                          }}
                          className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
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

      {/* Thêm Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                Add new product
              </h3>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-130px)]">
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value="">Select category</option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Thêm phần footer với buttons vào đây */}
                <div className="border-t  px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex justify-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setNewProduct({
                          name: "",
                          category: "",
                          stock: "",
                          price: "",
                          rating: "0",
                        });
                      }}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Add new product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Update Product Modal */}
      {isUpdateStockModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Restock Product Information
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Updating product with:", updateForm);
                handleCloseUpdateModal();
              }}
            >
              <div className="space-y-4">
                {/* Product Name - Read Only */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.title}
                    disabled
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                  />
                </div>

                {/* Category - Read Only */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <input
                    type="text"
                    value={
                      categoryMap[selectedProduct.categoryId] ||
                      "Không có danh mục"
                    }
                    disabled
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                  />
                </div>

                {/* Stock - Editable */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={updateForm.stock}
                    onChange={(e) =>
                      setUpdateForm({ ...updateForm, stock: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter quantity"
                  />
                </div>

                {/* Thêm các nút ở cuối form */}
                <div className="flex justify-center space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={handleCloseUpdateModal}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                Edit Product Information
              </h3>
            </div>

            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-130px)]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Updating product:", editForm);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Desciption
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    rows="4"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nhập mô tả sản phẩm..."
                  />
                </div>

                <div className="border-t bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex justify-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setSelectedProduct(null);
                      }}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmDeleteOpen && productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="text-center">
              <svg
                className="mx-auto mb-4 text-red-600 w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Delete Product
              </h3>

              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete the product "
                {productToDelete.title}"? This action cannot be undone.
              </p>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setIsConfirmDeleteOpen(false);
                    setProductToDelete(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(productToDelete._id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageProduct;
