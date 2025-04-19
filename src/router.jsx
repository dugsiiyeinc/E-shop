import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home } from "./page/Home";
import { AboutPage } from "./page/AboutPage";
import SigingPage from "./page/SigingPage";
import SignUpPage from "./page/SignUpPage";
import ContectPage from "./page/ContectPage";
import CartsPage from "./page/CartsPage";
import CheckOutPage from "./page/CheckOutPage";
import { ProductsPage } from "./page/ProductsPage";
import { ProductDetailPage } from "./page/ProductDetailPage";
import AdminDashbord from "./page/AdminDashbord";
import { BlogsPage } from "./page/BlogsPage";
import { BlogDetails } from "./page/BlogDetails";
import { EditorBlog } from "./page/EditorBlog";


const Router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:"/about",
                element:<AboutPage/>
            },
            {
                path:'/contect',
                element:<ContectPage/>
            },
            {
                path:"/products",
                element:<ProductsPage/>
            },
            {
                path:'/products/:id',
                element:<ProductDetailPage/>
            },
            {
                path:'/blogs',
                element:<BlogsPage/>
            },
            {
                path:'/blogs/:id',
                element: <BlogDetails/>
            },

            // un authenticated
            {
                path:'/signin',
                element:<SigingPage/>
            },
            {
                path:'/signup',
                element:<SignUpPage/>
            },
           
            // Authenticated
            {
                path:"/cart",
                element:<CartsPage/>
            }, 
            {
                path:'/checkOut',
                element:<CheckOutPage/>
            },
           
           
            {
                path:"/admin",
                element:<AdminDashbord/>
            }, 
            {
                path:"/blogEditor",
                element:<EditorBlog/>
            }
        ]
    }
])

export default Router