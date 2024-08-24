import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import { PhotographySellerDetails } from "@/components/photography/seller-details/seller-details";
import React from "react";

const PhotographyDashboard: React.FC = () => {
  return (
    <PhotographyLayout>
      <PhotographySellerDetails />
    </PhotographyLayout>
  );
};
export default PhotographyDashboard;
