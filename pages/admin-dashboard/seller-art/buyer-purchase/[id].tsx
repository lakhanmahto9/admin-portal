import React from "react";
import ArtLayout from "@/components/nft-art-music/art-layout/art-layout";
import { BuyerPurchaseList } from "@/components/nft-art-music/buyer-purchase/buyerPurchase";


const BuyerPurchasePage: React.FC = () => {
  return (
    <ArtLayout>
      <BuyerPurchaseList />
    </ArtLayout>
  );
};
export default BuyerPurchasePage;
