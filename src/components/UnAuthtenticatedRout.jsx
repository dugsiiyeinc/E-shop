import { Navigate } from "react-router"
import { useAuth } from "../Context/AuthContext"

export const UnAuthtenticatedRout = ({children, redarectTo='/'}) => {
     
    const {loading, isLogged}=useAuth()

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
            </div>
        )
    }

    if(isLogged){
        return <Navigate to={redarectTo} replace/>
    }

    return children
}
