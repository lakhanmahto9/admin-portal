import { PhotographyLayout } from "@/components/photography/photography-laylout/photography-layout";

import TopSellers from "@/components/photography/top-sellers/topSellers";
import WithAuth from "@/components/utils/with-auth";
import React from "react";

const topSellers: React.FC = () => {
  return (
    <PhotographyLayout>
      <TopSellers />
    </PhotographyLayout>
  );
};
export default WithAuth(topSellers);
