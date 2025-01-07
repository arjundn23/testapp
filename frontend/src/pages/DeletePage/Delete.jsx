import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useDeactivateUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import useUserData from "../../hooks/useUserData";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const fieldCss =
  "border border-gray-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500";

const Delete = () => {
  const { data: fetchedUsers, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [deactivateUser, { isLoading: isDeactivatingUser }] =
    useDeactivateUserMutation();
  const { data: userData, error: userError } = useUserData();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userError) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate, userError, dispatch, userData]);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    role: "all", // "all", "admin", "user"
    status: "all", // "all", "active", "inactive"
  });

  useEffect(() => {
    // Fetch data when the component mounts
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchedUsers && userData) {
      setUsers(fetchedUsers);
    }
    if (isLoading) {
      toast.info("Loading users data...", { autoClose: 2000 });
    } else if (error) {
      toast.error("Error Retrieving Users", { autoClose: 2000 });
    }
    if (fetchedUsers) {
      toast.dismiss();
    }
  }, [fetchedUsers, isLoading, error, userData]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully", { autoClose: 2000 });
    } catch (err) {
      toast.error("Error Deleting User", { autoClose: 2000 });
      console.log(err);
    }
  };

  const handleDeactivate = async (id, currentStatus) => {
    try {
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isActive: !currentStatus } : user
        )
      );

      await deactivateUser(id).unwrap();
      toast.success(
        `User ${currentStatus ? "Activated" : "Deactivated"} successfully`,
        { autoClose: 2000 }
      );
    } catch (err) {
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isActive: currentStatus } : user
        )
      );
      toast.error("Error Updating User", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    if (users && userData?._id) {
      const filtered = users.filter((user) => {
        console.log(user);
        const matchesUsername = user.username
          .toLowerCase()
          .includes(filters.username.toLowerCase());
        const matchesEmail = user.email
          .toLowerCase()
          .includes(filters.email.toLowerCase());
        const matchesRole =
          filters.role === "all" ||
          (filters.role === "admin" && user.isAdmin) ||
          (filters.role === "user" && !user.isAdmin);
        const matchesStatus =
          filters.status === "all" ||
          (filters.status === "active" && user.isActivated) ||
          (filters.status === "inactive" && !user.isActivated);

        const isExcluded = user._id === userData._id;

        return (
          matchesUsername &&
          matchesEmail &&
          matchesRole &&
          matchesStatus &&
          !isExcluded
        );
      });

      setFilteredUsers((prevFilteredUsers) => {
        if (JSON.stringify(prevFilteredUsers) !== JSON.stringify(filtered)) {
          return filtered;
        }
        return prevFilteredUsers;
      });
    }
  }, [users, filters, userData]);

  return (
    <div className="flex h-screen overflow-hidden font-poppins bg-gradient-to-r from-white to-gray-100">
      {/* Sidebar */}
      <Sidebar activeLink={"Delete"} />

      {/* Main Content */}
      <main className="flex-grow bg-white shadow-lg rounded-lg py-8 px-4 sm:px-6 lg:px-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-orange-500">
          User Management
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <input
            type="text"
            placeholder="Filter by Username"
            className={`${fieldCss} w-full sm:w-1/3 lg:w-1/6`}
            value={filters.username}
            onChange={(e) =>
              setFilters({ ...filters, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Filter by Email"
            className={`${fieldCss} w-full sm:w-1/3 lg:w-1/6`}
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
          <select
            className={`${fieldCss} w-full sm:w-1/3 lg:w-1/6`}
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select
            className={`${fieldCss} w-full sm:w-1/3 lg:w-1/6`}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          {/* Table for medium and larger screens */}
          <table className="hidden md:table table-auto w-full bg-white">
            <thead>
              <tr className="bg-orange-500 text-white sticky top-0">
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-base">
                  Username
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-base">
                  Email
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-base">
                  Role
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-base">
                  Status
                </th>
                <th className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-base">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-100 text-xs sm:text-sm md:text-base"
                >
                  <td className="p-2 sm:p-4">{user.username}</td>
                  <td className="p-2 sm:p-4">{user.email}</td>
                  <td className="p-2 sm:p-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-white ${
                        user.isAdmin ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4">
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-white ${
                        user.isActive ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {user.isActive ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4 flex flex-wrap gap-2">
                    <button
                      className="px-3 sm:px-4 py-2 rounded shadow text-white bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                    <button
                      className={`px-3 sm:px-4 py-2 rounded shadow text-white ${
                        user.isActive
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                      onClick={() => handleDeactivate(user._id, user.isActive)}
                    >
                      {user.isActive ? "Activate" : "Deactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Block Layout for small screens */}
          <div className="block md:hidden">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="border rounded-lg shadow-md p-4 mb-4 bg-white"
              >
                <p className="text-sm font-bold text-gray-700">
                  Username:{" "}
                  <span className="font-normal text-gray-600">
                    {user.username}
                  </span>
                </p>
                <p className="text-sm font-bold text-gray-700">
                  Email:{" "}
                  <span className="font-normal text-gray-600">
                    {user.email}
                  </span>
                </p>
                <p className="text-sm font-bold text-gray-700 mt-3">
                  Role:{" "}
                  <span
                    className={`px-4 py-1 rounded-full text-white ${
                      user.isAdmin ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </p>
                <p className="text-sm font-bold text-gray-700 mt-3">
                  Status:{" "}
                  <span
                    className={`px-4 py-1 rounded-full text-white ${
                      user.isActive ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {user.isActive ? "Inactive" : "Active"}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className="px-3 py-2 rounded shadow text-white bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`px-3 py-2 rounded shadow text-white ${
                      user.isActive
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                    onClick={() => handleDeactivate(user._id, user.isActive)}
                  >
                    {user.isActive ? "Activate" : "Deactivate"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <p className="text-gray-500 mt-6 text-center text-lg">
            No users match the filters.
          </p>
        )}
      </main>
    </div>
  );
};

export default Delete;
