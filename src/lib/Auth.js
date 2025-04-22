import supabase from "./supabase";

// signup
export async function signUp(email, password, username='') {
      
      let {data,error}=await supabase.auth.signUp({
        email:email,
        password:password
      })



      return data
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
      console.log("profile ", profile)
    } catch (error) {
      console.error(error)
    }
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
       name: defaultName,
       avatar_url: null
     })
     .select()
     .single()


   if(profileError){
     console.error(error)
     return
   }else{
     console.log('profile created', profileData)
   }

   return profileData
   }

   if(error){
    console.error(error)
   }


return data
}



// knowing if user is loged in or logout
export async function onAuthChange(calback){
  const {data}=supabase.auth.onAuthStateChange((event, session)=>{
    //  console.log(session)
      calback(session?.user || null, event)
  })
  return ()=> data.subscription.unsubscribe()
}


export async function sginOut() {
    await supabase.auth.signOut()
}