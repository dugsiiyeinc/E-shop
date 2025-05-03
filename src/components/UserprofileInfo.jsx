import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import { File, Save } from 'lucide-react'
import { Button } from './ui/button'
import toast from 'react-hot-toast'
import { BeatLoader } from "react-spinners";
import { v4 as uuidv4 } from 'uuid';
import supabase from '../lib/supabase'

export const UserprofileInfo = () => {
 const  [userName, setUserName]=useState('')
 const  [email, setemail]=useState('')
 const  [avatar_url, setAvatar_url]=useState('')
 const  [avatar,setAvatar]=useState(null)
 const  [loading,setLoading]=useState(false)
 const {profile, setProfile, user}=useAuth()
//  console.log(profile)
//  console.log(user)


 useEffect(()=>{
   if(profile && user){
    setAvatar_url(profile.avatar_url)
   setUserName(profile.name)
   setemail(user.email)
   }
 },[])



//  upload image file
const handleAvatarChange=(e)=>{

    if(e.target.files && e.target.files[0]){
        const file=e.target.files[0]
        if(file.size > 2* 1024 * 1024){
            toast.error('File size is too large', {position: 'top-right'})
            return
        }
        setAvatar(file)
        const previewURL=URL.createObjectURL(file)
        setAvatar_url(previewURL)
    }
}


// upload the profileData
const handleSubmit=async ()=>{
  setLoading(true)
    try {
        
        let updates={name:userName}
        // check file selected avatar
        if(avatar){
            const fileEx=avatar.name.split().pop();
            const fileName=`${user.id}-${uuidv4()}`
            const filePath=`avatars/${fileName}.${fileEx}`
          
            // upload supabase
            const {error:storageImageError}=await supabase.storage.from('avatars').upload(filePath, avatar);

            if(storageImageError) throw storageImageError

            // get bublick avatar url
            const {data}=supabase.storage.from('avatars').getPublicUrl(filePath) 
            updates={
                ...updates,
                avatar_url:data.publicUrl
            }

            setAvatar_url(data.publicUrl)
        }

        const {data, error}=await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()


    if(error) throw error
    console.log('profile updated', data)

    setProfile(data)

    } catch (error) {
        console.error(error)
    }finally{
        setLoading(false)
    }
}





  return (
    <div className='w-full shadow-sm sm:px-4 py-2 rounded-md'>
      {/* header section */}
      <div className="w-full min-h-[150px] sm:min-h-[200px] rounded-md bg-gradient-to-r from-rose-700 to-rose-400 p-2 flex flex-col items-center justify-center">
        
         {/*image and  input */}
         <div className="relative mt-12 border-3 border-gray-50 rounded-full">
            <img src={avatar_url || 'https://github.com/shadcn.png'} alt="avatar" className='w-16 h-16 rounded-full '/>

           {/* input */}
           <div className="flex absolute -right-1 bottom-0">
            <label htmlFor="file" className='p-1 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer'><Save className='w-5 h-5'/></label>
            <input type="file"  id="file"  className='hidden' onChange={handleAvatarChange}/>
           </div>
         </div>
         <p className='text-gray-50 text-base'>{userName}</p>
      </div>

      <div className="flex flex-col mt-6 ">
      <input
      type="email"
      value={email}
      disabled
       className="max-w-md my-2 border border-gray-300 py-2 px-3 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
      />

      <input
      type="text"
      value={userName}
      onChange={(e)=> setUserName(e.target.value)}
       className="max-w-md my-2 border border-gray-300 py-2 px-3 rounded-md bg-gray-100 text-gray-700 cu"
      />

      <Button className={'mt-8 py-5 cursor-pointer '} onClick={handleSubmit}>{!loading?'Save changes':  <BeatLoader color="#bbb" loading={true} size={10} />}</Button>
      </div>
    </div>
  )
}
