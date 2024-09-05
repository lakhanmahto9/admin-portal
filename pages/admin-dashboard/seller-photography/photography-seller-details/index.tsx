import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import { PhotographySellerDetails } from "@/components/photography/seller-details/seller-details";
import WithAuth from "@/components/utils/with-auth";
import React from "react";

const PhotographyDashboard: React.FC = () => {
  return (
    <PhotographyLayout>
      <PhotographySellerDetails />
    </PhotographyLayout>
  );
};
export default WithAuth(PhotographyDashboard);
