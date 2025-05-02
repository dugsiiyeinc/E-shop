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
import { Check, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import supabase from "../lib/supabase";

export const OrderDetails = () => {
 const [order, setOrder]=useState({data_items:[]})
 const {id}=useParams()
//  console.log(id)

 useEffect(()=>{
    fetchData()
 },[])

 const fetchData=async()=>{
   try {
     const {data}=await supabase
     .from('orders')
     .select("*")
     .eq('id',id)
     .single()

     console.log(data)
     setOrder(data)
   } catch (error) {
    console.error(error)
   }
 }
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
                    <BreadcrumbPage>Order Details</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>


          <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>

      {/* Billing Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Billing Info</h3>
          <p><strong>Full Name:</strong> {order.name || ''}</p>
          <p><strong>Company:</strong> {order.company_name || "N/A"}</p>
          <p><strong>Address:</strong> {order.streat}</p>
          <p><strong>Apartment:</strong> {order.apartment || "N/A"}</p>
          <p><strong>City:</strong> {order.city}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Email:</strong> {order.email}</p>
        </div>

        {/* Payment & Status */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment & Status</h3>
          {/* <p><strong>Method:</strong> {order.payment_method}</p> */}
          <p><strong>Coupon:</strong> {order.coupon || "None"}</p>
          <p><strong>Status:</strong>
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold 
              ${order.status === 'done' ? 'bg-green-100 text-green-700' : 
                order.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
              {order.status}
            </span>
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Products Ordered</h3>
        <ul className="space-y-3">
          {order.data_items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-3">
                <Link to={`/products/${item.product_id}`}>
                <img src={item.product_thumbnail} alt={'item.name'} className="w-12 h-12 object-cover rounded" />
                </Link>
                <span className="text-sm text-gray-800">{item.product_tittle}</span>
              </div>
              <span className="text-sm text-gray-700">{item.quant} of items</span>
              <span className="text-sm text-gray-700">${item.product_price}</span>
            </li>
          ))}
        </ul>
      </div>

   
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <div>
          <p><strong>Shipping:</strong> {order.shipping || "Free"}</p>
          <p className="text-lg font-bold"><strong>Total with discont:</strong> ${order.total_price - order.total_price/20 }</p>
        </div>
      </div>
    </motion.div>
          </SidebarInset>
  )
}
