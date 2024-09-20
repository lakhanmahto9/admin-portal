import React from "react";
import FranchiseLayout from "@/components/nft-franchise/franchise-layout/franchise-layout";
import WithAuth from "@/components/utils/with-auth";
import { FranchiseDetails } from "@/components/nft-franchise/franchise/franchise";


const FranchisePage: React.FC = () => {
  return (
    <FranchiseLayout>
      <FranchiseDetails />
    </FranchiseLayout>
  );
};
export default WithAuth(FranchisePage);
