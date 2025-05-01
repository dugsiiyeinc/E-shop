import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import supabase from '../lib/supabase';
import { deleteItemFromCart, getingCartsByUsedId } from '../lib/Cart';
import { useAuth } from '../Context/AuthContext';

export default function CartsPage() {
  
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [cuantity, setCuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const {user, setCartLength}=useAuth()

  useEffect(() => {
  
      // console.log(user)
    const fetchCartItems = async () => {
     
        try {
          const data =await getingCartsByUsedId(user.id)
          console.log(data)
          setCartItems(data);
          
        } catch (error) {
          console.error(error)
        }finally{
               setLoading(false);
        
    };
  
  }
fetchCartItems();
    
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product_price * item.quant), 0);
  };



 const handlePriceInput=(value ,id)=>{
  setCartItems(prev=> prev.map(item=> item.id == id ?{...item , quant:parseInt(value) || 0}: item))
 }


 const handleRemove=async(id)=>{
    try {
      setCartItems(cartItems.filter(it=> it.id !== id))
      setCartLength(pre=> pre - 1)
      await deleteItemFromCart(id)
    } catch (error) {
      console.error(error)
    }
 }

  if(loading){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
        </div>
    )
}


if(cartItems.length ==0){
  return(
    <div className="min-h-[300px] w-full flex items-center justify-center">
  <div className="text-center p-4 bg-gray-100 rounded-md text-gray-600">
    🛒 Your cart is empty. Start shopping now!
  </div>

    </div>
  )
}
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link> / Cart
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="hidden md:grid grid-cols-4 gap-4 mb-4 font-medium text-gray-700 border-b pb-3">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            {/* <div>Delete</div> */}
            <div></div>
          </div>

          {cartItems.length > 0 &&cartItems.map(item => (
          
            <div key={item.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-4 border-b">
              <div className="flex items-center col-span-2 md:col-span-1">
                <img 
                  src={item.product_thumbnail} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <span className="text-gray-800 font-medium">{item.product_tittle}</span>
              </div>
              <div className="text-gray-600">${Number(item.product_price)}</div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quant}
                  onChange={(e)=> handlePriceInput(e.target.value, item.id)}
                  className="w-20 px-3 py-1 border rounded text-center"
                  min="1"
                />
              </div>
              {/* <div className="text-gray-800 font-medium">${item.price * item.quantity}</div> */}
              <button onClick={()=> handleRemove(item.id)} className="text-red-500 hover:text-red-700 text-2xl p-2 cursor-pointer">×</button>
            </div>
          
          ))}

          <div className="pt-6 flex justify-between">
            <Link to="/products" className="px-6 py-2 border border-red-300 rounded hover:border-red-500">
              Return To Shop
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium mb-4">Apply Coupon</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border rounded"
              />
              <button className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Apply Coupon
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-lg font-medium mb-4">Cart Total</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${calculateTotal() }</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-800 font-medium pt-3 border-t">
                <span>Total with discont:</span>
                <span>${(calculateTotal() - calculateTotal() /20).toFixed()}</span>
              </div>
            </div>
            <button className="w-full py-3 bg-red-600 text-white rounded hover:bg-red-700">
              Process to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
