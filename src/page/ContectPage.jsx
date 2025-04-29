import React from 'react'
import { Link } from 'react-router'

export default function ContectPage() {
  return (
    <div className="px-4 sm:px-10 py-10 max-w-7xl mx-auto">

    {/* Breadcrumb */}
    <div className="text-sm text-gray-500 mb-8">
      <Link to="/" className="hover:underline">Home</Link> / <span className="text-black">Contact</span>
    </div>

    {/* Main Layout */}
    <div className="flex flex-col md:flex-row gap-10">

      {/* Left Info Box */}
      <div className="flex-1 border rounded-lg p-6 bg-white shadow-sm">
        <div className="flex flex-col gap-6">

          {/* Call Us */}
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full p-3 text-xl">
              <i className="ri-phone-fill"></i>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Call To Us</h4>
              <p className="text-gray-500 text-sm mb-1">We are available 24/7, 7 days a week.</p>
              <p className="text-black text-sm font-medium">Phone: +8801611112222</p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Write To Us */}
          <div className="flex items-start gap-4">
            <div className="bg-red-500 text-white rounded-full p-3 text-xl">
              <i className="ri-mail-fill"></i>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">Write To Us</h4>
              <p className="text-gray-500 text-sm mb-1">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-black text-sm font-medium">Emails: customer@exclusive.com</p>
              <p className="text-black text-sm font-medium">Emails: support@exclusive.com</p>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Form */}
      <div className="flex-1 border rounded-lg p-6 bg-white shadow-sm">
        <form className="flex flex-col gap-6">

          {/* Top 3 Inputs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Your Name *"
              className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email *"
              className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            />
            <input
              type="text"
              placeholder="Your Phone *"
              className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            />
          </div>

          {/* Message Textarea */}
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          ></textarea>

          {/* Send Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md text-sm font-semibold transition-all duration-300"
            >
              Send Message
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
  )
}
