import { Navigate } from "react-router"
import { useAuth } from "../Context/AuthContext"

export const AuthenticatedAminRoutes = ({children, redarectTo='/auth'}) => {
     
    const {loading, isLogged, profile}=useAuth()

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
            </div>
        )
    }

    if(!isLogged || profile?.role !=='admin'){
        return <Navigate to={redarectTo} replace/>
    }

    return children
}
