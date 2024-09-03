import React, { useState, useEffect } from "react";
import Card from "./card";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { getAllArtMusicByCategory } from "@/redux/slice/getAllArtMusicByCategorySlice";

interface ArtContent {
  _id: string;
  musicThumbnail: string;
  artName: string;
  name: string;
  price: number;
  description: string;
  bidding: boolean;
  copyright: boolean;
}

const Music: React.FC = () => {
  const dispatch = useDispatch();
  const [musics, setMusics] = useState<ArtContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [searchQuery, setSearchQuery] = useState("");

  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const router = useRouter();

  const callApiTofetchAllArtMusic = async () => {
    setLoading(true); // Start loading
    try {
      const result = await dispatch<any>(getAllArtMusicByCategory());
      if (result.payload?.success) {
        setMusics(result?.payload?.data?.musics);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    callApiTofetchAllArtMusic();
  }, []);

  const filteredContents = musics.filter(
    (item: any) =>
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
          <ArrowLeftIcon width="24" height="24" color="#ffffff" />
        </button>
        <input
          type="text"
          placeholder="Search by field names"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`px-3 py-2 rounded-md border focus:outline-none ${
            darkModeEnable ? "bg-[#0e1a49] text-white" : "bg-white text-gray-800"
          }`}
        />
      </div>
      {loading ? ( // Show loading indicator
        <div className="w-full flex justify-center items-center mt-20">
          <p className="text-xl font-semibold text-white">Loading...</p>
        </div>
      ) : filteredContents.length > 0 ? (
        <div className="w-full flex flex-wrap">
          {filteredContents.map((item: any) => (
            <Card item={item} key={item._id} />
          ))}
        </div>
      ) : (
        // No Data Found section
        <div className="w-full flex justify-center items-center mt-20">
          <div
            className={`card m-4 w-72 h-72 flex flex-col rounded-lg shadow-lg overflow-hidden relative p-2 ${
              darkModeEnable ? "bg-[#0E1A49] text-white" : "bg-white text-black"
            }`}
          >
            <img
              src="/NoData.png"
              alt="No Data Found"
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <p className="text-xl font-semibold">No Data Found</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
