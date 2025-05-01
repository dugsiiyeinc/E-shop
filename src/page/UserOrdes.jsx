import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { PackageCheck, CalendarDays, DollarSign, BadgeCheck, Trash2 } from "lucide-react";
import { useAuth } from '../Context/AuthContext';


export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user}=useAuth()

  const fetchOrders = async () => {
    setLoading(true);

    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_idd', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching orders:', error.message);
    } else {
      setOrders(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleDelete=async(id)=>{
    try {
      setOrders(pre=> pre.filter(p=>p.id !== id))
      const {data, error}= await supabase
      .from('orders')
       .delete()
       .eq('id', id)
       if(error) throw error

      //  setOrders(pre=> pre.filter(p=>p.id !== id))
    } catch (error) {
      console.error(error)
    }
  }
 
  // console.log(orders)
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      <span className='text-sm text-gray-500 mb-7'>Total: {orders.length}</span>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-4 border rounded-lg shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <PackageCheck className="w-4 h-4 text-blue-600" />
              <span>Order #{order.id}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span>${order.total_price}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ">
            <BadgeCheck className="w-5 h-5 text-purple-600" />
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                order.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : order.status === 'shipped'
                  ? 'bg-blue-100 text-blue-800'
                  : order.status === 'delivered'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
            <Trash2 className='text-red-600 w-4 h-4 sm:ml-9 cursor-pointer hover:text-red-700' onClick={(()=> handleDelete(Number(order.id)))}/>
          </div>
        </div>
      ))}
    </div>
      )}
    </div>
  );
}
