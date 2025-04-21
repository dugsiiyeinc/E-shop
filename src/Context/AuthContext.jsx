import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, sginOut } from "../lib/Auth";

const AuthContext=createContext(null)

export const AuthProvider=({children})=>{

    const [user, setUser]=useState(null)
    const [profile, setProfile]=useState(null)
    const [loading, setLoading]=useState(true)


    useEffect(()=>{
    
      const cleanUp=onAuthChange(async(User)=>{
        setUser(User)
        if(User){
            try {
                const userProfile=await getUserProfile(User.id)
                setProfile(userProfile)
            } catch (error) {
                console.error(error)
            }
        }else{
            setProfile(null)
        }
      })
 setLoading(false)

      return ()=>cleanUp
    },[])



    const logOutFun= async()=>{
       try {
        await sginOut()
       } catch (error) {
        console.error(error)
       }
    }

    const value={
        profile,
        user,
        loading,
        isLogged:!!user,
        logOutFun
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    const context=useContext(AuthContext)
    //  console.log(context)
    
    if(context === null){
        throw new Error('context must be provided user data!')
    }

    return context
}