import React, { useEffect, useState } from "react";
import { ThreeDotVertical } from "../../utils/icons";
import {
  useGetSellersQuery,
  useSellerBlockUnblockMutation,
} from "../../../redux/api/adminApiSlice";
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import Modal from "./modal";
import { useThemeColors } from "@/components/utils/useThemeColor";

interface Address {
  aboutMe: string;
  address: string;
  state: string;
  country: string;
  pincode: string;
  idCard: string;
}

interface Seller {
  _id: string;
  name: string;
  email: string;
  address: Address | null;
  isBlocked: boolean;
}

const Seller: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<Seller | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);
  const router = useRouter();

  const darkModeEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnabled);

  const { data } = useGetSellersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(data, "data ===");
  const [blockUnblockSeller] = useSellerBlockUnblockMutation();

  useEffect(() => {
    if (data) {
      setSellers(data.data.sellers);
    }
  }, [data]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sellers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sellers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleActionClick = (userId: string) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  const handleBlockUser = async (userId: string) => {
    try {
      const user = sellers.find((user) => user._id === userId);
      if (!user) return;
      await blockUnblockSeller(userId).unwrap();
      setSellers(
        sellers.map((u) =>
          u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  const handleEditUser = (user: Seller) => {
    setEditingUser(user);
    setSelectedUser(null);
  };

  const handleSaveEdit = (updatedUser: Seller) => {
    setSellers(
      sellers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-art/art-dashboard");
  };

  const handleView = (user: Seller) => {
    setSelectedIdCard(user.address?.idCard || null);
    setShowModal(true);
  };

  // Filter users based on search term
  const filteredUsers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.address?.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.address?.pincode
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      seller.address?.address
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      seller.address?.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="ml-2">
            {" "}
            <button onClick={handleNavigate}>
              <ArrowLeftIcon width="24" height="24" color="#ffffff" />
            </button>
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className={`px-3 py-2 rounded-md border focus:outline-none  ${
              darkModeEnabled
                ? "bg-[#0e1a49] text-[#D3D3D3]"
                : "bg-gray-200 text-gray-800"
            }`}
          />
        </div>
        <table
          className={`w-full text-sm text-left rtl:text-right dark:text-gray-400 ${
            darkModeEnabled ? "bg-[#0E1A49]" : "bg-gray-50 text-gray-500"
          }`}
        >
          <thead
            className={`text-xs uppercase ${
              darkModeEnabled
                ? "bg-[#0E1A49] text-[#D3D3D3]"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                      darkModeEnabled
                        ? "bg-[#0E1A49]"
                        : "bg-gray-50 text-gray-700"
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
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Postal code
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className={`border-b dark:border-gray-700 dark:hover:bg-gray-600 ${
                    darkModeEnabled
                      ? "bg-[#0E1A49] hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-slate-300"
                  }`}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${user._id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.name}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.email}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.address?.state || "N/A"}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.address?.pincode || "N/A"}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.address?.address || "N/A"}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.address?.country || "N/A"}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      user.isBlocked
                        ? darkModeEnabled
                          ? "text-red-400"
                          : "text-red-600"
                        : darkModeEnabled
                        ? "text-green-400"
                        : "text-green-600"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block text-left mr-5">
                      <button
                        onClick={() => handleActionClick(user._id)}
                        className={`font-medium hover:underline ${
                          darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                        }`}
                      >
                        <ThreeDotVertical
                          width="18"
                          height="18"
                          color={colors.text}
                        />
                      </button>
                      {selectedUser === user._id && (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-blue-900 ring-1 ring-black ring-opacity-5"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex={-1}
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={() => handleView(user)}
                              className="text-white block w-full text-left px-4 py-2 text-sm"
                              role="menuitem"
                              tabIndex={-1}
                              id="menu-item-0"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleBlockUser(user._id)}
                              className="text-white block w-full text-left px-4 py-2 text-sm"
                              role="menuitem"
                              tabIndex={-1}
                              id="menu-item-1"
                            >
                              {user.isBlocked ? "Unblock" : "Block"}
                            </button>
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-white block w-full text-left px-4 py-2 text-sm"
                              role="menuitem"
                              tabIndex={-1}
                              id="menu-item-2"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <img
                      src="/NoData.png"
                      alt="No data found"
                      className="w-80 h-80"
                    />
                    <p className="text-gray-500 mt-4">No data found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          idCard={selectedIdCard}
        />
        <div
          className="flex justify-center gap-5 items-center mt-4 pb-5"
          style={{ background: colors.cardBg }}
        >
          <div
            className="p-2 rounded-md"
            style={{ color: colors.text, background: colors.cardBg }}
          >
            Showing {indexOfFirstUser + 1} to{" "}
            {indexOfLastUser > sellers.length
              ? sellers.length
              : indexOfLastUser}{" "}
            of {sellers.length} entries
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                    index + 1 === currentPage
                      ? "  text-gray-500 hover:bg-gray-50"
                      : " text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;
