import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile, onAuthChange, sginOut } from "../lib/Auth";
import { getingCartsByUsedId } from "../lib/Cart";

const AuthContext=createContext(null)

export const AuthProvider=({children})=>{

    const [user, setUser]=useState(null)
    const [profile, setProfile]=useState(null)
    const [loading, setLoading]=useState(true)
    const [cartLength, setCartLength]=useState(0)


    useEffect(()=>{
    
      const cleanUp=onAuthChange(async(User)=>{
        setUser(User)
        if(User){
            try {
                const userProfile=await getUserProfile(User.id)
                setProfile(userProfile)
                const carat_leng=await getingCartsByUsedId(User.id)
               
                const len= carat_leng.length
                //  console.log(len)
                setCartLength(len)
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
        logOutFun,
        cartLength,
        setCartLength
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