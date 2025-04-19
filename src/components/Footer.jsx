import React from 'react'
import { Input } from "@/components/ui/input"
import { Contact, Send } from 'lucide-react'
import { Link } from 'react-router'

export const Footer = () => {
  return (
    <div className=' bg-black/94  text-gray-400 pt-4'>
      <div className="max-w-7xl mx-auto py-12 px-3">
        <div className="flex justify-between items-center flex-wrap gap-7 ">
          <div className='flex flex-col'>
            <h1 className='font-medium text-3xl mb-4'>
              E-shop
            </h1>
            <h3 className=' mb-5 text-lg'>Subscribe</h3>
            <p className=' font-light mb-2'>Get 10% off your first order</p>
            <div className="flex min-w-[260px] px-1 py-2 border border-gray-500 rounded">
              <input type="text" placeholder="Enter your email"  className="text-white placeholder:text-sm border-none focus:outline-none focus:ring-0 focus:border-transparent flex-1"/>
              <Send className=' cursor-pointer'/>
            </div>


          </div>

          <div className='flex flex-col'>
            <h1 className=' text-2xl mb-4'>
              Support
            </h1>
            <p className=' font-light mb-2'>` W will give full support <br /> please contact us here`</p>
            <p className=' font-light mb-2'>abdiqafaarabdulahi@gmail.com</p>
            <p className=' font-light mb-2'>+251929471030</p>

          </div>

          <div className='flex flex-col'>
            <h1 className=' text-2xl mb-4'>
              Account
            </h1>
            <Link to={'/profile'} className=' font-light mb-2 hover:underline'>My Account</Link>
            <div className="flex items-center">
            <Link to={'/signin'} className=' font-light mb-2 hover:underline mr-2'>SignIn</Link>
             / 
            <Link to={'/signup'} className=' font-light mb-2 hover:underline ml-2'>SignUp</Link>

            </div>
            <Link to={'/cart'} className=' font-light mb-2 hover:underline'>Cart</Link>
            <Link to={'/products'} className=' font-light mb-2 hover:underline'>All Products</Link>

          </div>

          <div className='flex flex-col'>
            <h1 className=' text-2xl mb-4'>
              Quick Link
            </h1>
            <p className=' font-light mb-2'>Privicy Policy</p>
            <p className=' font-light mb-2'>Terms Of Use</p>
            <p className=' font-light mb-2'> FAQ</p>
            <p className=' font-light mb-2 flex '><Contact className='mr-2'/> Contect</p>

          </div>

        </div>
      </div>
      <div className="border-t border-gray-700 flex items-center justify-center p-3 text-gray-500 font-medium">
        <span>  © {new Date().getFullYear()} Abdiqafaar All rights reserved.</span>
      </div>
    </div>
  )
}
