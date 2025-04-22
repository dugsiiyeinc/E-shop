import { createBrowserRouter } from "react-router";
import App from "./App";
import { Home } from "./page/Home";
import { AboutPage } from "./page/AboutPage";
import ContectPage from "./page/ContectPage";
import CartsPage from "./page/CartsPage";
import CheckOutPage from "./page/CheckOutPage";
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
import { UserOrdes } from "./page/UserOrdes";
import { UserprofileInfo } from "./components/UserprofileInfo";



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
                path:"/admin",
                element:(
                    <AuthenticatedAminRoutes>
                        <AdminDashbord/>
                    </AuthenticatedAminRoutes>
                )
                
            }, 
            {
                path:"/blogEditor",
                element:(
                    <AuthenticatedAminRoutes>
                        <EditorBlog/>
                    </AuthenticatedAminRoutes>
                )
                
            }
        ]
    }
])

export default Router