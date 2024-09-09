
import { Box, Drawer } from "@mui/material";
import React from "react";
import EcommerceSidebar from "../../ecommerce-sidebar/ecommerce-sidebar";
import { MenuIcon } from "@/public/icons/icons";



export const Drawerpage: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" onClick={toggleDrawer(false)}>
      <EcommerceSidebar />
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
