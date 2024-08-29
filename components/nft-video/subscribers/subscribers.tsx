import React, { useEffect, useState } from "react";
import { usePaidUsersQuery } from "../../../redux/api/adminApiSlice";
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { useThemeColors } from "@/components/utils/useThemeColor";
import NoDataImage from "../../../public/NoData.png";

interface PaidUser {
  _id: string;
  name: string;
  email: string;
  courseName: string;
  purchaseDate: Date;
  price: number;
}

const Subscribers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [users, setUsers] = useState<PaidUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const { data, isLoading, isError } = usePaidUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const darkModeEnabled = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnabled);

  useEffect(() => {
    if (data) {
      setUsers(data.data.users);
    }
  }, [data]);

  const handleNavigate = () => {
    router.push("/seller-video/seller-dashboard");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.purchaseDate &&
        new Date(user.purchaseDate)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      user.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.price &&
        user.price
          .toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to the first page on search
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="mt-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            className={`px-3 py-2 rounded-md border focus:outline-none `}
            style={{ background: colors.cardBg, color: colors.text }}
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3">
                Purchase Date
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          {filteredUsers.length > 0 ? (
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className={`border-b dark:border-gray-700 ${
                    darkModeEnabled
                      ? "bg-[#0E1A49]"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <td
                    className={`px-6 py-4 font-medium whitespace-nowrap ${
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
                    {user.courseName}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.purchaseDate
                      ? new Date(user.purchaseDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "-"}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
                    }`}
                  >
                    {user.price
                      ? user.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
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
              {Math.min(indexOfLastUser, filteredUsers.length)}
            </span>{" "}
            of{" "}
            <span
              className={`font-semibold ${
                darkModeEnabled ? "text-[#D3D3D3]" : "text-gray-700"
              }`}
            >
              {filteredUsers.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8 mb-3">
            <li>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  darkModeEnabled
                    ? "text-white bg-[#423FD3] hover:bg-[#280f96]"
                    : "text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                        : "text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                      : darkModeEnabled
                      ? "text-gray-400 bg-blue-800 hover:bg-[#280f96] hover:text-white"
                      : "text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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
                    : "text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Subscribers;
