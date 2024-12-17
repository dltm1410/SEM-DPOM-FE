import React, { useState, useEffect } from "react";
import { axiosInstance } from "../api/axios";

const ManageStaff = () => {
  const [staffUsers, setStaffUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    username: "",
    role: "staff",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "male",
    address: "",
    phoneNumber: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] = useState(false);
  const [editStaffForm, setEditStaffForm] = useState({
    username: "",
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchStaffUsers();
  }, []);

  const fetchStaffUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/staff");
      setStaffUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError("Có lỗi xảy ra khi tải dữ liệu nhân viên");
      setLoading(false);
      console.error("Error fetching staff data:", err);
    }
  };

  const handleEdit = async (userId) => {
    try {
      // Gọi API để lấy thông tin chi tiết của nhân viên
      const response = await axiosInstance.get(`/users/${userId}`);
      console.log("user dang edit", response);
      const staffData = response.data;

      // Cập nhật state với thông tin nhân viên
      setSelectedStaff(staffData);
      setNewStaff({
        username: staffData.username,
        role: staffData.role,
        password: "", // Giữ password trống khi edit
        firstName: staffData.firstName,
        lastName: staffData.lastName,
        email: staffData.email,
        gender: staffData.gender,
        address: staffData.address,
        phoneNumber: staffData.phoneNumber,
      });
      setIsEditStaffModalOpen(true);
      console.log(staffData);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin nhân viên:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const response = await axiosInstance.put(
          `/users/${selectedStaff.userID}`,
          newStaff
        );
        setStaffUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userID === selectedStaff.userID ? response.data.user : user
          )
        );
      } else {
        const response = await axiosInstance.post("/users", newStaff);
        setStaffUsers((prevUsers) => [...prevUsers, response.data.user]);
      }

      setIsAddStaffModalOpen(false);
      setIsEditMode(false);
      setSelectedStaff(null);
      setNewStaff({
        username: "",
        role: "staff",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        gender: "Male",
        address: "",
        phoneNumber: "",
      });

      fetchStaffUsers(); // Tải lại dữ liệu sau khi thêm hoặc cập nhật
    } catch (err) {
      console.error("Error saving staff:", err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        await axiosInstance.delete(`/users/${userId}`);

        fetchStaffUsers(); // Refresh danh sách nhân viên
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
    fetchStaffUsers();
  };

  const modalTitle = isEditMode ? "Edit Staff" : "Add New Staff";

  if (loading) return <div>Loading...</div>;
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
              onClick={() => setIsAddStaffModalOpen(true)}
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
                        staff.gender === "Male" ? "green" : "red"
                      }-100 text-${
                        staff.gender === "Male" ? "green" : "red"
                      }-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-${
                        staff.gender === "Male" ? "green" : "red"
                      }-900 dark:text-${
                        staff.gender === "Male" ? "green" : "red"
                      }-300`}
                    >
                      {staff.gender}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(staff.userID)}
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
                      onClick={() => handleDelete(staff.userID)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {isAddStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                {modalTitle}
              </h3>
            </div>

            {/* Modal Body with Scroll */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-130px)]">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      value={newStaff.username}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, username: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Role
                    </label>
                    <select
                      value={newStaff.role}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, role: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      value={newStaff.password}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, password: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={newStaff.firstName}
                        onChange={(e) =>
                          setNewStaff({
                            ...newStaff,
                            firstName: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={newStaff.lastName}
                        onChange={(e) =>
                          setNewStaff({ ...newStaff, lastName: e.target.value })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      value={newStaff.email}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, email: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Gender
                    </label>
                    <select
                      value={newStaff.gender}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, gender: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Address
                    </label>
                    <input
                      type="text"
                      value={newStaff.address}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, address: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newStaff.phoneNumber}
                      onChange={(e) =>
                        setNewStaff({
                          ...newStaff,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddStaffModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditStaffModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                Edit Staff Information
              </h3>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-130px)]">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    console.log("submit edit", selectedStaff);
                    const response = await axiosInstance.put(
                      `/users/update/${selectedStaff._id}`,
                      editStaffForm
                    );
                    console.log("select", response.data);
                    if (response.status === 200) {
                      setStaffUsers(
                        staffUsers.map((user) =>
                          user.userID === selectedStaff.userID
                            ? response.data.user
                            : user
                        )
                      );
                      setIsEditStaffModalOpen(false);
                      setSelectedStaff(null);
                    }
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStaff.username}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          username: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Role
                    </label>
                    <select
                      defaultValue={selectedStaff.role}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          role: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={editStaffForm.firstName}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          firstName: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedStaff.lastName}
                      onChange={(e) =>
                        setEditStaffForm({
                          ...editStaffForm,
                          lastName: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={selectedStaff.email}
                    onChange={(e) =>
                      setEditStaffForm({
                        ...editStaffForm,
                        email: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newStaff.password}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, password: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Gender
                  </label>
                  <select
                    defaultValue={selectedStaff.gender}
                    onChange={(e) =>
                      setEditStaffForm({
                        ...editStaffForm,
                        gender: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedStaff.address}
                    onChange={(e) =>
                      setEditStaffForm({
                        ...editStaffForm,
                        address: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={selectedStaff.phoneNumber}
                    onChange={(e) =>
                      setEditStaffForm({
                        ...editStaffForm,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>

                {/* Modal Footer */}
                <div className="border-t bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex justify-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditStaffModalOpen(false);
                        setSelectedStaff(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
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
    </div>
  );
};

export default ManageStaff;
