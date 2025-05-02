import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  progress: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
  done: "bg-green-100 text-green-800",
};

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
import { getAllArticles } from "../lib/Order";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Package } from "lucide-react";
import { Link } from "react-router";
import supabase from "../lib/supabase";

export const OrdersPageAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sateloading, setSateLoading] = useState(false);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const data = await getAllArticles();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };
  // console.log(orders);



  
//   if(loading){
//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
//         </div>
//     )
// }


const onStatusChange=async(id, value)=>{
  //  console.log({id, value})
   setSateLoading(true)

   try {


    const {data,er}=await supabase.from('orders')
    .update({status:value})
    .eq('id', id)


    if(er) throw er

    setOrders(pre=> pre.map(p=> p.id == id ? {...p, status:value} :p))
   } catch (error) {
    console.error(error)
   }finally{
    setSateLoading(false)
   }
}


  return (
    <>
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
                <BreadcrumbPage>Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {
        loading ?(
          <div className="min-h-[500px] flex items-center justify-center">
          <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
         </div>
        ):(
          <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" rounded-lg shadow-md border border-gray-200 bg-white p-6 w-full"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            All Orders
          </h2>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto text-sm ">
              <thead className="bg-gray-100 border-b border-gray-200 ">
                <tr>
                  <th className="text-left p-3 text-gray-500 text-xs sm:text-sm font-semibold">
                    Order Title
                  </th>
                  <th className="text-left p-3 text-gray-500 text-xs sm:text-sm font-semibold">
                    Created At
                  </th>
                  <th className="text-left p-3 text-gray-500 text-xs sm:text-sm font-semibold">
                    Status
                  </th>
                  <th className="text-left p-3 text-gray-500 text-xs sm:text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    whileHover={{ scale: 1.01 }}
                    className="border-b transition duration-300"
                  >
                    <td className="p-3 text-gray-800 font-medium flex items-center text-gray-400 ">
                      {" "}
                      <Package className="text-gray-700 mr-3" />
                      <Link to={`${order.id}`}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>{order.city}</TooltipTrigger>
                          <TooltipContent>
                            <p>view this order</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      </Link>
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
  
                    <td className="p-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                          statusColors[order.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="progress">In Progress</option>
                        <option value="rejected">Rejected</option>
                        <option value="done">Done</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        )
      }
    </SidebarInset>
        {
          sateloading && (
            <div className="min-h-screen flex items-center justify-center  bg-black/17 absolute inset-0 z-200">
            <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
           </div>
          )
        }
        </>
  );
};
