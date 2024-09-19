import EcommerceLayout from "@/components/nft-ecommerce/ecommerce-layout/ecommerce-layout";
import WithAuth from "@/components/utils/with-auth";
import React from "react";
import CategoriesTransaction from "@/components/nft-ecommerce/ecommerce-dashboard/categories-transaction";


const transactionDetails: React.FC = () => {
  return (
    <EcommerceLayout>
      <CategoriesTransaction />
    </EcommerceLayout>
  );
};
export default WithAuth(transactionDetails);
