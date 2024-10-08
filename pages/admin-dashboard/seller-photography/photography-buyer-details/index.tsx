import { AllBuyerDetails } from "@/components/photography/buyer-details/buyer-details";
import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import WithAuth from "@/components/utils/with-auth";

import React from "react";

const BuyerDetials: React.FC = () => {
  return (
    <PhotographyLayout>
      <AllBuyerDetails />
    </PhotographyLayout>
  );
};
export default WithAuth(BuyerDetials);
