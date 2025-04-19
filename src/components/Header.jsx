import React from 'react'
import { Link } from 'react-router'

export const Header = () => {
  return (
    // Herder
    <div className=' border-b border-gray-300 relative'>
      <div className="max-w-7xl mx-auto py-3 px-2">
        <div className="flex items-center justify-between">

            {/* logo */}
            <div>
                <h1 className='text-gray-950 text-xl sm:text-2xl font-bold cursor-pointer'>E-SHOP</h1>
            </div>

              {/* menu */}

              <div className=" hidden md:flex items-center space-x-4 text-sm">
                    
              </div>
        </div>
      </div>
    </div>
  )
}
