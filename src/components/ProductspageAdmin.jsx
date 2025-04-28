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
import { Button } from "./ui/button";
import { SquarePlus, Trash2 } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { deleteProduct, getAllProducts } from "../lib/Products";
import { BeatLoader } from "react-spinners";

export const ProductspageAdmin = () => {
  const user = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ProductTodelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteMdelOpen, setIsDeleteMdelOpen] = useState(false);


  useEffect(()=>{
   
     gett()
  },[])

  const gett=async()=>{
    setLoading(true)
    try {
    const data= await getAllProducts({limit:10})
    setProducts(data)
   
    } catch (error) {
      console.error(error)
    }finally{
    setLoading(false)

    }
   }
   

   const confirmToDelete= async()=>{
     if(!ProductTodelete) return
     try {
      setIsDeleting(true)
      await deleteProduct(ProductTodelete.id)
      setProducts(products.filter(pro=> pro.id !== ProductTodelete.id))
     } catch (error) {
      console.error(error)
     }finally{
      setIsDeleting(false)
     }

     setProductToDelete(null)
   }
//  console.log(products)



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
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="px-5 flex flex-col">
        {/* top */}
        <div className="flex justify-between items-center my-4 gap-3 flex-wrap sm:px-5 rounded-lg">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl sm:text-3xl font-medium text-gray-800">
              All Products
            </h1>
            <p className="text-sm text-gray-500">
              Manage your store’s products here — add, edit, or remove listings
              easily.
            </p>
          </div>
          <NavLink to="/admin/addProduct">
            <Button className={"px-9 cursor-pointer flex items-center"}>
              <SquarePlus className="" /> Add New Product
            </Button>
          </NavLink>
        </div>
        <div className="flex flex-col gap-12 py-7  sm:px-5 sm:border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 ">
            <span className=" border-b text-2xl font-bold text-gray-900">
              Total Products
            </span>
            <span
              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full 
             hover:bg-blue-200 transition-all duration-300 ease-in-out cursor-pointer"
            >
              {products.length}
            </span>
          </div>

          {
            loading ? (
              <div className="flex items-center justify-center py-20">
            <div className=" animate-spin rounded-full border-b-2 border-orange-700 w-12 h-12"></div>
          </div>
            ):(<>
              <div className="overflow-x-auto shadow-md rounded-lg ">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs"
                  >
                    Published
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider text-xs"
                  >
                    Stock
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right font-semibold text-gray-600 uppercase tracking-wider text-xs"
                  >
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
               {
                products.length >0 &&(
                  products.map(p=>(
                    <tr key={p.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-xs flex items-center gap-2">
                      <img src={p.thumnail_image[0].publicUrl} alt="img" className="w-11 h-11 rounded-md"/>
                      <span className="hover:underline cursor-pointer">{p.title}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-xs">
                      ${p.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-xs">
                      {p.publish?'published':'unpublished'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-xs">
                      {p.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`${p.id}`} className="mr-3 text-black   transition-colors duration-200 text-xs px-5 py-1 rounded shadow-sm">
                        Edit
                      </Link>
                      <button
                       onClick={()=>setProductToDelete(p)}
                      className="text-white bg-black hover:bg-gray-900 transition-colors duration-200 text-xs px-4 py-1 rounded shadow-sm cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                  ))
                )
               }

                {/* Repeat <tr> for more products */}
              </tbody>
            </table>
          </div>
            </>)
          }

          {/* table */}
          
        </div>
      </div>



    </SidebarInset>
    
      {/* model delete */}
      {ProductTodelete&& <div className="absolute inset-0 flex items-center justify-center z-100 bg-black/50 text-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadeIn">
          <div className="">
            {/* <div className="flex justify-center mb-4">
              <div className="bg-red-100 text-red-600 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div> */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-gray-500 mb-6">This action cannot be undone. This will permanently delete the item.</p>
            <div className="flex justify-end gap-4 text-sm">
              <button
              onClick={()=> setProductToDelete(null)}
                className="px-6 py-2 cursor-pointer text-gray-700 rounded-md hover:bg-gray-200 transition"
                // onClick={onClose}
              >
                Cancel
              </button>
              <button
                className=" flex items-center px-5 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700 transition"
                onClick={confirmToDelete}
              >
                 {isDeleting ? (
              <BeatLoader color="#bbb" loading={true} size={10} />
            ) : (
              <>
              <Trash2 className="w-5 mr-2"/> Yes, Delete
              </>
            )}
              </button>
            </div>
          </div>
        </div>
      </div>
  }
  </>
  );
};
