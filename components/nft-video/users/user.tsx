import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useUserBlockUnblockMutation,
} from "../../../redux/api/adminApiSlice";
import EditUser from "./editUser";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { ThreeDotVertical } from "../../utils/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";
import NoDataImage from "../../../public/NoData.png";
import { CircularProgress } from "@mui/material";
import { fetchAllUsers } from "@/redux/slice/tutorial/getAllUserSlice";

interface Address {
  aboutMe: string;
  city: string;
  address: string;
  country: string;
  postalCode: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  address: Address | null;
  isBlocked: boolean;
}

const User: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const dispatch = useDispatch();
  const { data, isLoading, isFetching } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [blockUnblockUser] = useUserBlockUnblockMutation();

  const callApiToFetchAllUsers = async () => {
    setLoading(true); 
    const result = await dispatch<any>(fetchAllUsers());
    if (result.payload?.success) {
      setUsers(result.payload?.data?.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    callApiToFetchAllUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleActionClick = (userId: string) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  const handleBlockUser = async (userId: string) => {
    try {
      const user = users.find((user) => user._id === userId);
      if (!user) return;
      await blockUnblockUser(userId).unwrap();
      setUsers(
        users.map((u) =>
          u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setSelectedUser(null);
  };

  const handleSaveEdit = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-video/seller-dashboard"); // Adjust the path as necessary
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.postalCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.address?.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address?.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedFilteredUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  return (
    <div className="mt-5 mx-3">
      <div className="flex justify-between mb-2">
        <span className="ml-2" onClick={handleNavigate}>
          <button onClick={handleNavigate}>
            <ArrowLeftIcon width="24" height="24" color="white" />
          </button>
        </span>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className={`px-3 py-2 rounded-md border focus:outline-none`}
          style={{ background: colors.cardBg, color: colors.text }}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <table
            className={`w-full text-sm text-left rtl:text-right dark:text-gray-400 ${
              isDarkEnabled ? "bg-[#0E1A49]" : "bg-gray-50 text-gray-500"
            }`}
          >
            <thead
              className={`text-xs uppercase ${
                isDarkEnabled
                  ? "bg-[#0E1A49] text-[#D3D3D3]"
                  : "bg-gray-100 text-gray-700"
              } `}
            >
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                        isDarkEnabled
                          ? "bg-[#0E1A49]"
                          : "bg-gray-50 text-gray-700 "
                      }`}
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Postal Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Block Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={9} className="text-start md:text-center py-6">
                  <CircularProgress />
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table
            className={`w-full text-sm text-left rtl:text-right dark:text-gray-400 ${
              isDarkEnabled ? "bg-[#0E1A49]" : "bg-gray-50 text-gray-500"
            }`}
          >
            <thead
              className={`text-xs uppercase ${
                isDarkEnabled
                  ? "bg-[#0E1A49] text-[#D3D3D3]"
                  : "bg-gray-100 text-gray-700"
              } `}
            >
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                        isDarkEnabled
                          ? "bg-[#0E1A49]"
                          : "bg-gray-50 text-gray-700 "
                      }`}
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  City
                </th>
                <th scope="col" className="px-6 py-3">
                  Postal Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Country
                </th>
                <th scope="col" className="px-6 py-3">
                  Block Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedFilteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-6">
                    <img
                      src={NoDataImage.src}
                      alt="No Data"
                      className="mx-auto"
                      style={{ width: "150px" }}
                    />
                    <p>No users found</p>
                  </td>
                </tr>
              ) : (
                paginatedFilteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-${user._id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor={`checkbox-${user._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      {user.address?.city || "N/A"}
                    </td>
                    <td className="px-6 py-3">
                      {user.address?.postalCode || "N/A"}
                    </td>
                    <td className="px-6 py-3">
                      {user.address?.address || "N/A"}
                    </td>
                    <td className="px-6 py-3">
                      {user.address?.country || "N/A"}
                    </td>
                    <td className="px-6 py-3">
                      {user.isBlocked ? "Blocked" : "Active"}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => handleActionClick(user._id)}
                        className={`px-4 py-2 rounded ${
                          isDarkEnabled
                            ? "bg-blue-600 text-white"
                            : "bg-blue-200 text-black"
                        }`}
                      >
                        <ThreeDotVertical
                          width="24"
                          height="24"
                          color={isDarkEnabled ? "white" : "black"}
                        />
                      </button>
                      {selectedUser === user._id && (
                        <div className="mt-2">
                          <button
                            onClick={() => handleBlockUser(user._id)}
                            className={`px-4 py-2 rounded ${
                              user.isBlocked ? "bg-green-500" : "bg-red-500"
                            } text-white`}
                          >
                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="px-4 py-2 ml-2 rounded bg-yellow-500 text-white"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Previous
        </button>
        <span className="self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Next
        </button>
      </div>
      {editingUser && (
        <EditUser
          user={editingUser}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default User;
