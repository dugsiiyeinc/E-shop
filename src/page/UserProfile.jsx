import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router";
import { useAuth } from "../Context/AuthContext";

export const UserProfile = () => {
const  [userName, setUserName]=useState('')
  const {user, profile, loading}=useAuth()

  useEffect(()=>{
   if(profile){
    setUserName(profile.name)
   }
  },[])


  if(loading){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
        </div>
    )
}

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col py-8 sm:py-26 px-4 max-w-7xl mx-auto relative">

        {/* top */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-400 border-b-2   py-1 transition duration-300 ease-in-out  border-gray-800 hover:text-gray-800 font-medium"
                  : "text-gray-500 hover:text-gray-900   py-1 font-light"
              }
            >
              Home
            </NavLink>

            <span>/</span>
            <NavLink
              to={"/userProfile"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700  hover:text-gray-800 font-medium   py-1 transition duration-300 ease-in-out"
                  : "  py-1 text-gray-700 hover:text-gray-900 font-medium"
              }
            >
              My Account
            </NavLink>
          </div>

          <div className="hidden sm:flex flex-col items-center">
          {/* <img src={profile?.Avatar_url ||'https://github.com/shadcn.png'} alt="profile img" className="w-12 h-12 rounded-full object-cover"/> */}
          <div className="flex items-center text-sm space-x-2">
            <span>Welcome! </span> <span className="text-rose-600">{userName}</span>
          </div>
          </div>
        </div>

        {/* bottom */}
        <div className="flex items-start">
          {/* right */}
         <div>
         <div className="hidden sm:flex flex-col text-sm py-10  pr-5">
             <h2 className="text-sm sm:text-lg">Manage your Account</h2>
             <div className="px-4 py-2 flex flex-col">
             <NavLink
              to={"/userProfile"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700   py-1 transition duration-300 ease-in-out  hover:text-gray-800 font-medium"
                  : "text-gray-5700 hover:text-gray-900   py-1 font-light text-base"
              }
            >
              Profile
            </NavLink>

            <NavLink
              to={"orders"}
              className={({ isActive }) =>
                isActive
                ? "text-gray-700   py-1 transition duration-300 ease-in-out  hover:text-gray-800 font-medium"
                  : "text-gray-5700 hover:text-gray-900   py-1 font-light text-base"
              }
            >
              Orders
            </NavLink>
             </div>
          </div>
         </div>

         <div className="flex-1  py-18">
             
           <Outlet/>
          
         </div>
        </div>


          {/* mobile menu */}
        <div className=" shadow-lg max-w-[300px] p-3 rounded-lg bg-white border border-gray-200 mx-auto z-50 flex justify-center space-x-7 items-center   sm:hidden fixed bottom-20 right-0 left-0 ">

        <NavLink
              to={"/userProfile"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700   transition duration-300 ease-in-out  hover:text-gray-800 font-medium"
                  : "text-gray-5700 hover:text-gray-900    font-light text-base"
              }
            >
              Profile
            </NavLink>

            <NavLink
              to={"orders"}
              className={({ isActive }) =>
                isActive
                ? "text-gray-700    transition duration-300 ease-in-out  hover:text-gray-800 font-medium"
                  : "text-gray-5700 hover:text-gray-900    font-light text-base"
              }
            >
              Orders
            </NavLink>

        </div>
      </div>
    </div>
  );
};
