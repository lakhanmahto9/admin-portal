import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import Seller from "@/components/nft-art-music/sellers/sellers";


const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      <Seller />
    </ArtLayout>
  );
};
export default ArtDashboard;
