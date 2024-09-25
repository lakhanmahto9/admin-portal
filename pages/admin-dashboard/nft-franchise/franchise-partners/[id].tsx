import React from "react";
import FranchiseLayout from "@/components/nft-franchise/franchise-layout/franchise-layout";
import WithAuth from "@/components/utils/with-auth";
import { FranchisePartnersList } from "@/components/nft-franchise/franchise-partners/franchisePartners";


const FranchisePartnersPage: React.FC = () => {
  return (
    <FranchiseLayout>
      <FranchisePartnersList />
    </FranchiseLayout>
  );
};
export default WithAuth(FranchisePartnersPage);
