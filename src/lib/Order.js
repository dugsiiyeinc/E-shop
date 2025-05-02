import supabase from "./supabase";

export const checkOutOrder=async(formData, user_id , data_it, total)=>{

    const { data, error } = await supabase
  .from('orders')
  .insert([
    {
      user_idd: user_id,          
      name: formData.firstName,
      company_name: formData.companyName,
      address: formData.streetAddress,
      apartmen:formData.apartment,
      streat:formData.streetAddress,
      city: formData.city,
      phone: formData.phone,
      email: formData.email,
      total_price: total, 
      data_items:data_it
    
    }
  ]);

if (error) {
  console.error('Error inserting order:', error.message);
} else {
//   console.log('Order inserted successfully:', data);
}

}




// getAll Orders
export const getAllArticles=async()=>{
     
    const {data, error}=await supabase
    .from('orders')
    .select("*")



    if(error) throw error

     return data
}