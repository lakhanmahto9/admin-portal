import { removeDark, setDark } from "@/redux/slice/darkModeSlice";
import { setFix } from "@/redux/slice/headerNavFixSlice";
import { setNavColor } from "@/redux/slice/sidebarNavColorSlice";
import { useRouter } from "next/router";

import { Stack, Switch, styled } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 20,
    height: 20,
    borderRadius: 12,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export const SettingModal: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state: any) => state.darkmode.dark);
  const fix = useSelector((state:any) => state.fix?.fix);

  const handleDarkMode = () => {
    dispatch(setDark());
  };
  const removeDarkMode = () => {
    dispatch(removeDark());
  };
  const gotosale = () =>{
    router.push("/admin-dashboard/seller-photography/photography-seller-details")
  }
  const gotodashboard = () =>{
    router.push("/admin-dashboard/seller-photography/photography-dashboard")
  }
  return (
    <div className="w-full h-full p-4 overflow-y-scroll">
      <div className="flex flex-col">
        <p className="text-xl text-[#384b6a] font-semibold">
          Dashboard Configurator
        </p>
        <p className="text-[#717d96]">See our dashboard options.</p>
      </div>
      <div className="py-4 mb-4">
        <p className="text-xl mb-2 text-[#384b6a]">Sidebar Colors</p>
        <div className="flex gap-2">
          <p
            className="w-6 h-6 rounded-full cursor-pointer bg-[#6a6be4] border transition-transform transform hover:scale-110 hover:border-black"
            onClick={() => dispatch(setNavColor("#eaedfc"))}
          ></p>
          <p
            className="w-6 h-6 rounded-full cursor-pointer bg-[#fff] border transition-transform transform hover:scale-110 hover:border-black"
            onClick={() => dispatch(setNavColor("#fff"))}
          ></p>
          <p
            className="w-6 h-6 rounded-full cursor-pointer bg-[#1194ef] border transition-transform transform hover:scale-110 hover:border-black"
            onClick={() => dispatch(setNavColor("#1194ef"))}
          ></p>
          <p
            className="w-6 h-6 rounded-full cursor-pointer bg-[#2dceb6] border transition-transform transform hover:scale-110 hover:border-black"
            onClick={() => dispatch(setNavColor("#2dceb6"))}
          ></p>
          <p
            className="w-6 h-6 rounded-full cursor-pointer bg-[#fb7c40] border transition-transform transform hover:scale-110 hover:border-black"
            onClick={() => dispatch(setNavColor("#fb7c40"))}
          ></p>
          <p
            className="w-6 h-6 rounded-full cursor-pointer bg-[#f54b48] border transition-transform transform hover:scale-110 hover:border-black"
            onClick={() => dispatch(setNavColor("#f54b48"))}
          ></p>
        </div>
        <div className="">
          <p className="text-[#384b6a] text-xl">Sidenav Type</p>
          <p className="text-[#717d96]">
            {" "}
            Choose between 2 different sidenav types.
          </p>
          <div className="flex justify-between mt-4 mb-8">
            <div className="h-10 w-36 cursor-pointer bg-[#7664e4] rounded-lg flex justify-center items-center">
              <p className="text-[#fff] font-semibold">White</p>
            </div>
            <div className="h-10 w-36 border cursor-pointer border-[#3520ed] rounded-lg flex justify-center items-center">
              <p className="text-[#3520ed] font-semibold">Dark</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="text-[#384b6a] text-lg">Nevbar fixed</p>
              <p>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AntSwitch
                    checked={fix}
                    inputProps={{ "aria-label": "ant design" }}
                    onChange={()=>dispatch(setFix(fix))}
                  />
                </Stack>
              </p>
            </div>
            <hr className="border-t border-gray-300 my-4" />
            <div className="flex justify-between">
              <p className="text-[#384b6a] text-lg">Light / Dark</p>
              <p>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AntSwitch
                    checked={isDarkEnabled}
                    onChange={isDarkEnabled ? removeDarkMode : handleDarkMode}
                    inputProps={{ "aria-label": "ant design" }}
                  />
                </Stack>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-8">
            <div onClick={gotodashboard} className="flex justify-center items-center cursor-pointer w-full h-10 bg-black text-white rounded-md">
              <p className="text-white font-semibold">Dashboard</p>
            </div>
            <div onClick={gotosale} className="flex justify-center items-center cursor-pointer w-full h-10 border border-[black] text-white rounded-md">
              <p className="text-[#384b6a] font-semibold">Sales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
