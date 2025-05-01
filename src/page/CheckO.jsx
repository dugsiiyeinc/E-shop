import React, { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { useAuth } from '../Context/AuthContext'
import { useForm } from 'react-hook-form'
import { checkOutOrder } from '../lib/Order'
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import supabase from '../lib/supabase'

export const CheckOut = () => {
 const {itemsToOrderProcess, setItemsToOrderProcess,user , setCartLength}=useAuth()
   const [Processing, setProcessing] = useState(false);
   const[sucess, setSuccess]=useState(false)

  let total =0

  if(!user){
    Navigate('/auth')
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    // console.log("Form Data:", data);

    if(!itemsToOrderProcess) return

    try {
      setProcessing(true)
      await checkOutOrder(data, user.id, itemsToOrderProcess, total)
      const {dat, er}=await supabase.from('cart_items')
      .delete()
      .eq('user_id', user.id)

      setItemsToOrderProcess([])
      reset()
      setCartLength(pre=> pre - 0)
      setSuccess(true)
    } catch (error) {
      console.error(error)
    }finally{
      setProcessing(false)
    }
  
  };


  const calculateTotal = () => {
    return itemsToOrderProcess.reduce((sum, item) => sum + (item.product_price * item.quant), 0);
  };
   total =calculateTotal()




   if(sucess){
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto mt-20 p-6 bg-green-50 border border-green-200 rounded-2xl shadow-lg text-center"
      >
        <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
        <h2 className="text-2xl font-bold text-green-700 mt-4">Order Successful!</h2>
        <p className="text-gray-700 mt-2">
          Thank you for your purchase. Your order has been placed successfully. We’ll notify you once it's shipped.
        </p>
        <div className="mt-6">
          <Link to={'/userProfile/orders'} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-all">
            Track Order
          </Link>
        </div>
      </motion.div>
    );
   }
  
  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">

    {/* Breadcrumb */}
    <div className="text-sm text-gray-500 mb-8">
      Account / My Account / Product / View Cart / <span className="text-black font-semibold">Checkout</span>
    </div>

    {/* Main Layout */}
    <div className="flex flex-col lg:flex-row gap-12">

      {/* Billing Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-8">Billing Details</h2>
        <form className="flex flex-col gap-6">
        <input
        type="text"
        placeholder="First Name *"
        {...register("firstName", { required: "First name is required" })}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />
      {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

      <input
        type="text"
        placeholder="Company Name"
        {...register("companyName")}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />

      <input
        type="text"
        placeholder="Street Address *"
        {...register("streetAddress", { required: "Street address is required" })}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />
      {errors.streetAddress && <p className="text-red-500 text-sm">{errors.streetAddress.message}</p>}

      <input
        type="text"
        placeholder="Apartment, floor, etc. (optional)"
        {...register("apartment")}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />

      <input
        type="text"
        placeholder="Town/City *"
        {...register("city", { required: "City is required" })}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />
      {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}

      <input
        type="text"
        placeholder="Phone Number *"
        {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{9,}$/,
            message: "Enter a valid phone number",
          },
        })}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <input
        type="email"
        placeholder="Email Address *"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Enter a valid email",
          },
        })}
        className="px-4 py-3 border rounded-md focus:ring-2 focus:ring-red-400"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-gray-600 text-sm">
            <input type="checkbox" className="w-4 h-4 text-red-500 focus:ring-red-400" />
            Save this information for faster check-out next time
          </label>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="flex-1 border rounded-lg p-6 bg-white shadow-sm">

        {/* Products */}
        <div className="space-y-4 mb-8">
        {
          itemsToOrderProcess.length >0 && (
            itemsToOrderProcess.map(it=> (
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={it.product_thumbnail} alt="LCD Monitor" className="w-12 h-12 rounded object-cover" />
            <span className="text-sm text-gray-700 ">{it.product_tittle}</span>
          </div>
          <span className="text-sm font-semibold">${it.product_price}</span>
        </div>

            ))
          )
        }
  
        </div>

        {/* Subtotal and Total */}
        <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>total:</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-black border-t pt-4">
            <span>Total with discount:</span>
            <span>${(total - total /20).toFixed()}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-2">
            <input type="radio" id="bank" name="payment" className="accent-red-500" />
            <label htmlFor="bank" className="text-gray-700 text-sm">Bank</label>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input type="radio" id="cash" name="payment" defaultChecked className="accent-red-500" />
            <label htmlFor="cash" className="text-gray-700 text-sm">Cash on Delivery</label>
          </div>

        
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            />
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-all duration-300">
              Apply Coupon
            </button>
          </div>


          <button onClick={handleSubmit(onSubmit)} className={`${Processing && 'bg-red-400'} cursor-pointer w-full py-3 flex items-center justify-center bg-red-600 text-white rounded hover:bg-red-700 `}>
              {Processing? 
                <div className=" animate-spin rounded-full h-6 w-6 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
              :'Process to Order'}
            </button>

        </div>

      </div>
    </div>
  </div>
  )
}
