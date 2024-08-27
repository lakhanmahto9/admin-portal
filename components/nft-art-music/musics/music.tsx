import React, { useState } from "react";
import Card from "./card";
import { useGetAllArtsAndMusicsQuery } from "@/redux/api/adminApiSlice"; // Adjust the path as necessary
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router"; // For navigation

const Music: React.FC = () => {
  const { data, error, isLoading } = useGetAllArtsAndMusicsQuery(undefined, { refetchOnMountOrArgChange: true });
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  if (isLoading) {
    return <div className={`mt-20 ml-3  ${darkModeEnable ? "text-white" : "text-black"}`}>Loading...</div>;
  }

  if (error) {
    return <div className={`mt-20 ml-3 ${darkModeEnable ? "text-white" : "text-black"}`}>Error fetching data</div>;
  }

  const contents = data?.data?.musics || [];

  const filteredContents = contents.filter((item:any) =>
    item.artName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.price.toString().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    router.push("/admin-dashboard/seller-art/art-dashboard");
  };

  return (
    <div className={`mt-5`}>
      <div className="flex items-center justify-between ml-1 mb-4">
        <button onClick={handleBack}>
          <ArrowLeftIcon
            width="24"
            height="24"
            color="#ffffff"
          />
        </button>
        <input
          type="text"
          placeholder="Search by field names"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`px-3 py-2 rounded-md border focus:outline-none  ${
            darkModeEnable
              ? "bg-[#0e1a49] text-white"
              : "bg-white  text-gray-800"
          }`}
        />
      </div>
      <div className="w-full flex flex-wrap">
        {filteredContents.length > 0 ? (
          filteredContents.map((item:any) => <Card item={item} key={item._id} />)
        ) : (
          <div className="w-full flex justify-center items-center mt-20">
            <div className={`card m-4 w-72 h-72 flex flex-col rounded-lg shadow-lg overflow-hidden relative p-2 ${darkModeEnable ? "bg-[#0E1A49] text-white" : "bg-white text-black"}`}>
              <img src="/NoData.png" alt="No Data Found" className="w-full h-48 object-cover" />
              <div className="p-4 text-center">
                <p className="text-xl font-semibold">No Data Found</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
