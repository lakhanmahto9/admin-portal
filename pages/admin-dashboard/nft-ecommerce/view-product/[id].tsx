import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import WithAuth from "@/components/utils/with-auth";
import React from "react";
import ViewProduct from "@/components/nft-ecommerce/products/viewProduct";

const viewProduct: React.FC = () => {
  return (
    <EcommerceLayout>
      <ViewProduct />
    </EcommerceLayout>
  );
};
export default WithAuth(viewProduct);
