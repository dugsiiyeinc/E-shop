import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

import { BookPlus, EyeOff, Tags, X } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { categories } from "../categories";
import toast from "react-hot-toast";
import { deleteImage, uploadThumnail } from "../lib/Storage";
import { useAuth } from "../Context/AuthContext";
import { createProduct, updateProduct } from "../lib/Products";
import { useNavigate, useParams } from "react-router";
import supabase from "../lib/supabase";
import { set } from "react-hook-form";
  // let isEditMode=false
export const AddNewProduct = () => {
  const params=useParams()
  const navigate=useNavigate()
  // console.log(params)

  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [selectedthumbnail, setSelectedthumbnail] = useState(null);
  const [uplaodThumnail, setUplaodThumnail] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage]=useState(null)
  const [uploadingSelectedImage, setUploadingSelectedImage]=useState(false)
  const [isCategoryOpen, setIscategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [publishloading, setPublishLoading] = useState(false);
  const [errors,setErrors]=useState(null)


  const {user}=useAuth()
  let bucket=''

  const addCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };


    // handle related iamage
    const handleUplaodImage=(e)=>{
      const file=e.target.files[0]
      // console.log(file)
      if(file){
        if(!file.type.startsWith('image/')){
          toast.error('Please select an image file')
          e.target.value='';
          setSelectedImage(null)
          return
        }
        setSelectedImage(file)
  
      }
    }

    const handleUplaodImageSupabase=async()=>{
      if(images.length >=3){
        toast.error("You can only upload up to 3 images.");
        return
      }
      const bucket='related-images'
  
       if(!selectedImage
         
       ) return
        
        try {
          setUploadingSelectedImage(true)
          const publickURL = await uploadThumnail(selectedImage, user.id, bucket )
          setImages(prev => [...prev, publickURL]);
      
          
        } catch (error) {
          console.error(error)
        }finally{
          setUploadingSelectedImage(false)
        }
    }

     // handle delete thumbbnail
  const  handleDeleteImages=async(filePath)=>{
    bucket='related-images'
    try {
      await deleteImage(filePath, bucket)
      setImages(images.filter(im=> im.filePath !== filePath))
      setSelectedImage(null)
      
    } catch (error) {
      console.error(error)
    }
}



  // handle Thumbnail iamage
  const handleThumbnailImage=(e)=>{
    const file=e.target.files[0]
    // console.log(file)
    if(file){
      if(!file.type.startsWith('image/')){
        toast.error('Please select an image file')
        e.target.value='';
        setSelectedthumbnail(null)
        return
      }
      setSelectedthumbnail(file)

    }
  }
  const handleUplaodThumbnail=async()=>{
    const bucket='thumbnail-image'

     if(!selectedthumbnail) return
      
      try {
        setUplaodThumnail(true)
        const publickURL = await uploadThumnail(selectedthumbnail, bucket )
        setThumbnailURL(publickURL)
    
        
      } catch (error) {
        console.error(error)
      }finally{
        setUplaodThumnail(false)
      }
  }

  // handle delete thumbbnail
  const  handleDelete=async(filePath)=>{
      bucket='thumbnail-image'
      try {
        await deleteImage(filePath, bucket)
        setSelectedthumbnail(null)
        setThumbnailURL('')
        
      } catch (error) {
        console.error(error)
      }
  }








  //  handle Save Data to supabase
   const handleSave=async(publish=null)=>{
  //  alert('d')
       setErrors(null)
      if(!title.trim()){
        setErrors(prev=> ({...prev, title:'error'}))
        toast.error('Please enter the Title',{position:'top-center'})
        return
      }

      if(price==0){
        setErrors(prev=> ({...prev, price:'error'}))
        toast.error('Please enter the Price of the item',{position:'top-center'})
        return
      }
      if(!thumbnailURL){
        toast.error('Please provide Thumnail picture',{position:'top-center'})
        return
      }
      // if(stock==0){
      //   setErrors(prev=> ({...prev, stock:'error'}))
      //   toast.error('Please enter the how many items in the stock',{position:'top-center'})
      //   return
      // }
      if(!description.trim()){
        setErrors(prev=> ({...prev, description:'error'}))
        toast.error('Please enter the Description of item',{position:'top-center'})
        return
      }

     
      if(publish){
        setPublishLoading(true)
      }
      
      try {

        const  ProductData={
          title,
          description,
          published:publish,
          price,
          stock,
          thumbnailURL,
          images,
          selectedCategory,
          userId:user.id
      }
      // console.log(ProductData)
        
       

        if(isEditMode){
         await updateProduct(params.editProduct, ProductData)
         toast.success('Product Updated successfully', {position:"top-right"})
         cleanUp()
         navigate('/admin/products')
        }else{
          const data=await createProduct(ProductData)
           console.log(data)
           toast.success('Uploaded successfully', {position:"top-right"})
           cleanUp()
        }
        
      } catch (error) {
        console.error(error)
      }finally{
        setPublishLoading(false)
      }
   }


   const cleanUp=()=>{
       setDescription('')
       setTitle('')
       setThumbnailURL('')
       setImages([])
       setSelectedCategory([])
       setPrice(0)
       setStock(0)
       setSelectedthumbnail(null)
       setErrors(null)
       setSelectedImage(null)
   }


    // console.log('Images: ', images)

  

    useEffect(()=>{
     if(params?.editProduct){
      setIsEditMode(true)

      const getProductById=async()=>{
          try {
            const {data, error}=await supabase.from('products')
            .select('*')
            .eq('id', Number(params.editProduct))
            .single()

            // console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setStock(data.stock)
            setDescription(data.description)
            setImages(data.images)
            setThumbnailURL(data.thumnail_image[0])
            setSelectedCategory(data.category)
          } catch (error) {
            console.error(error)
          }
       }
      getProductById()
     }
     
    },[])

  return (
    <SidebarInset className="min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Welcome to E-shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Add New Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="px-5 flex flex-col">
        {/* top */}
        <div className="flex justify-between items-center my-4 gap-3 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {isEditMode?'Edit the Product' :"Add New Product"}
            </h1>
            <p className="text-sm text-gray-500">
              🛒 Fill out the details below to add a new product to your store.
              Make sure everything looks good before publishing! 🚀
            </p>
          </div>

          <div className="flex items-center space-x-5 ">
          <Button
              onClick={()=> handleSave(false)}
              className="px-9 cursor-pointer flex items-center gap-2 bg-gray-150 text-gray-700 hover:bg-gray-200 sm:w-28 ">
                <EyeOff className="w-4 h-4" />
                Draft
              </Button>

                <Button 
                onClick={()=> handleSave(true)}
                className="px-9 cursor-pointer flex items-center gap-2 sm:w-28">
                  {publishloading ? (
                    <BeatLoader color="#bbb" loading={true} size={10} />
                  ) : (
                    <>
                      <BookPlus className="w-4 h-4" />
                      {isEditMode?'Update':"Publish"}
                    </>
                  )}
                </Button>
          </div>
        </div>

        {/* bottom section */}
        <div className="flex flex-col gap-8  ">
          {/* title */}
          <div className="flex flex-col max-w-xl">
            <label htmlFor="title" className="text-sm text-gray-500">
              Title
            </label>
            <Input
            className={`${errors?.title && 'border border-orange-600'} `}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
            />
          </div>

          {/* images / thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-3">
            {/* thumbnail */}
            <div className="flex flex-col ">
              <div className="flex justify-between items-center ">
                <div className="flex flex-col">
                  <label
                    htmlFor="thumbnail"
                    className="text-sm font-medium text-gray-600 mb-2"
                  >
                    Thumbnail
                  </label>
                  <input
                  onChange={(e)=>handleThumbnailImage(e)}
                    type="file"
                    id="thumbnail"
                    className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-gray-100 file:text-gray-700
               hover:file:bg-gray-200"
                  />
                </div>

                {selectedthumbnail && (
                  <Button
                  onClick={handleUplaodThumbnail}
                    className={`px-6 py-2 rounded-md font-medium text-white transition-colors duration-200  cursor-pointer
                              ${
                                uplaodThumnail
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-600 hover:bg-blue-700"
                              }`}
                    disabled={uplaodThumnail}
                  >
                    {uplaodThumnail ? (
                      <BeatLoader color="#ffffff" loading={true} size={10} />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                )}
              </div>
              {thumbnailURL && (
                <div className="relative">
                  <img
                    src={thumbnailURL.publicUrl}
                    alt="thumbnail"
                    className="max-h-[330px] w-full object-cover rounded-md"
                  />
                  <X 
                  onClick={()=>handleDelete(thumbnailURL.filePath)}
                  className="w-6  absolute right-1 top-1 cursor-pointer hover:bg-gray-200/70 z-3 rounded-full bg-gray-200/40" />
                </div>
              )}
            </div>

            {/* images */}
            <div className="flex flex-col ">
              <div className="flex justify-between items-center ">
                <div className="flex flex-col">
                  <label
                    htmlFor="related"
                    className="text-sm font-medium text-gray-600 mb-2"
                  >
                    Related Images
                  </label>
                  <input
                  onChange={(e)=>handleUplaodImage(e)}
                    type="file"
                    id="related"
                    className="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-md file:border-0
               file:text-sm file:font-semibold
               file:bg-gray-100 file:text-gray-700
               hover:file:bg-gray-200"
                  />
                </div>

                <div className="flex gap-2">
                  {selectedImage && (
                    <Button
                    onClick={handleUplaodImageSupabase}
                      className={`px-6 py-2 rounded-md font-medium text-white transition-colors duration-200  cursor-pointer
                              ${
                                uploadingSelectedImage
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-600 hover:bg-blue-700"
                              }`}
                      disabled={uploadingSelectedImage}
                    >
                      {uploadingSelectedImage ? (
                        <BeatLoader color="#ffffff" loading={true} size={10} />
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  )}
                  <span className="text-lg text-gray-400">
                    {images.length}/3
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {images.length > 0 &&
                  images.map((img) => (
                    <div className="relative"
                     key={img.publicUrl}
                    >
                      <img
                        src={img.publicUrl}
                        alt="thumbnail"
                        className="max-h-[160px] w-full object-cover rounded-md"
                      />
                      <X 
                      onClick={()=>handleDeleteImages(img.filePath)}
                      className="w-6  absolute right-1 top-1 cursor-pointer hover:bg-gray-200/70 z-3 rounded-full bg-gray-200/40" />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* price category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            {/* category section */}
            <div className="relative flex flex-col items-start ">
              <label htmlFor="title" className="text-sm text-gray-500 mb-1">
                Categories
              </label>

              {/* Selected Category Preview */}
              {selectedCategory.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedCategory.map((selected, index) => (
                    <span
                      onClick={() => addCategory(selected)}
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full cursor-pointer"
                    >
                      {selected}
                    </span>
                  ))}
                </div>
              )}

              {/* Category Toggle Button */}
              <div
                tabIndex={0}
                onClick={() => setIscategoryOpen(!isCategoryOpen)}
                className="  flex items-center gap-2 text-gray-700 px-4 py-2 border border-gray-300 rounded-md cursor-pointer 
              focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 
             hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                <Tags className="w-5 h-5 text-gray-600" />
                <span className="text-sm">Select Category</span>
              </div>

              {/* Category Dropdown */}
              {isCategoryOpen && (
                <div
                  className={`absolute z-10 mt-20 w-full p-4 rounded-md border border-gray-300 bg-white min-h-[200px] max-h-[300px] overflow-y-auto grid grid-cols-2 gap-3 shadow-md ${
                    selectedCategory.length > 0 && "mt-27"
                  } ${selectedCategory.length >= 5 && "mt-44"}`}
                >
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <div
                        key={cat.slug}
                        onClick={() => addCategory(cat.name)}
                        className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200 
            ${
              selectedCategory.includes(cat.name)
                ? `${cat.bgColor} ${cat.textColor} border-transparent`
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }
          `}
                      >
                        {cat.name}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-400 col-span-2">
                      No categories available
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* price section */}
            <div className="flex flex-col md:pr-30">
              <label htmlFor="price" className="text-sm text-gray-500 mb-1">
                Price
              </label>
              <Input
                id="price"
                className={`${errors?.price ? 'border border-orange-600' :"border-gray-300 h-10"} `}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
              />
            </div>
          </div>

            {/* stock */}
            <div className="flex  ">
            <div className="flex flex-col md:pr-30">
              <label htmlFor="stock" className="text-sm text-gray-500 mb-1">
                Stock
              </label>
              <Input
                id="stock"
                className={`${errors?.stock ? 'border border-orange-600' :"border-gray-300 h-10"} `}
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
              />
            </div>
          </div>

          {/* description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm text-gray-500 mb-1">
              Description
            </label>
            <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
              id="description"
              className={`${errors?.description ? 'border border-orange-600' :"border border-gray-300 "} rounded-lg p-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              rows={5}
              placeholder="Enter a brief description of the product..."
            ></textarea>

            <div className="flex items-center space-x-5  py-8 justify-end">
              <Button
              onClick={()=> handleSave(false)}
              className="px-9 cursor-pointer flex items-center gap-2 bg-gray-150 text-gray-700 hover:bg-gray-200 sm:w-28 ">
                <EyeOff className="w-4 h-4" />
                Draft
              </Button>

                <Button 
                onClick={()=> handleSave(true)}
                className="px-9 cursor-pointer flex items-center gap-2 sm:w-28">
                  {publishloading ? (
                    <BeatLoader color="#bbb" loading={true} size={10} />
                  ) : (
                    <>
                      <BookPlus className="w-4 h-4" />
                      {isEditMode?'Update':"Publish"}
                    </>
                  )}
                </Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
