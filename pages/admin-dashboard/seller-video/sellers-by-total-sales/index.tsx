import React from "react";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import SellersByTotalSale from "@/components/nft-video/sellers-by-total-sales/SellersByTotalSale";

const SellersByTotalSalePage: React.FC = () => {
  return (
    <VideoLayout>
      <SellersByTotalSale />
    </VideoLayout>
  );
};
export default SellersByTotalSalePage;
