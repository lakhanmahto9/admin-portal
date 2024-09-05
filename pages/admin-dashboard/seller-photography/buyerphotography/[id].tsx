import { BuyerPhotography } from "@/components/photography/buyer-photography/buyerphotography";
import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import WithAuth from "@/components/utils/with-auth";

import React from "react";

const Buyerphotography: React.FC = () => {
  return (
    <PhotographyLayout>
      <BuyerPhotography />
    </PhotographyLayout>
  );
};
export default WithAuth(Buyerphotography);
