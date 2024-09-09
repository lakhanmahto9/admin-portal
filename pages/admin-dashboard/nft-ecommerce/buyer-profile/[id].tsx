import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import BuyerProfile from "@/components/nft-ecommerce/buyers/buyerProfile";

import WithAuth from "@/components/utils/with-auth";

import React from "react";

const buyerDetails: React.FC = () => {
  return (
    <EcommerceLayout>
      <BuyerProfile />
    </EcommerceLayout>
  );
};
export default WithAuth(buyerDetails);
