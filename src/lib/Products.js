import supabase from "./supabase"

// create prodct
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



// update product
export async function updateProduct(id,productData) {
   
  const updateProducts={
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

  const { data, error } = await supabase
    .from('products')         
    .update(updateProducts)      
    .eq('id', id);               

  if (error) {
    console.error('Error updating product:', error.message);
    return;
  }

  console.log('Product updated successfully:', data);
}





// get all products
export const getAllProducts=async({limit=100,offset=0})=>{
    let {data, error}= await supabase
    .from('products')
    .select('*')
    .order('created_at', {ascending:true})
    .range(offset, offset + limit)


    if(error) throw error
     
    return data
}



// delete product
export   const deleteProduct = async (productId) => {
  const { data, error } = await supabase
    .from('products') // table name
    .delete()
    .eq('id', productId); // condition: id equals productId

  if (error) {
    console.error('Error deleting product:', error);
  } else {
    console.log('Product deleted:', data);
  }
};
