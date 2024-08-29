import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Card from "./Card"; // Import the Card component
import { ArrowLeftIcon } from "../../utils/icons";
import { useRouter } from "next/router";
import { useThemeColors } from "@/components/utils/useThemeColor";

// Define TypeScript interfaces for the seller data
interface Seller {
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerPic?: string;
  totalSale: number;
  totalRevenue: number;
}

interface TopSellersResponse {
  topSellersBySales: Seller[];
}

const defaultPic = "https://via.placeholder.com/150"; // Default image URL

const SellersByTotalSale: React.FC = () => {
  const [topSellers, setTopSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCardsCount, setVisibleCardsCount] = useState<number>(10); // Default to show 10 cards
  const router = useRouter()

  const darkModeEnable = useSelector((state: any) => state.darkmode.dark);
  const colors = useThemeColors(darkModeEnable);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TopSellersResponse>("http://localhost:4000/admin/top-sellers-on-the-basis-of-number-of-sale-and-total-revenue");
        setTopSellers(response.data.topSellersBySales);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  const filteredSellers = topSellers.filter((seller) =>
    seller.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.sellerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCardsCount(visibleCardsCount + 10); // Increase the number of visible cards
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }


  const handleNavigate = () => {
    router.push("/admin-dashboard/seller-video/seller-dashboard")
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mx-2">
        <button onClick={handleNavigate}>
          <ArrowLeftIcon
            width="24"
            height="24"
            color="#ffffff"
          />
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`mb-4 p-2 border rounded `}
          style={{background:colors.cardBg}}
        />
      </div>
      <div className="w-full flex flex-wrap">
        {filteredSellers.slice(0, visibleCardsCount).map((seller) => (
          <Card key={seller.sellerId} content={seller} />
        ))}
      </div>
      {visibleCardsCount < filteredSellers.length && (
        <div className="flex justify-center items-start mt-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default SellersByTotalSale;
