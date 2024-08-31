import {
  CrossIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  LockIcon,
  UserIcon,
} from "@/public/icons/icons";
import { adminLogin } from "@/redux/slice/adminloginSlice";
import { closeCredential } from "@/redux/slice/creadentialSlice";
import { Dialog } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const Login: React.FC = () => {
  const [seen, setSeen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const open = useSelector((state: any) => state.open.open);
  const type = useSelector((state: any) => state.open.type);
  const [login, setLogin] = useState({
    userId: "",
    password: "",
  });

  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitData = async (e:FormEvent<HTMLFormElement>) =>{
    try {
      e.preventDefault();
       const result = await dispatch<any>(adminLogin(login));
       console.log(result.payload);
       if(result.payload?.success){
        console.log(type)
        if(type === "Tutorial"){
          router.push("/admin-dashboard/seller-video/seller-dashboard")
        }else if(type === "Digital photography"){
          router.push("/admin-dashboard/seller-photography/photography-dashboard")
        }
        else if(type === "Digital Art and Music"){
          router.push("/admin-dashboard/seller-art/art-dashboard")
        }
       }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="w-[80vw] md:w-96 h-96 bg-[#20364b] p-4 rounded-sm">
          <div className="">
            <div className="flex justify-between items-baseline">
              <p className="text-2xl text-[#ddba4c]">Sign In</p>
              <div
                className="cursor-pointer"
                onClick={() => dispatch(closeCredential())}
              >
                <CrossIcon color="#ddba4c" width="20" height="20" />
              </div>
            </div>
            <hr className="my-5" />
            <form onSubmit={handleSubmitData} className="flex flex-col">
              <p className="text-slate-100">User ID</p>
              <div className="relative">
                <input
                  type="text"
                  name="userId"
                  value={login.userId}
                  onChange={handleInputData}
                  className="w-full h-12 my-3 bg-[#33526f] pl-10 text-slate-100  rounded-full outline-none"
                />
                <div className="absolute top-6 left-3">
                  <UserIcon color="#ddba4c" width="20" height="20" />
                </div>
              </div>

              <p className="text-slate-100">Password</p>
              <div className="relative">
                <input
                  name="password"
                  value={login.password}
                  onChange={handleInputData}
                  type={seen ? "text" : "password"}
                  className="w-full h-12 my-3 bg-[#33526f] pl-10 text-slate-100  rounded-full outline-none"
                />
                <div className="absolute top-6 left-3">
                  <LockIcon color="#ddba4c" width="20" height="20" />
                </div>
                <div
                  className="absolute top-6 right-3 cursor-pointer"
                  onClick={() => setSeen(!seen)}
                >
                  {!seen ? (
                    <EyeOpenIcon color="#ddba4c" width="20" height="20" />
                  ) : (
                    <EyeCloseIcon color="#ddba4c" width="20" height="20" />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#ddba4c] my-3 h-12 rounded-full text-xl font-semibold"
              >
                {" "}
                Submit
              </button>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};
