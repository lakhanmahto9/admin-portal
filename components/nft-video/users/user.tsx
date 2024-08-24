import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useUserBlockUnblockMutation,
} from "../../../redux/api/adminApiSlice";
import EditUser from "./editUser"; 
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { ThreeDotVertical } from "../../utils/icons";
import { useThemeColors } from "@/components/utils/useThemeColor";

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
  const router = useRouter()

  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);

  const { data } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [blockUnblockUser] = useUserBlockUnblockMutation();
//   const darkModeEnabled = useSelector(selectDarkMode);

  useEffect(() => {
    if (data) {
      setUsers(data.data.users);
    }
  }, [data]);

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
      // Optionally, refetch users to get the updated list
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
    router.push("/nft-admin/dashboard"); // Adjust the path as necessary
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
    <div className="mt-16 mx-3 lg:ml-72">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="ml-2" onClick={handleNavigate}>
            {" "}
            <button onClick={handleNavigate}>

            <ArrowLeftIcon
                width="24"
                height="24"
                color={isDarkEnabled ? "#ffffff" : "#000000"}
              />
            </button>
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className={`px-3 py-2 rounded-md text-gray-800 dark:text-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDarkEnabled
                ? "bg-gray-900 placeholder-gray-400"
                : "bg-gray-200 placeholder-gray-600"
            }`}
          />
        </div>

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
            {paginatedFilteredUsers.map((user) => (
              <tr
                key={user._id}
                className={`border-b dark:border-gray-700 dark:hover:bg-gray-600 ${
                  isDarkEnabled
                    ? "bg-[#0E1A49] hover:bg-blue-600 "
                    : "bg-gray-100 text-gray-700 hover:bg-slate-300 "
                }`}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${user._id}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-red-400 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${user._id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td
                  scope="row"
                  className={`px-6 py-4 font-medium whitespace-nowrap dark:text-white ${
                    isDarkEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                  }`}
                >
                  {user.name}
                </td>
                <td
                  className={`px-6 py-4 ${
                    isDarkEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                  }`}
                >
                  {user.email}
                </td>

                <td
                  className={`px-6 py-4 ${
                    isDarkEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                  }`}
                >
                  {user.address?.city || "N/A"}
                </td>

                <td
                  className={`px-6 py-4 ${
                    isDarkEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                  }`}
                >
                  {user.address?.postalCode || "N/A"}
                </td>
                <td
                  className={`px-6 py-4 ${
                    isDarkEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                  }`}
                >
                  {user.address?.address || "N/A"}
                </td>

                <td
                  className={`px-6 py-4 ${
                    isDarkEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                  }`}
                >
                  {user.address?.country || "N/A"}
                </td>
                <td
                  className={`px-6 py-4 ${
                    user.isBlocked
                      ? isDarkEnabled
                        ? "text-red-500"
                        : "text-red-800"
                      : isDarkEnabled
                      ? "text-green-500"
                      : "text-green-800"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => handleActionClick(user._id)}
                      className="p-2 text-gray-500 rounded-full hover:text-gray-700 focus:outline-none focus:text-gray-700"
                    >
                      <ThreeDotVertical width="16" height="16" color="black" />
                    </button>
                    {selectedUser === user._id && (
                      <div className="absolute right-0 z-10 w-40 py-2 mt-2 bg-white rounded-md shadow-xl">
                        <button
                          onClick={() => handleBlockUser(user._id)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && <EditUser  user={editingUser} onSave={handleSaveEdit} onCancel={handleCancelEdit} />}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default User;

