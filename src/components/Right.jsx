import React, { useEffect, useState } from "react";
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

import { motion } from "framer-motion";
import { ShoppingCart, Users, Package } from "lucide-react";
import  DashboardPage  from "./Chart";
import supabase from "../lib/supabase";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import dayjs from "dayjs";
import { Link } from "react-router";


export const Right = () => {
    const [data,setData]=useState([])
    const [Products,setProducts]=useState([])
    const [users,setUsers]=useState([])
    const [orders, setOrders] = useState([]);

useEffect(()=>{
  getAllData()
  fetchLatestOrders()
},[])

const getAllData = async () => {
    try {
      const { data: products } = await supabase
      .from("products")
      .select("*")

      const { data: orders } = await supabase
        .from("orders")
        .select("*")

        const { data: users } = await supabase
        .from("users")
        .select("*")
      
      setProducts(products)
      setData(orders)
      setUsers(users)
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }

  }


  const fetchLatestOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "done")
      .order("created_at", { ascending: false })
      .limit(5); // Get latest 5

    if (error) console.error("Error fetching latest orders", error);
    else setOrders(data);
  };

  console.log(orders)
  return (
    // <div className='w-full min-h-full'>
    <SidebarInset className="">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full  mx-auto mt-8 px-4">
        {/* Total Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black/16 rounded-xl text-gray-900 p-6 shadow-md hover:shadow-lg transition min-h-[130px]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Total Products</h3>
              <p className="text-3xl font-bold mt-1">{Products.length}</p>
            </div>
            <Package className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-black/16 rounded-xl text-gray-900 p-6 shadow-md hover:shadow-lg transition min-h-[130px]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold mt-1">{data.length}</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Total Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/16 rounded-xl text-gray-900 p-6 shadow-md hover:shadow-lg transition min-h-[130px]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Total Users</h3>
              <p className="text-3xl font-bold mt-1">{users.length}</p>
            </div>
            <Users className="w-10 h-10 text-white" />
          </div>
        </motion.div>
      </div>

      <div className="w-full">
        <DashboardPage className='w-full'/>
      </div>

      <div className="py-6 px-4 max-h-[800px] overflow-y-auto">
      <h1 className="text-lg font-semibold mb-2">Latest Orders</h1>
      <Table>
        <TableCaption>Recently completed sales</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Order ID</TableHead>
            <TableHead className="w-[200px]">Address</TableHead>
            <TableHead className="w-[300px]">Ordered Person name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No recent sales
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <Link to={`orders/${order.id}`}>
                <TableCell className="font-medium">INV-{order.id}</TableCell>
                </Link>
                
                <TableCell className="font-medium">{order.address}</TableCell>
                <TableCell className="font-medium">{order.name}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{dayjs(order.created_at).format("MMM D, YYYY")}</TableCell>
                <TableCell className="text-right">${order.total_price}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    </SidebarInset>
    // </div>
  );
};
