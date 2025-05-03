import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { signIn } from "../lib/Auth";
import {  useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";

export default function SigingPage() {
  const [success, setSuccess] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const {setProfile}=useAuth()

  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async({email, password}) => {
     setIsLoading(true)
    try {
     
      const data =await signIn(email, password)
      setProfile(data)
       setSuccess(true)
    } catch (error) {
      setSuccess(false)
      setError('login', {
        type: 'manual',
        message: 'Invalid login credentials, Please try again..',
      });
      
    }finally{
      setIsLoading(false)
    }
    
  };


  if(success){
    navigate('/')
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-gray-600  mt-2">
        Sign in to your account
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        Welcome back to <span className="font-medium text-black">E-Shope</span>!
      </p>
      {errors?.login && (
              <p className="px-2 py-1 bg-red-100  rounded-md text-sm text-red-600">{errors.login.message}</p>
       )}

      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        {/* inputs */}
        <div className="flex flex-col">
          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <Input
            type='email'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="X..@gmail.com"
              id="email"
              className={`rounded-sm focus:ring-2 focus:ring-gray-700 py-2 ${
                errors?.email && "border-2 border-red-300"
              }`}
            />
            {errors?.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-sm text-gray-500">
              Password
            </label>
            <Input
              {...register('password', { required: 'Password is required',   minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },})}
              type="password"
              placeholder=""
              id="password"
              className={`rounded-sm focus:ring-2 focus:ring-gray-700 py-2 ${
                errors?.password && "border-2 border-red-300"
              }`}
            />
            {errors?.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="items-start">
          <Button type="submit" className={"px-7 cursor-pointer"}>
            {loading ? (
              <BeatLoader color="#bbb" loading={true} size={10} />
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
