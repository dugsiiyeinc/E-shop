import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home } from "./page/Home";
import { AboutPage } from "./page/AboutPage";
import ContectPage from "./page/ContectPage";
import CartsPage from "./page/CartsPage";
import { ProductsPage } from "./page/ProductsPage";
import { ProductDetailPage } from "./page/ProductDetailPage";
import AdminDashbord from "./page/AdminDashbord";
import { BlogsPage } from "./page/BlogsPage";
import { BlogDetails } from "./page/BlogDetails";
import { EditorBlog } from "./page/EditorBlog";
import { AuthPage } from "./page/AuthPage";
import { UnAuthtenticatedRout } from "./components/UnAuthtenticatedRout";
import { AuthenticatedRoutes } from "./components/AuthenticatedRoutes";
import { AuthenticatedAminRoutes } from "./components/AuthenticatedAdminRoute";
import { UserProfile } from "./page/UserProfile";
import { UserprofileInfo } from "./components/UserprofileInfo";
import { Right } from "@/components/Right";
import { ProductspageAdmin } from "./components/ProductspageAdmin";
import { OrdersPageAdmin } from "./components/OrdersPageAdmin";
import { Users } from "./components/Users";
import { AdminProfile } from "./components/AdminProfile";
import { AdminBlogPage } from "./components/AdminBlogPage";
import { AddNewProduct } from "./components/AddNewProduct";
import { CheckOut } from "./page/CheckO";
import UserOrdes from "./page/UserOrdes";
import { OrderDetails } from "./page/OrderDetails";




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
                path:'/contact',
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
                path: '/auth',
                element: (
                  <UnAuthtenticatedRout>
                    <AuthPage/>
                  </UnAuthtenticatedRout>
                ),
              },
              
            {
                path:'/singin',
                element:<AuthPage/>
            },
           
           
            // Authenticated
            {
                path:"/userProfile",
                element: (
                    <AuthenticatedRoutes>
                        <UserProfile/>
                    </AuthenticatedRoutes>
                ),
            }, 
            {
                path:"/cart",
                element: (
                    <AuthenticatedRoutes>
                        <CartsPage/>
                    </AuthenticatedRoutes>
                ),
            }, 
            {
                path: "/userProfile",
                element: (
                  <AuthenticatedRoutes>
                    <UserProfile />
                  </AuthenticatedRoutes>
                ),
                children: [
                  {
                    index: true,
                    element: <UserprofileInfo />, 
                  },
                  {
                    path: "orders",
                    element: <UserOrdes />, 
                  },
                ],
              },
              
              {
                path: "checkOut",
                element:(
                    <AuthenticatedRoutes>
                        <CheckOut /> 
                    </AuthenticatedRoutes>
                    )
              },
           
            {
                path:"/admin",
                element:(
                    <AuthenticatedAminRoutes>
                        <AdminDashbord/>
                        
                    </AuthenticatedAminRoutes>
                ), 
                children:[
                    {
                        index:true,
                        element:<Right/>
                    },
                    {
                        path:'products',
                        element:<ProductspageAdmin/>
                    },
                    {
                        path:'orders',
                        element:<OrdersPageAdmin/>
                    },
                    {
                     path:"orders/:id",
                     element:<OrderDetails/>
                    },
                   
                    {
                        path:"users",
                        element:<Users/>
                    },
                    {
                        path:'blogs',
                        element:<AdminBlogPage/>
                    },
                    {
                        path:'editor-blog',
                        element:<EditorBlog/>
                    },
                    {
                        path:'blogs/:id',
                        element:<EditorBlog/>
                    },
                    {
                        path:'profile',
                        element:<AdminProfile/>
                    },
                    {
                        path:"addProduct",
                        element:<AddNewProduct/>
                    },
                    {
                        path:"products/:editProduct",
                        element:<AddNewProduct/>
                    }
                ]
                
            }, 
            
        ]
    }
])

export default Router