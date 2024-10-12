import React, { useState } from "react";

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    console.log("Giỏ hàng đã được mở/đóng!");
    setIsCartOpen(!isCartOpen);
  };
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleAccount = () => {
    console.log("Account đã được mở/đóng!");
    setIsAccountOpen(!isAccountOpen);
  };
  return (
    <nav className="bg-white antialiased dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 py-4 2xl:px-0">
        <div className="flex relative items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <a href="#" title="" className="">
                <img
                  className="block h-8 w-auto dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                  alt=""
                />
                <img
                  className="hidden h-8 w-auto dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                  alt=""
                />
              </a>
            </div>

            <ul className="hidden items-center justify-start gap-6 py-3 sm:justify-center md:gap-8 lg:flex">
              <li>
                <a
                  href="#"
                  title=""
                  className="hover:text-primary-700 dark:hover:text-primary-500 flex text-sm font-medium text-gray-900 dark:text-white"
                >
                  Home
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="hover:text-primary-700 dark:hover:text-primary-500 flex text-sm font-medium text-gray-900 dark:text-white"
                >
                  Best Sellers
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="hover:text-primary-700 dark:hover:text-primary-500 flex text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gift Ideas
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="hover:text-primary-700 dark:hover:text-primary-500 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Today's Deals
                </a>
              </li>
              <li className="shrink-0">
                <a
                  href="#"
                  title=""
                  className="hover:text-primary-700 dark:hover:text-primary-500 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sell
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center lg:space-x-2">
            <button
              onClick={toggleCart}
              id="myCartDropdownButton1"
              data-dropdown-toggle="myCartDropdown1"
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only"> Cart </span>
              <svg
                className="h-5 w-5 lg:me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <span className="hidden sm:flex">My Cart</span>
              <svg
                className="ms-1 hidden h-4 w-4 text-gray-900 dark:text-white sm:flex"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            {isCartOpen && (
              <div
                id="myCartDropdown1"
                className="absolute right-10 top-10 z-10 mx-auto ${isCartOpen ? 'hidden' : ''} max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800"
              >
                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white"
                    >
                      Apple iPhone 15
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $599
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem1a"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem1a"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white"
                    >
                      Apple iPad Air
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $499
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem2a"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem2a"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white"
                    >
                      Apple Watch SE
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $598
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 2
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem3b"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem3b"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white"
                    >
                      Sony Playstation 5
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $799
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 1
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem4b"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem4b"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div>
                    <a
                      href="#"
                      className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white"
                    >
                      Apple iMac 20"
                    </a>
                    <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                      $8,997
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-6">
                    <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                      Qty: 3
                    </p>

                    <button
                      data-tooltip-target="tooltipRemoveItem5b"
                      type="button"
                      className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                    >
                      <span className="sr-only"> Remove </span>
                      <svg
                        className="h-4 w-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="tooltipRemoveItem5b"
                      role="tooltip"
                      className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                    >
                      Remove item
                      <div className="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>
                </div>

                <a
                  href="#"
                  title=""
                  className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-black focus:outline-none focus:ring-4"
                  role="button"
                >
                  Proceed to Checkout
                </a>
              </div>
            )}

            <button
              onClick={toggleAccount}
              id="userDropdownButton1"
              data-dropdown-toggle="userDropdown1"
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="me-1 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Account
              <svg
                className="ms-1 h-4 w-4 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            {isAccountOpen && (
              <div
                id="userDropdown1"
                className="absolute top-10 z-10 ${isAccountOpen ? 'hidden' : ''} w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700"
              >
                <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      My Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Favourites
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Delivery Addresses
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      title=""
                      className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Billing Data
                    </a>
                  </li>
                </ul>

                <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                  <a
                    href="#"
                    title=""
                    className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            )}
            <button
              type="button"
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded="false"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 lg:hidden"
            >
              <span className="sr-only"> Open Menu </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="ecommerce-navbar-menu-1"
          className="mt-4 hidden rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700"
        >
          <ul className="space-y-3 text-sm font-medium text-gray-900 dark:text-white dark:text-white">
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Best Sellers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Gift Ideas
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Games
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Electronics
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-primary-700 dark:hover:text-primary-500"
              >
                Home & Garden
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
