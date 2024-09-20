import React from "react";
import FranchiseLayout from "@/components/nft-franchise/franchise-layout/franchise-layout";
import WithAuth from "@/components/utils/with-auth";
import { FranchiseProfile } from "@/components/nft-franchise/franchise-profile/franchiseProfile";


const ProfilePage: React.FC = () => {
  return (
    <FranchiseLayout>
      <FranchiseProfile />
    </FranchiseLayout>
  );
};
export default WithAuth(ProfilePage);
