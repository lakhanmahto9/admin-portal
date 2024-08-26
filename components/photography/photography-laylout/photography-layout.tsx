import React, { ReactNode } from "react";
import { PhotographyHeader } from "../photography-header/photography-header";
import { PhotographySidebar } from "../photography-sidebar/photography-sidebar";

interface PhotographyLayoutProps{
    children:ReactNode;
}
export const PhotographyLayout : React.FC<PhotographyLayoutProps> = ({children}) =>{
    return(
      <div className="relative flex w-full min-h-screen ">
      <div
        className="fixed top-0 left-0 w-full"
        style={{
          height: "43vh",
          // background: "#070a68",
          background:"#025f92",
          // background:useSellerThemeColors(isDarkEnabled).layoutbg,
          zIndex: 0,
        }}
      ></div>
      <div
        className="fixed bottom-0 left-0 w-full"
        style={{
          height: "59vh",
          background: "#f4f6f8",
          zIndex: 0,
        }}
      ></div>
      <div className="w-1/5 z-10 fixed hidden lg:block">
        <PhotographySidebar />
      </div>
      <div className="w-full px-4 lg:w-4/5 z-10 ml-auto">
        <div className="mb-28">
          <PhotographyHeader />
        </div>
        {children}
      </div>
      <div className="fixed bottom-4 right-8 z-20 w-14 h-14 rounded-full bg-slate-200 shadow-2xl flex justify-center items-center">
        {/* <SettingIcon color="" width="24" height="24" /> */}
      </div>
      {/* <div>{modal && <OpenModal />}</div> */}
    </div>
    )
}