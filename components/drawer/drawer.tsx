import { MenuIcon } from "@/components/utils/icons";
import { Box, Drawer } from "@mui/material";
import React from "react";
// import SallerSidebar from "../sidebar/saller-sidebar";
import ArtSidebar from "../nft-art-music/art-sidebar/artSidebar";


export const Drawerpage: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <ArtSidebar />
    </Box>
  );
  return (
    <>
      <div>
        <div onClick={toggleDrawer(true)}>
          <MenuIcon color="#fff" height="20" width="20" />
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};
