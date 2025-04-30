import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { getAllProductsForSearch } from "../lib/Products";
import { Link } from "react-router";

export const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts]=useState([])
  const [realData, setrealDta]=useState([])
  const [inputVlaue, setInputValue]=useState('')


  useEffect(()=>{
  const products=async()=>{
    try {
      const data=await getAllProductsForSearch()
      setrealDta(data)
      setProducts(data)
    } catch (error) {
      console.error(error)
    }
    
  }

  products()
  },[])



  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setInputValue(searchTerm);
  
    setProducts((prevProducts) => {
      if (!searchTerm) return realData; 
  
      return prevProducts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm)
      );
    });
  };
  
// console.log(products)
  return (
    <div>
      {/* Trigger Button */}
      <div
        onClick={() => setIsSearchOpen(true)}
        className="flex justify-between items-center space-x-0 sm:space-x-4 px-4 py-2 bg-gray-100 rounded-md cursor-pointer"
      >
        <p className="text-sm text-gray-400">What are you looking for?</p>
        <Search className="w-5 h-5 text-gray-500" />
      </div>

 
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-100 flex items-center justify-center"
        >
      
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-2xl bg-white p-6 rounded-md shadow-lg z-50 m-2"
          >
            <p className="text-center text-lg font-semibold">
             
            </p>
            <div>
              <Command>
                {/* <CommandInput placeholder="Type a command or search..." onChange={()=> alert('')} /> */}
                <div className="w-full px-1 flex relative items-center">
                  <Search className="text-gray-400 w-4"/>
                  <input value={inputVlaue} type="text" className="w-full border-b px-2 py-1 outline-none"  placeholder="Type a command or search..."  onChange={(e)=> handleSearch(e)}/>
                </div>
                <CommandList>
                  <CommandGroup heading="Suggestions" >
                  <div className="px-2 pt-2">
                  {
                      products.length>0 ? (
                        products.map((p, i)=>(
                         i <9 && (
                          <Link onClick={()=> setIsSearchOpen(false)} to={`/products/${p.id}`} className="flex items-center space-x-5 mb-3 w-full">
                          <img src={p.thumnail_image[0]?.publicUrl} alt="v" className="w-10 h-9 object-cover rounded" />
                          <span className="text-sm
                           text-gray-500 hover:text-gray-700">{p.title}</span>
                          </Link>
                         )
                        ))
                      ):<span className="text-gray-600">No results found.</span>
                    }
                  </div>
                  </CommandGroup>
                  <CommandSeparator />
                 
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
