import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { signUp } from "../lib/Auth";
import { Navigate } from "react-router";
import { CheckCircle } from 'lucide-react';
import toast from "react-hot-toast";


export default function SignUpPage() {
  const [loading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // signUp function
  const onSubmit = async({email, password, username}) => {
    setIsLoading(true)
     try {
       await signUp(email, password, username)
       toast.success('Account created!')
       setSuccess(true)
      //  window.location.reload();
     } catch (error) {
      console.error('signup error:', error)
     }finally{
      setIsLoading(false)
     }
  };
 
  if(success){
    return (
      <div className="flex items-center justify-center min-h-[300px]">
      <div className="bg-white p-6 rounded-lg  text-center animate-fade-in">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Account Created!</h2>
        <p className="text-gray-500 mb-4">Your account has been successfully created.</p>
        <span
          to="/signin"
          className="inline-block px-4 py-2 text-green-600  rounded transition duration-300"
        >
          Go to Sign In
        </span>
      </div>
    </div>
    )
  }
    
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-gray-600 mt-2">
        Create a new account
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        Join us at <span className="font-medium text-black">E-Shope</span> and
        start shopping today!
      </p>

      <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
        {/* inputs */}
        <div className="flex flex-col">
          {/* username */}
          <div className="mb-4">
            <label htmlFor="username" className="text-sm text-gray-500">
              Username
            </label>
            <Input
              type="text"
              {...register("username", {
                required: "username is required",
              })}
              placeholder="John.."
              id="username"
              className={`rounded-sm focus:ring-2 focus:ring-gray-700 py-2 ${
                errors?.username && "border-2 border-red-300"
              }`}
            />
            {errors?.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          {/* email */}
          <div className="mb-4">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <Input
              type="email"
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

          {/* password */}
          <div className="mb-6">
            <label htmlFor="password" className="text-sm text-gray-500">
              Password
            </label>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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

          {/* comfirm password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-sm text-gray-500">
              Confirm Password
            </label>
            <Input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              type="password"
              placeholder=""
              id="confirmPassword"
              className={`rounded-sm focus:ring-2 focus:ring-gray-700 py-2 ${
                errors?.confirmPassword && "border-2 border-red-300"
              }`}
            />
            {errors?.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* button */}
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
