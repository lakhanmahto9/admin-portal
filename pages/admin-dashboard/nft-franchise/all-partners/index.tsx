import React from "react";
import FranchiseLayout from "@/components/nft-franchise/franchise-layout/franchise-layout";
import WithAuth from "@/components/utils/with-auth";
import { AllPartners } from "@/components/nft-franchise/all-partners/allPartners";


const FranchisePage: React.FC = () => {
  return (
    <FranchiseLayout>
      <AllPartners />
    </FranchiseLayout>
  );
};
export default WithAuth(FranchisePage);
