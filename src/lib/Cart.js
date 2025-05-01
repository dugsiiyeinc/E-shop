import supabase from "./supabase"

export const addItemToCart=async(user_id, quaintity, product_id, product_thumbnail, product_tittle, product_price)=>{
    //geting cart for cart item table

    
    const {data:cart,err}=await supabase
    .from('carts')
    .select('*')
    .eq('user_id', user_id)
    .single()

    // console.log('cart:',cart)

    if(err) {
        console.error(err)
        return
    }

   let cart_id=cart.id;
   let quant=Number(quaintity)
    const {data, error:carItem_error}= await supabase
    .from('cart_items')
    .insert([{cart_id, product_id, quant, user_id, product_thumbnail, product_tittle, product_price}])

    if(carItem_error){
        console.error(carItem_error)
    }

}

// cheking if cart_Item with this id all ready exsist
export const checkingIfCartAdded=async(product_id, user_id)=>{
    // if(product_id)

   const {data:carat_item, error:cart_item_rr}=await supabase
   .from('cart_items')
   .select('*')
   .eq('product_id', product_id)  .eq('user_id', user_id)
   .single()


   if(cart_item_rr && cart_item_rr.code === 'PGRST116'){
    // console.error(cart_item_rr)
    return null
   }

//    console.log(carat_item)
   return carat_item
}



export const getingCartsByUsedId=async(user_id)=>{


    const {data:carat_items, error:cart_item_rr}=await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user_id)
    
 
 
    if(cart_item_rr ){
     // console.error(cart_item_rr)
     return []
    }
 
 //    console.log(carat_item)
    return carat_items
 }


 export const deleteItemFromCart=async(id)=>{
    const {data:carat_items, error:cart_item_rr}=await supabase
    .from('cart_items')
    .delete()
    .eq('id', id)
    
 }