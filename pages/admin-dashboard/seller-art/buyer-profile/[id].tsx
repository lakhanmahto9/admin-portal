import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import { BuyerProfile } from "@/components/nft-art-music/buyer-profile/buyerProfile";


const BuyerProfilePage: React.FC = () => {
  return (
    <ArtLayout>
      <BuyerProfile />
    </ArtLayout>
  );
};
export default BuyerProfilePage;
