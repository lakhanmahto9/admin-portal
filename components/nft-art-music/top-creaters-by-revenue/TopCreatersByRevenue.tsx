import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "./Card"; // Import the Card component
import BASE_URL from "@/baseUrl";
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { useThemeColors } from "@/components/utils/useThemeColor";

// Define TypeScript interfaces for the creator data
interface Creator {
  creatorId: string;
  creatorName: string;
  creatorEmail: string;
  creatorPic?: string;
  totalSale: number;
  totalRevenue: number;
}

interface TopCreatorsResponse {
  topCreatorsByRevenue: Creator[];
}

const TopCreatorsByRevenue: React.FC = () => {
  const [topCreators, setTopCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCardsCount, setVisibleCardsCount] = useState<number>(10); // Default to show 10 cards
  const router = useRouter()

 const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
 const colors = useThemeColors(darkModeEnable);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TopCreatorsResponse>(`${BASE_URL}/admin/top-creators-on-the-basis-of-number-of-sale-and-total-revenue`);
        setTopCreators(response.data.topCreatorsByRevenue);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  const filteredCreators = topCreators.filter((creator) =>
    creator.creatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.creatorEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCardsCount(visibleCardsCount + 10); // Increase the number of visible cards
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-art/art-dashboard")
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mx-2">
        <button onClick={handleNavigate}>
          <ArrowLeftIcon
            width="24"
            height="24"
            color="#000000"
          />
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2  rounded"
          style={{background:colors.cardBg,color:colors.text}}
        />
      </div>
      <div className="w-full flex flex-wrap">
        {filteredCreators.slice(0, visibleCardsCount).map((creator) => (
          <Card key={creator.creatorId} content={creator} />
        ))}
      </div>
      {visibleCardsCount < filteredCreators.length && (
        <div className="flex justify-center items-start mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopCreatorsByRevenue;
