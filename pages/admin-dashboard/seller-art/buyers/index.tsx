import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import Buyer from "@/components/nft-art-music/buyers/buyer";
import { AllBuyerDetails } from "@/components/nft-art-music/buyers/art-buyers";


const ArtDashboard: React.FC = () => {
  return (
    <ArtLayout>
      {/* <Buyer /> */}
      <AllBuyerDetails/>
    </ArtLayout>
  );
};
export default ArtDashboard;
