import { BuyerProfile } from "@/components/photography/phbuyer/buyerDetails";
import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import WithAuth from "@/components/utils/with-auth";

import React from "react";

const buyerDetails: React.FC = () => {
  return (
    <PhotographyLayout>
      <BuyerProfile />
    </PhotographyLayout>
  );
};
export default WithAuth(buyerDetails);
