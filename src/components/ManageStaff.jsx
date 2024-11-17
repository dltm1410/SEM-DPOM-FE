import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";

const ManageStaff = () => {
  const [staffUsers, setStaffUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffUsers = async () => {
      try {
        const response = await axiosInstance.get("/users/staff");
        console.log(response.data);
        const staffData = response.data.users;
        setStaffUsers(staffData);
        console.log(staffData);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu nhân viên");
        setLoading(false);
        console.error("Error fetching staff data:", err);
      }
    };

    fetchStaffUsers();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
      {/* Header section */}
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Manage Staff
            </h2>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              type="button"
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              <svg
                className="h-3.5 w-3.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                />
              </svg>
              Add new staff
            </button>
          </div>
        </div>

        {/* Table section */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-base font-medium text-gray-500 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Staff ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-4 py-3">
                  Email
                </th>
                <th scope="col" className="px-4 py-3">
                  Phone
                </th>
                <th scope="col" className="px-4 py-3">
                  Gender
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {staffUsers.map((staff) => (
                <tr
                  key={staff.uID}
                  className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #{staff.userID}
                  </td>
                  <td className="px-4 py-3">{staff.name}</td>
                  <td className="px-4 py-3">{staff.email}</td>
                  <td className="px-4 py-3">{staff.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`bg-${
                        staff.gender === "male" ? "green" : "red"
                      }-100 text-${
                        staff.gender === "male" ? "green" : "red"
                      }-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-${
                        staff.gender === "male" ? "green" : "red"
                      }-900 dark:text-${
                        staff.gender === "male" ? "green" : "red"
                      }-300`}
                    >
                      {staff.gender}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(staff.uID)}
                      className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
