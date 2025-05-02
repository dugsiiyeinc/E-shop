import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { Trash2, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


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
import { getAllUsers } from '../lib/Users';
import { useAuth } from '../Context/AuthContext';
import { FiLoader, FiTrash2 } from 'react-icons/fi';
import supabase from '../lib/supabase';

export const Users = () => {
  const[loading, setLoading]=useState(false)
  const [users, setUsers]=useState([])
  const [UserToDelete, setUserToDelete]=useState(null)
  const [isDeleting, setIsDeleting]=useState(false)
  
  const {user}=useAuth()



    useEffect(() => {
      getOrder();
    }, []);
  
    const getOrder = async () => {
      try {
        const data = await getAllUsers(user.id);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false)
      }
    };
    console.log(users);
  

    const handleToDelete=async()=>{
      if(!UserToDelete) return
      setIsDeleting(true)
      try {
        const{data}=await supabase 
        .from('users')
        .delete()
        .eq('id', UserToDelete.id)
        setUsers(prev=>prev.filter(pre=> pre.id !== UserToDelete.id))
        setUserToDelete(null)
      } catch (error) {
        console.error(error)
      }finally{
      setIsDeleting(false)
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
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>

     <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Users</h2>
      {loading ? (
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-b-blue-600 border-t-white border-r-white border-l-white"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-md border border-gray-200 bg-white min-w-full overflow-x-auto"
        >
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 border-b border-gray-200 w-full">
              <tr>
                <th className="text-left p-3 text-gray-500 font-semibold">User</th>
                <th className="text-left p-3 text-gray-500 font-semibold">Joined At</th>
                <th className="text-left p-3 text-gray-500 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  className="border-b transition duration-300 w-full"
                >
                  <td className="p-3 flex items-center gap-3 text-gray-700">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name || "Unnamed"}</span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setUserToDelete(user)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
    </SidebarInset>
     {UserToDelete && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-100">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Comfirm Deletion
          </h3>
          <p className="mb-6  text-gray-600 font-medium">
            Are you sure you want to delete "
            {UserToDelete.name || "Untitled Article"}"? This action
            cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
             onClick={()=> setUserToDelete(null)}
            className=" cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Cancel
            </button>
            <button 
            onClick={handleToDelete}
            className="cursor-pointer px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors duration-200 flex items-center">
              {
                isDeleting ?(
                  <>
                   <FiLoader className=" animate-spin mr-2"/>
                   Deleting...
                  </>
                ):(
                  <>
                   <FiTrash2 className="mr-2"/>
                   Delete
                  </>
                )
              }
            </button>
          </div>
        </div>
      </div>
    )}
   </>
  );
}
