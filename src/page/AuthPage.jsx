import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigingPage from "../components/SigingPage";
import SignUpPage from "../components/SignUpPage";

export const AuthPage = () => {
  return (
    <div className="min-h-[80vh] w-full flex flex-col sm:items-center  justify-center ">
        <div className="flex flex-col p-2">
         {/* <h2 className=" items-start my-5 text-2xl sm:text-3xl font-bold text-gray-700">Authentication</h2> */}
      <div className="min-w-full sm:min-w-md   ">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className='w-full bg-gray-200 h-10'>
            <TabsTrigger value="account" className='p-2 cursor-pointer'>SignIn</TabsTrigger>
            <TabsTrigger value="password" className='p-2 cursor-pointer'>SignUp</TabsTrigger>
          </TabsList>
          <div className=" rounded-md border border-gray-200 p-3">
          <TabsContent value="account" className='w-full'>
             <SigingPage />
          </TabsContent>
          <TabsContent value="password"><SignUpPage 
          /></TabsContent>
          </div>
        </Tabs>
      </div>
        </div>
     
    </div>
  );
};
