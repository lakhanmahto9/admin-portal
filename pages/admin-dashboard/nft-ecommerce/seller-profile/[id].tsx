import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import SellerProfile from "@/components/nft-ecommerce/sellers/sellerProfile";
import WithAuth from "@/components/utils/with-auth";
import React from "react";

const sellerDetails: React.FC = () => {
  return (
    <EcommerceLayout>
      <SellerProfile />
    </EcommerceLayout>
  );
};
export default WithAuth(sellerDetails);
