import { FranchiseDashboard } from "@/components/nft-franchise/franchise-dashboard/franchise-dashboard";
import FranchiseLayout from "@/components/nft-franchise/franchise-layout/franchise-layout";
import WithAuth from "@/components/utils/with-auth";
import React from "react";

const FranchiseDashboardPage: React.FC = () => {
  return (
    <FranchiseLayout>
      <FranchiseDashboard />
    </FranchiseLayout>
  );
};
export default WithAuth(FranchiseDashboardPage);
