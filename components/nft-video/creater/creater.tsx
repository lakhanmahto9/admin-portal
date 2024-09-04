import React, { useEffect, useState } from "react";
import { ThreeDotVertical } from "@/components/utils/icons";
import {
  useGetCreatorsQuery,
  useCreatorBlockUnblockMutation,
} from "../../../redux/api/adminApiSlice";
import EditCreator from "./editCreater"; // Adjust the path as necessary
import { useSelector,useDispatch } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { useThemeColors } from "@/components/utils/useThemeColor";
import NoDataImage from "../../../public/NoData.png";
import { CircularProgress } from "@mui/material";
import { fetchAllCreaters } from "@/redux/slice/tutorial/getAllCreatersSlice";

interface Address {
  aboutMe: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface Creator {
  _id: string;
  name: string;
  email: string;
  address: Address | null;
  isBlocked: boolean;
}

const Creater: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [creators, setCreators] = useState<Creator[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<Creator | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const darkModeEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnabled);
  const dispatch = useDispatch();
  // const { data, isLoading, isFetching } = useGetCreatorsQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });
  // console.log(data);
  const [blockUnblockCreator] = useCreatorBlockUnblockMutation();

  const callApiToFetchAllCreaters = async () => {
    setLoading(true); 
    const result = await dispatch<any>(fetchAllCreaters())
    // console.log(result.payload.data)
    if (result.payload?.success) {
      setCreators(result?.payload?.data?.creators);
      // setFilteredBuyers(result?.payload?.data?.buyers);
    }
    setLoading(false);
  }
  useEffect(() => {
    callApiToFetchAllCreaters();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = creators.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(creators.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleActionClick = (userId: string) => {
    setSelectedUser(selectedUser === userId ? null : userId);
  };

  const handleBlockUser = async (userId: string) => {
    try {
      const user = creators.find((user) => user._id === userId);
      if (!user) return;
      await blockUnblockCreator(userId).unwrap();
      setCreators(
        creators.map((u) =>
          u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  const handleEditUser = (user: Creator) => {
    setEditingUser(user);
    setSelectedUser(null);
  };

  const handleSaveEdit = (updatedUser: Creator) => {
    setCreators(
      creators.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setEditingUser(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-video/seller-dashboard");
  };

  // Filter users based on search term
  const filteredUsers = creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.address?.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creator.address?.postalCode
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      creator.address?.address
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      creator.address?.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-5">
      <div className="flex justify-between mb-2">
        <span className="ml-2">
          {" "}
          <button onClick={handleNavigate}>
            <ArrowLeftIcon width="24" height="24" color="white" />
          </button>
        </span>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          style={{ background: colors.cardBg, color: colors.text }}
        />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                City
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
            {loading ? (
              <tr>
                <td colSpan={9} className="text-center py-6">
                  <div className="flex items-start md:justify-center md:items-center h-full">
                    <CircularProgress />
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
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
                    {user.address?.city || "N/A"}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.address?.postalCode || "N/A"}
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
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => handleActionClick(user._id)}
                      className={`font-medium hover:underline ${
                        darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                      }`}
                    >
                      <ThreeDotVertical
                        width="16"
                        height="16"
                        color={darkModeEnabled ? "white" : "black"}
                      />
                    </button>
                    {selectedUser === user._id && (
                      <div
                        className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg z-10 `}
                        style={{
                          background: colors.background,
                          color: colors.text,
                        }}
                      >
                        <button
                          onClick={() => handleBlockUser(user._id)}
                          className={`block px-4 py-2 text-sm w-full hover:bg-blue-400 rounded-2xl `}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                        <button
                          onClick={() => handleEditUser(user)}
                          className={`block px-4 py-2 text-sm w-full hover:bg-blue-400 rounded-2xl `}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-6">
                  <img
                    src={NoDataImage.src}
                    alt="No Data Found"
                    className="mx-auto mb-4"
                    style={{ width: "300px", height: "300px" }}
                  />
                  <p
                    className={`text-lg ${
                      darkModeEnabled ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    No data found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav
          className={`flex flex-col items-center sm:flex-row sm:justify-center gap-5 pt-4 ${
            darkModeEnabled ? "bg-[#0E1A49]" : "bg-gray-100"
          }`}
          aria-label="Table navigation"
        >
          <span
            className={`text-sm font-normal text-gray-500 dark:text-gray-400 ml-3 mb-3 ${
              darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
            }`}
          >
            Showing{" "}
            <span
              className={`font-semibold ${
                darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
              }`}
            >
              {indexOfFirstUser + 1}-
              {indexOfLastUser > creators.length
                ? creators.length
                : indexOfLastUser}
            </span>{" "}
            of{" "}
            <span
              className={`font-semibold ${
                darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
              }`}
            >
              {creators.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8 mb-3 mr-3">
            <li>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  darkModeEnabled
                    ? "text-white bg-[#423FD3] hover:bg-[#280f96]"
                    : "text-blue-600  hover:bg-blue-100 hover:text-blue-700"
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === index + 1
                      ? darkModeEnabled
                        ? "text-white bg-[#423FD3] hover:bg-[#280f96]"
                        : "text-blue-600  hover:bg-blue-100 hover:text-blue-700"
                      : darkModeEnabled
                      ? "text-gray-400 bg-blue-800 hover:bg-[#280f96] hover:text-white"
                      : "text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  darkModeEnabled
                    ? "text-white bg-[#423FD3] hover:bg-[#280f96]"
                    : "text-blue-600  hover:bg-blue-100 hover:text-blue-700"
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <EditCreator
              creator={editingUser}
              onSave={handleSaveEdit}
              onCancel={() => setEditingUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Creater;
