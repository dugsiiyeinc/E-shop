import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { SquarePlus } from "lucide-react";
import { Link, NavLink } from "react-router";

export const ProductspageAdmin = () => {
  return (
    <SidebarInset className="">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Welcome to E-shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="px-5 flex flex-col">
        {/* top */}
        <div className="flex justify-between items-center my-4 gap-3 flex-wrap">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl sm:text-3xl font-medium text-gray-800">
              All Products
            </h1>
            <p className="text-sm text-gray-500">
              Manage your store’s products here — add, edit, or remove listings
              easily.
            </p>
          </div>
          <NavLink to='/admin/addProduct' >
            <Button className={'px-9 cursor-pointer flex items-center'}><SquarePlus className=''/> Add New Product</Button>
          </NavLink>
        </div>
        <div className="flex flex-col gap-12"></div>
      </div>
    </SidebarInset>
  );
};
