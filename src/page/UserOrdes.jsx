import React from 'react'

export const UserOrdes = () => {
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

          {/* Inputs */}
          <input
            type="text"
            placeholder="First Name *"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Company Name"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Street Address *"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Apartment, floor, etc. (optional)"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Town/City *"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Phone Number *"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Email Address *"
            className="px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
          />

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
          {/* Single Product */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/path-to-your-image/lcd-monitor.png" alt="LCD Monitor" className="w-12 h-12 object-contain" />
              <span className="text-sm text-gray-700">LCD Monitor</span>
            </div>
            <span className="text-sm font-semibold">$650</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/path-to-your-image/gamepad.png" alt="Gamepad" className="w-12 h-12 object-contain" />
              <span className="text-sm text-gray-700">H1 Gamepad</span>
            </div>
            <span className="text-sm font-semibold">$1100</span>
          </div>
        </div>

        {/* Subtotal and Total */}
        <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>$1750</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-black border-t pt-4">
            <span>Total:</span>
            <span>$1750</span>
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

          {/* Payment logos */}
          <div className="flex items-center gap-2 mb-6">
            <img src="/path-to-your-image/visa.png" alt="Visa" className="h-6" />
            <img src="/path-to-your-image/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="/path-to-your-image/amex.png" alt="Amex" className="h-6" />
            <img src="/path-to-your-image/bkash.png" alt="bKash" className="h-6" />
          </div>

          {/* Coupon Code */}
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

          {/* Place Order Button */}
          <button className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold text-sm transition-all duration-300">
            Place Order
          </button>

        </div>

      </div>
    </div>
  </div>
  )
}
