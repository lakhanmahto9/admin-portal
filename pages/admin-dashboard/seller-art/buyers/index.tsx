import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import Buyer from "@/components/nft-art-music/buyers/buyer";


const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      <Buyer />
    </ArtLayout>
  );
};
export default ArtDashboard;
