import supabase from "./supabase"


export const getAllUsers=async(id)=>{
     
    const {data, error}=await supabase
    .from('users')
    .select("*")
    .neq('id', id)



    if(error) throw error

     return data
}