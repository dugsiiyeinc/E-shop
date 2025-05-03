import supabase from "./supabase";
let userName=''

// signup
export async function signUpp(email, password, username='') {
  userName=username
      
      let {data,error}=await supabase.auth.signUp({
        email,
        password
      })
      if(error) throw error
      createCart(data?.user?.id)
      // console.log(data)

      // return data
}





// signin
export async function  signIn(email, password){
  let {data,error}=await supabase.auth.signInWithPassword({
    email:email,
    password:password
  })


  if(error) throw error


  // check ifuser profile exists
  if(data?.user){
  
    try {
      
      const profile =await getUserProfile(data.user.id)
      // console.log("profile ", profile)
      return profile
    } catch (error) {
      console.error(error)
    }
  }
}


// create cart autmatic
export const createCart=async(user_id)=>{
  const {data, err}=await supabase
  .from('carts')
  .insert([{user_id}])

  console.log(data)
  if(err){
    console.error(err)
  }
}

// get user Profile
export const getUserProfile=async(userId)=>{

  const {data:sessionData}=await supabase.auth.getSession()

   const {data, error}=await supabase.from('users')
   .select('*')
   .eq('id', userId)
   .single()

   if(error && error.code === "PGRST116"){

    const {data:UserData}=await supabase.auth.getUser()
  
     const email=UserData?.user.email
     const defaultName=email?email.split('@')[0]:`user_${Date.now()}`

     const {data:profileData, error:profileError} = await  supabase
     .from('users')
     .insert({
       id: userId,
       name:userName || defaultName,
       avatar_url: null
     })
     .select()
     .single()


   if(profileError){
     console.error(error)
     return
   }else{
    //  console.log('profile created', profileData)
   }

   return profileData
   }

   if(error){
    console.error(error)
   }


return data
}

export const getProfile = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single(); 

    if (error && error.code === "PGRST116") {
      return null;
    }

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    return null;
  }
};




// knowing if user is loged in or logout
export function onAuthChange(callback) {
  const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;
    callback(user, event);
  });
    
  if(subscription){
     return () => subscription.unsubscribe(); 
  }
}


export async function sginOut() {
    await supabase.auth.signOut()
}