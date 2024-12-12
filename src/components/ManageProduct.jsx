import React, { useState } from "react";
const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const ManageProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
  });
  const [isUpdateStockModalOpen, setIsUpdateStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    stock: "",
    address: "",
    phone: ""
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Xử lý thêm sản phẩm ở đây
    console.log("New product:", newProduct);
    setIsModalOpen(false);
    setNewProduct({ name: "", category: "", stock: "", price: "" });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-gray-500">All Products:</span>
                <span className="dark:text-white">123456</span>
              </h5>
              <h5>
                <span className="text-gray-500">Total sales:</span>
                <span className="dark:text-white">$88.4k</span>
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
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                Update stocks 1/250
              </button>
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Export
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
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Product Row */}
                <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {/* Checkbox cell */}
                  <td className="w-4 px-4 py-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                  </td>
                  {/* Product name cell */}
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Áo Hoddie
                  </td>
                  {/* Category cell */}
                  <td className="px-4 py-4">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      Clothing
                    </span>
                  </td>
                  {/* Stock cell */}
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                      <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                      95
                    </div>
                  </td>
                  {/* Update button cell */}
                  <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <button
                      onClick={() => {
                        setSelectedProduct({
                          name: "Áo Hoddie",
                          category: "Clothing",
                          currentStock: 95
                        });
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
                  </td>
                </tr>

                {/* Các product row khác tương tự... */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Thêm Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Add New Product
            </h3>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
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
                    <option value="">Chọn danh mục</option>
                    <option value="Desktop PC">Desktop PC</option>
                    <option value="Laptop">Laptop</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Product Modal */}
      {isUpdateStockModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Update Product Information
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              console.log("Updating product with:", updateForm);
              setIsUpdateStockModalOpen(false);
              setUpdateForm({ stock: "", address: "", phone: "" });
            }}>
              <div className="space-y-4">
                {/* Product Name - Read Only */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.name}
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
                    value={selectedProduct.category}
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
                    onChange={(e) => setUpdateForm({...updateForm, stock: e.target.value})}
                    placeholder={`Current: ${selectedProduct.currentStock}`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                {/* Address - New Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    value={updateForm.address}
                    onChange={(e) => setUpdateForm({...updateForm, address: e.target.value})}
                    placeholder="Enter address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                {/* Phone - New Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={updateForm.phone}
                    onChange={(e) => setUpdateForm({...updateForm, phone: e.target.value})}
                    placeholder="Enter phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>

                {/* Thêm các nút ở cuối form */}
                <div className="flex justify-center space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsUpdateStockModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-200 dark:bg-red-700 dark:text-white dark:border-red-600 dark:hover:bg-red-800 dark:focus:ring-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageProduct;
