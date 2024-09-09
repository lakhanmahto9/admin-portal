import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import { Profile } from "@/components/photography/profile/profile";
import WithAuth from "@/components/utils/with-auth";

import React from "react";

const Photographyprofile: React.FC = () => {
  return (
    <PhotographyLayout>
      <Profile />
    </PhotographyLayout>
  );
};
export default WithAuth(Photographyprofile);