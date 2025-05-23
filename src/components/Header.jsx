import React, { useState } from "react";
import { NavLink } from "react-router";
import { Link } from "react-router";
import { SearchComponent } from "./SearchComponent";
import { IoCartOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, Menu, Truck, User, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuth } from "../Context/AuthContext";

export const Header = () => {

  const {user, isLogged, profile, logOutFun, cartLength}=useAuth()
  // console.log(user)
  // console.log(profile)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Herder
    <div className=" border-b border-gray-300 relative">
      <div className="max-w-7xl mx-auto py-3 px-2">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div>
            <Link
              to={"/"}
              className="text-gray-950 text-xl sm:text-2xl font-bold cursor-pointer"
            >
              E-SHOP
            </Link>
          </div>

          {/*descktop menu */}

          <div className=" hidden md:flex items-center space-x-6 sm:space-x-9 text-sm">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 border-b-2   py-1 transition duration-300 ease-in-out  border-gray-800 hover:text-gray-800 font-medium"
                  : "text-gray-800 hover:text-gray-900 font-medium   py-1"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 border-b-2  border-gray-800 hover:text-gray-800 font-medium   py-1 transition duration-300 ease-in-out"
                  : "  py-1 text-gray-800 hover:text-gray-900 font-medium"
              }
            >
              All-Products
            </NavLink>

            <NavLink
              to={"/blogs"}
              className={({ isActive }) =>
                isActive
                  ? "  py-1 text-gray-700 border-b-2  border-gray-800 hover:text-gray-800 font-medium transition duration-300 ease-in-out"
                  : "text-gray-800   py-1   hover:text-gray-900 font-medium"
              }
            >
              Blogs
            </NavLink>

            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 border-b-2  border-gray-800   py-1 hover:text-gray-800 font-medium transition duration-300 ease-in-out"
                  : "text-gray-800 hover:text-gray-900 font-medium   py-1"
              }
            >
              Contact
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-700 border-b-2  border-gray-800 hover:text-gray-800 font-medium   py-1 transition duration-300 ease-in-out"
                  : "text-gray-800 hover:text-gray-900 font-medium   py-1"
              }
            >
              About
            </NavLink>
          </div>

          {/* right side */}
          <div className="flex justify-between sm:justify-center items-center space-x-4 sm:space-x-6">
            <SearchComponent />
            <div className="flex items-center text-sm">
              {isLogged ? (
                <div className="flex items-center space-x-3">
                  <Link to={"/cart"} className="relative">
                    <IoCartOutline className="text-xl text-gray-500" />
                    <div className="absolute -top-1 -right-2 w-4 h-4 rounded-full text-xs text-center bg-rose-600 text-white">
                     {cartLength}
                    </div>
                  </Link>

                <div className="hidden md:flex">
                <DropdownMenu >
                    <DropdownMenuTrigger className="cursor-pointer">
                      <Avatar>
                        <AvatarImage src={profile?.avatar_url||"https://github.com/shadcn.png" }/>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[200px]">
                      <DropdownMenuLabel className="cursor-pointer">
                        {profile?.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="cursor-pointer hover:bg-gray-200" />
                      {profile?.role ==='admin' ? (
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200  ">
                          <Link className="flex items-center" to={'/admin'}>
                          <LayoutDashboard className="mr-2"  /> Admin
                          </Link>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
                         <Link className="flex" to={'/userProfile'}>
                         <User className="mr-2" /> Profile
                         </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-200">
                        <Link to={'/userProfile/orders'} className="flex  items-center"><Truck className="mr-2"/> My Orders</Link>
                      </DropdownMenuItem>
                     <Link to={'/auth'}>
                     <DropdownMenuItem onClick={()=> {logOutFun()}} className="cursor-pointer bg-red-50 hover:bg-red-100 text-red-500">
                        <LogOut className="text-red-500" /> Logout
                      </DropdownMenuItem>
                     </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                </div>
              ) : (
                <Link to={"/auth"}>
                  <Button
                    className={
                      "hidden md:flex bg-amber-500 text-white cursor-pointer hover:bg-amber-600"
                    }
                  >
                    Sign in
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* humberger */}
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className=" flex md:hidden focus:ring-gray-300 focus:ring-1 rounded cursor-pointer text-gray-600"
          >
            {!isMobileMenuOpen ? <Menu /> : <X />}
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={` block md:hidden overflow-y-auto absolute top-14 right-0 left-0 overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "h-[400px]" : "h-0"
        } bg-gray-50 shadow-lg z-50`}
      >

        {/* user Profile */}
       {
        isLogged && (
          <div className="py-3 px-6 flex flex-col gap-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-4" className={'border-b-3 border-gray-400'}>
              <AccordionTrigger >
                <div className="flex items-center space-x-4 ">
                  
                  <img src={profile?.avatar_url ||'https://github.com/shadcn.png'} alt="profile img" className="w-9 h-9 rounded-full object-cover"/>
                  <span className="text-sm text-gray-700">{profile?.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
               {
                profile?.role ==='admin'?(
                  <Link to={'/admin'} className="flex items-center px-6 text-gray-700">
                  <LayoutDashboard className="mr-2 w-5"/>
                   <span className="font-medium">Admin</span>
                </Link>
                ):(
                  <Link to={'/userProfile'} className="flex items-center px-6 text-gray-700">
                  <User className="mr-2 w-5"/>
                   <span className="font-medium">Profile</span>
                </Link>
                )
               }
              </AccordionContent>
              <AccordionContent>
              <Link className="flex items-center px-6 text-gray-700">
              <Truck className="mr-2 w-5"/>
              <span className="font-medium">My Orders</span>
              </Link>
              </AccordionContent>
              <AccordionContent>
              <Link to={"/auth"} className="cursor-pointer bg-red-50 hover:bg-red-100 text-red-500 flex items-center px-6 py-1 rounded-md">
              <LogOut className="text-red-500 mr-2 w-5" /> <span>Logout</span>
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        )
       }

       {/* links */}
        <div className="py-4 px-8 flex flex-col gap-3 border-t">
        <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-700 text-lg  py-1 transition duration-300 ease-in-out  font-medium"
                  : "text-gray-800 hover:text-gray-900 font-medium   py-1"
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-700 text-lg font-medium   py-1 transition duration-300 ease-in-out"
                  : "  py-1 text-gray-800 hover:text-gray-900 font-medium"
              }
            >
              All-Products
            </NavLink>

            <NavLink
              to={"/blogs"}
              className={({ isActive }) =>
                isActive
                  ? "  py-1 text-orange-700 text-lg font-medium transition duration-300 ease-in-out"
                  : "text-gray-800   py-1   hover:text-gray-900 font-medium "
              }
            >
              Blogs
            </NavLink>

            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-700 text-lg font-medium transition duration-300 ease-in-out"
                  : "text-gray-800 hover:text-gray-900 font-medium   py-1"
              }
            >
              Contact
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-700 text-lg font-medium   py-1 transition duration-300 ease-in-out"
                  : "text-gray-800 hover:text-gray-900 font-medium   py-1"
              }
            >
              About
            </NavLink>
            {
              !isLogged && (
               <>
                 <Link to={"/auth"}>
                  <Button
                    className={
                      "inline-flex w-full bg-amber-500 text-white cursor-pointer hover:bg-amber-600"
                    }
                  >
                    Sign in
                  </Button>
                </Link>
               </>
              )
            }
        </div>
      </div>
    </div>
  );
};
