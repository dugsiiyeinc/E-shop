import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { Link, useNavigate, useParams } from 'react-router';
import { Plane } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { addItemToCart, checkingIfCartAdded } from '../lib/Cart';
import toast from 'react-hot-toast';

export const ProductDetailPage = () => {
 
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [car_product, setCar_product] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [ItC, setItC] = useState(0);
  const[currentIm, setCurrentImg]=useState('')
  const {user, isLogged, setCartLength}=useAuth()
  const navigate=useNavigate()

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // fetch data
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        //  console.log(productData)
        if (productError) throw productError;
        if (!productData) throw new Error('Product not found');
        checking(productData?.id)
        setProduct(productData)
        setCurrentImg(productData.thumnail_image[0].publicUrl)
        
       

         if(productData.category.length>0){
       const shuffled = [...productData.category].sort(() => 0.5 - Math.random());
        const selectedCategories = shuffled.slice(0, 3);
       


        const { data: relatedData, error: relatedError } = await supabase
        .from('products')
        .select('*')
        .overlaps('category', selectedCategories) 
        .limit(4)
        .neq('id', id)
    
      if (relatedError) throw relatedError;
      // console.log(relatedData)
      setRelatedProducts(relatedData || []);
         }else{
          const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .limit(4)
          .neq('id', id)
          // console.log(relatedData)

        if (relatedError) throw relatedError;
        
        setRelatedProducts(relatedData || []);
         }

      } catch (err) {
        setError(err.message);
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async() => {
      if(!isLogged){
       navigate('/auth')
       return
      }
     if(car_product){ 
      toast('All ready in cart')
      return
    }
      try {
        setCartLength(prev=> prev+1)
        await addItemToCart(user?.id, quantity, product?.id, product?.thumnail_image[0]?.publicUrl, product?.title, product?.price)
        checking(product?.id)
      } catch (error) {
        console.error(error)
      }
  };


  // checking if this product all ready in cart_item table
  const checking=async(product_id)=>{
     try {
     const data= await checkingIfCartAdded(product_id, user.id)
     setCar_product(data)
    //  console.log(data)
     } catch (error) {
      console.log(error)
     }
  }
// console.log(quantity)
  if (loading) return <div className="flex justify-center py-20">Loading product...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 max-w-5xl mx-auto">
      <div className="container mx-auto px-4 py-8">
    
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="text-sm text-gray-700 hover:text-red-600">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="#" className="text-sm text-gray-700 hover:text-red-600">{product.category}</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-gray-500">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              {product.thumnail_image[0]?.publicUrl ? (
                <img
                  src={currentIm || product.thumnail_image[0].publicUrl}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-400 bg-gray-100">
                  No image available
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images?.map((image, index) => (
                <div key={index} className="bg-white p-2 rounded shadow-sm cursor-pointer hover:shadow-md">
                  <img
                  onClick={()=> setCurrentImg(image.publicUrl)}
                    src={image.publicUrl}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Inform */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">(65 reviews)</span>
            </div>

            <div className="text-2xl font-bold text-gray-900 mb-4">${product.price}</div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="font-medium text-gray-700 mr-2">Availability:</span>
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="font-medium text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1 text-lg"
                >
                  -
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-1 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-lg font-medium mb-6  ${!car_product
                ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              <>
              {
                car_product ?(
                  'All ready added to cart'
                ):<>
                 {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </>


              }
              </>
            </button>

            <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-300 mt-12">
              <h3 className="font-medium text-gray-700 mb-2 flex "> <Plane className='mr-2 text-gray-500'/> Free Delivery</h3>
              <p className="text-sm text-gray-600">Enter your postal code for Delivery Availability.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg  border border-gray-300">
              <h3 className="font-medium text-gray-700 mb-2">Return Delivery</h3>
              <p className="text-sm text-gray-600">Free 30-Day Delivery Returns Details</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex  space-x-2 mb-4">
              <div className="w-3 h-8 rounded bg-red-500"></div>
              <h2 className="text-2xl font-normal text-gray-800 mb-6">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <div key={related.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    {related.thumnail_image?.[0]?.publicUrl ? (
                      <img
                        src={related.thumnail_image[0].publicUrl}
                        alt={related.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 flex items-center justify-center text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 my-2">{related.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">${related.price}</span>
                      <Link to={`/products/${related.id}`} className="px-3 py-1 underline  text-gray-500 text-sm rounded  transition-colors">
                       view
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
