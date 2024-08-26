import React from "react";

export const PhotographyHeader : React.FC = () =>{
    return(
        <div className="relative w-full mr-2">
      <div className="fixed z-50 border rounded-2xl px-2 w-[92%] lg:w-[78%]  flex justify-between items-center h-20 mt-5">
        <div className="text-[#fff]">
          <p>Welcome To</p>
          <p>Admin Dashboard</p>
        </div>
        <div className="flex gap-4">
        <div className="block lg:hidden">
            {/* <Drawerpage /> */}
          </div>
          <div>
            {" "}
            {/* <SettingIcon color="white" height="20" width="20" /> */}
          </div>
          {/* <div onClick={openNotificaion}><BellIcon color="#fff" height="20" width="20" /></div> */}
        </div>
      </div>
    </div>
    )
}