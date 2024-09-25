import React from "react";
import FranchiseLayout from "@/components/nft-franchise/franchise-layout/franchise-layout";
import WithAuth from "@/components/utils/with-auth";
import { PartnersProfile } from "@/components/nft-franchise/partners-profile/partnersProfile";


const PartnersProfilePage: React.FC = () => {
  return (
    <FranchiseLayout>
      <PartnersProfile />
    </FranchiseLayout>
  );
};
export default WithAuth(PartnersProfilePage);
