import { PhBuyer } from "@/components/photography/phbuyer/phbuyer";
import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";
import WithAuth from "@/components/utils/with-auth";

import React from "react";

const AllPhBuyer: React.FC = () => {
  return (
    <PhotographyLayout>
      <PhBuyer />
    </PhotographyLayout>
  );
};
export default WithAuth(AllPhBuyer);
