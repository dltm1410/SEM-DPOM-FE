import React from "react";
import { Steps } from "antd";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

function OrderTracking() {
  return (
    <>
      {/* Thêm styles cho animation */}
      <style>
        {`
          @keyframes moveToInTransit {
            0% { 
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
          .progress-line {
            position: absolute;
            height: 2px;
            background-color: rgb(37 99 235);
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            animation: moveToInTransit 3s linear infinite;
          }
          .truck-animation {
            position: absolute;
            right: -24px;
            top: -12px;
          }
        `}
      </style>

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Track the delivery of order #957684673
          </h2>

          {/* Custom Steps Container */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="relative flex items-center justify-between">
              {/* Pending */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <svg
                    className="h-6 w-6 text-blue-600 dark:text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Pending
                </p>
              </div>

              {/* Container để căn giữa */}
              <div className="flex items-center justify-center w-full">
                {/* Giới hạn chiều rộng của progress bar */}
                <div className="w-3/4 max-w-3xl">
                  {/* Line với 3 state */}
                  <div className="relative h-6 w-full">
                    {/* Line nền */}
                    <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-full bg-gray-200 dark:bg-gray-700">
                      {/* Line xanh di chuyển */}
                      <div className="progress-line">
                        <svg
                          className="truck-animation h-6 w-6 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 15C19 15.5304 18.7893 16.0391 18.4142 16.4142C18.0391 16.7893 17.5304 17 17 17C16.4696 17 15.9609 16.7893 15.5858 16.4142C15.2107 16.0391 15 15.5304 15 15C15 14.4696 15.2107 13.9609 15.5858 13.5858C15.9609 13.2107 16.4696 13 17 13C17.5304 13 18.0391 13.2107 18.4142 13.5858C18.7893 13.9609 19 14.4696 19 15ZM7 15C7 15.5304 6.78929 16.0391 6.41421 16.4142C6.03914 16.7893 5.53043 17 5 17C4.46957 17 3.96086 16.7893 3.58579 16.4142C3.21071 16.0391 3 15.5304 3 15C3 14.4696 3.21071 13.9609 3.58579 13.5858C3.96086 13.2107 4.46957 13 5 13C5.53043 13 6.03914 13.2107 6.41421 13.5858C6.78929 13.9609 7 14.4696 7 15ZM22.9866 11.0329L21.9866 6.03289C21.9075 5.59758 21.6789 5.20625 21.3433 4.92657C21.0076 4.64688 20.587 4.49725 20.1533 4.50289H16V3C16 2.46957 15.7893 1.96086 15.4142 1.58579C15.0391 1.21071 14.5304 1 14 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H3.1733C3.37375 17.8031 3.83891 18.514 4.49414 19.0224C5.14936 19.5308 5.95648 19.8075 6.78396 19.8075C7.61144 19.8075 8.41856 19.5308 9.07379 19.0224C9.72901 18.514 10.1942 17.8031 10.3946 17H15.6053C15.8058 17.8031 16.2709 18.514 16.9262 19.0224C17.5814 19.5308 18.3885 19.8075 19.216 19.8075C20.0435 19.8075 20.8506 19.5308 21.5058 19.0224C22.161 18.514 22.6262 17.8031 22.8266 17H23C23.2652 17 23.5196 16.8946 23.7071 16.7071C23.8946 16.5196 24 16.2652 24 16V12C24 11.6729 23.9398 11.3365 23.7866 11.0329H22.9866Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* In Transit */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  In-Transit
                </p>
              </div>

              {/* Line 2 */}
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600"></div>

              {/* Delivered */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <svg
                    className="h-6 w-6 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Delivered
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-8 sm:mt-8 lg:flex-row">
            <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
              {/* First Product */}
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-6">
                  <a href="#" className="h-14 w-14 shrink-0">
                    <img
                      className="h-full w-full dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                      alt="imac image"
                    />
                    <img
                      className="hidden h-full w-full dark:block"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                      alt="imac image"
                    />
                  </a>
                  <a
                    href="#"
                    className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3,
                    24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma,
                    Blue, Keyboard layout INT
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Product ID:
                    </span>{" "}
                    BJ8364850
                  </p>
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900 dark:text-white">
                      x1
                    </p>
                    <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                      $1,499
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Product */}
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-6">
                  <a href="#" className="h-14 w-14 shrink-0">
                    <img
                      className="h-full w-full dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
                      alt="apple watch image"
                    />
                    <img
                      className="hidden h-full w-full dark:block"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
                      alt="apple watch image"
                    />
                  </a>
                  <a
                    href="#"
                    className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum
                    Case with Midnight Sport Band
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Product ID:
                    </span>{" "}
                    BJ8364850
                  </p>
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900 dark:text-white">
                      x2
                    </p>
                    <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                      $598
                    </p>
                  </div>
                </div>
              </div>

              {/* Third Product */}
              <div className="space-y-4 p-6">
                <div className="flex items-center gap-6">
                  <a href="#" className="h-14 w-14 shrink-0">
                    <img
                      className="h-full w-full dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
                      alt="console image"
                    />
                    <img
                      className="hidden h-full w-full dark:block"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
                      alt="console image"
                    />
                  </a>
                  <a
                    href="#"
                    className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    Sony Playstation 5 Digital Edition Console with Extra Blue
                    Controller, White PULSE 3D Headset and Surge Dual Controller
                  </a>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Product ID:
                    </span>{" "}
                    BJ8364851
                  </p>
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-base font-normal text-gray-900 dark:text-white">
                      x1
                    </p>
                    <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                      $799
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grow">
              <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Details
                </h3>

                <div className="space-y-4">
                  {/* Order Date */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Order date
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      24 November 2023
                    </p>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      name@example.com
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      +123 456 7890
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Payment method
                    </p>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-900 dark:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fillRule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-base font-semibold text-gray-900 dark:text-white">
                        Credit Card
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Shipping address
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white text-right">
                      62 Miles Drive St, Newark, NJ 07103, California
                    </p>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total price
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      $7,191.00
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 gap-4 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Cancel order
                  </button>

                  <a
                    href="#"
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
                  >
                    View details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderTracking;
