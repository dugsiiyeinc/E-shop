import supabase from "./supabase"


export const createProduct=async (productData)=>{
   const productDataOnSupabase={
    user_id:productData.userId,
    title:productData.title,
    description:productData.description,
    price:productData.price,
    stock:productData.stock,
    thumnail_image:[productData.thumbnailURL],
    images:productData.images,
    category:productData.selectedCategory,
    publish:productData.published
   }

   const {data, error}=await supabase.from('products')
   .insert(productDataOnSupabase)
   .select()
   .single()



   if(error){
    console.error(error)
    return
   }

   return data
}