import React, {useState, useEffect} from 'react'
import supabase from '../lib/supabase';
import { Link } from 'react-router';
import { IoCartOutline } from 'react-icons/io5';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [searchQuery, setSearchQuery] = useState('');


  const categories = [
    'Pumps & Irrigation',
    'Power & Energy', 
    "Solar Products",
    "Home Electricals",
    'Mini Electronics',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('publish', true);

        if (error) throw error;
        
        setProducts(data);
        // console.log(data)
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, searchQuery, products]);

  const applyFilters = () => {
    let result = [...products];

    // category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product, i) => 
        
        selectedCategories.includes(product.category[(0 || 1 || 2|| 3 || 4 ||5||6 || 7 || 8 || 9)])
      );
   
    }
//     console.log(result)
// console.log(selectedCategories)
    // price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    setSearchQuery('');
  };



  

  
  if(loading){
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
        </div>
    )
}
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">All products</h1>
        
        <div className="flex flex-col lg:flex-row gap-9">
         
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
              >
                Clear all
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-500">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-400">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <p className="text-gray-500">No products match your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                      {product.thumnail_image?.[0]?.publicUrl ? (
                        <Link to={`/products/${product.id}`}>
                          <img
                          src={product.thumnail_image[0].publicUrl}
                          alt={product.title}
                          className="w-full h-48 object-cover  hover:scale-110 duration-230"
                        />
                        </Link>
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center text-gray-400">
                          No image available
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <Link to={`/products/${product.id}`} className="text-lg font-semibold text-gray-800 mb-2 hover:underline">{product.title}</Link>
                      <p className="text-sm text-gray-600  line-clamp-2 mb-4 mt-2">{product.description}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((a, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">(65)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        <Link to={`/products/${product.id}`} className=" cursor-pointer px-3 py-1 border-1 hover:bg-red-100 border-red-500 flex items-center gap-1 text-sm rounded hover:border-red-700 transition-colors">
                         View to cart   <IoCartOutline className="text-xl text-red-500" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
