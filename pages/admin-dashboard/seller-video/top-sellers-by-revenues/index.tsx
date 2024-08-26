import React from "react";
import VideoLayout from "@/components/nft-video/vidoe-laylout/vidoe-layout";
import TopSellersByRevenue from "@/components/nft-video/top-sellers-by-revenues/TopSellersByRevenue";

const SellersByTotalSalePage: React.FC = () => {
  return (
    <VideoLayout>
      <TopSellersByRevenue />
    </VideoLayout>
  );
};
export default SellersByTotalSalePage;
