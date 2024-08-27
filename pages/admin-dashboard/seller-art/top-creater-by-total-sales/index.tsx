
import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import TopCreatorsByTotalSale from "@/components/nft-art-music/top-creater-by-total-sales/topCreaterByTotalSales";


const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      <TopCreatorsByTotalSale />
    </ArtLayout>
  );
};
export default ArtDashboard;
