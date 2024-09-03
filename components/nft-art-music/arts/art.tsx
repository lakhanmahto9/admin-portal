import React, { useState, useEffect } from "react";
import Card from "./card"; // Adjust the path as necessary
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router"; // For navigation
import { ArrowLeftIcon } from "../../utils/icons";
import { getAllArtMusicByCategory } from "@/redux/slice/getAllArtMusicByCategorySlice";

interface ArtContent {
  _id: string;
  artThumbnail: string;
  artName: string;
  name: string;
  price: number;
  description: string;
  bidding: boolean;
  copyright: boolean;
}

const Art: React.FC = () => {
  const dispatch = useDispatch();
  const [arts, setArts] = useState<ArtContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [visibleCardsCount, setVisibleCardsCount] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const router = useRouter(); // Initialize history for navigation

  const callApiTofetchAllArtMusic = async () => {
    setLoading(true); // Start loading
    try {
      const result = await dispatch<any>(getAllArtMusicByCategory());
      if (result.payload?.success) {
        setArts(result?.payload?.data?.arts);
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

  // Filter arts based on the search query
  const filteredArts = arts.filter((art) => {
    const query = searchQuery.toLowerCase();
    return (
      art.artName.toLowerCase().includes(query) ||
      art.description.toLowerCase().includes(query) ||
      art.name.toLowerCase().includes(query) ||
      art.price.toString().includes(query) // Convert price to string for comparison
    );
  });

  const handleShowMore = () => {
    setVisibleCardsCount((prevCount) => prevCount + 24);
  };

  // Handle navigation to the previous page
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
          <p className="text-lg font-semibold text-white">Loading...</p>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-1 justify-center">
          {filteredArts.length > 0 ? (
            filteredArts.slice(0, visibleCardsCount).map((art) => (
              <Card key={art._id} content={art} />
            ))
          ) : (
            <div className="text-center py-8">
              <Card
                content={{
                  _id: "no-data-found",
                  artThumbnail: "", // You can add a placeholder image if necessary
                  artName: "No data found",
                  name: "",
                  price: 0,
                  description: "Try a different search term.",
                  bidding: false,
                  copyright: false,
                }}
              />
            </div>
          )}
        </div>
      )}
      {!loading && visibleCardsCount < filteredArts.length && (
        <div className="flex justify-center items-start">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
            onClick={handleShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Art;
