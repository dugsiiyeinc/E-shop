import React, {
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { deleteArticle, getAllArticles } from "../lib/Article";
import {  Link, Navigate } from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarInset,
    SidebarTrigger,
  }from "@/components/ui/sidebar"
import { Button } from './ui/button'
import { SquarePlus } from 'lucide-react'
import { NavLink } from 'react-router'



import {
  FiAlertTriangle,
  FiEdit2,
  FiEye,
  FiLoader,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";

export const AdminBlogPage = () => {

  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, setTransition] = useTransition();

  const [optimisticArticles, updateOptimisticData] = useOptimistic(
    articles,
    (state, articleToRemove) =>
      state.filter((art) => art.id !== articleToRemove)
  );

  useEffect(() => {
    if (user) {
      fetchinguserArticles();
    } else {
      Navigate("/singin");
    }
  }, [user]);

  // fetching use Articles
  const fetchinguserArticles = async () => {
    try {
      setLoading(true);
      const articls = await getAllArticles();
      setArticles(articls);
      setTotalCount(22);
      
      // console.log("articles uploaded succeesfully,", articls);
    } catch (error) {
      console.log("faile fetching user articles");
      setError(error);
    } finally {
      setLoading(false);
    }
  };
console.log(articles)
 
  const formatData = (dateSatarting) => {
    if (!dateSatarting) return "";

     try {
      const options={  
      year: "numeric",
      month: "short",
      day: "numeric",}

     const date = new Date(dateSatarting);
        
        return date.toLocaleDateString(undefined, options)
     } catch (error) {
       console.error(error);
       
     }
  
    
  };

  const confirmDelete = (article) => {
    setArticleToDelete(article);
  };

  const handleToDelete= async()=>{
  
    if(!articleToDelete) return

    try {
      setIsDeleting(true)
      setTransition(()=> updateOptimisticData(articleToDelete.id))
      const result=deleteArticle(articleToDelete.id)
      setArticles(prev=> prev.filter(art=> art.id !==articleToDelete.id))
      setTotalCount(prev=>  prev -1)
      setArticleToDelete(null)
    } catch (error) {
      console.log(error);
      fetchinguserArticles()
    }finally{
      setIsDeleting(false)
    }
  }

  const publishedArticles = optimisticArticles
  

  return (
    <>
    <SidebarInset className=''>
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                 Welcome to E-shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>/Blogs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
    <div className="flex justify-between items-center my-4 gap-3 flex-wrap sm:px-5 rounded-lg bg-gradient-to-r  from-rose-500 to-rose-100 py-6 text-white mx-4 px-2">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl sm:text-3xl font-medium text-gray-300">
              Manage Your Blogs
            </h1>
            <p className="text-sm text-gray-500">
              Manage your store’s products here — add, edit, or remove listings
              easily.
            </p>
          </div>
          <NavLink to="/admin/editor-blog">
            <Button className={"px-9 cursor-pointer flex items-center"}>
              <SquarePlus className="" /> Add New Product
            </Button>
          </NavLink>
        </div>

       {/* bottom section */}
       <div className="w-full">
       <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-12">

      {/* content */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className=" animate-spin rounded-full border-b-2 border-orange-700 w-12 h-12"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-red-50 border rounded-lg p-6 text-center">
            <FiAlertTriangle className="text-red-600 mb-4" />
            <h3 className="text-red-800 mb-2">{error.messege}</h3>
            <button
              onClick={fetchinguserArticles}
              className=" cursor-pointer mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
            >
              Try again
            </button>
          </div>
        ) : optimisticArticles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md text-center py-6">
            <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <FiPlus className="h-10 w-10 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Articles Yet
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text">
              You havent created any articles yet. Start writing your first
              article and share your knowledge!
            </p>
            <Link
              to={"/editor"}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-xl shadow-md hover:bg-orange-700 transition-colors duration-200"
            >
              <FiPlus className="mr-2" />
              Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* published articles */}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span>All Blogs are here</span>
                {publishedArticles.length > 0 && (
                  <span className="mt-1.5 ml-3 px-2.5 py-0.5 text-green-800 bg-green-100 text-sm font-medium rounded-md">
                    {publishedArticles.length}
                  </span>
                )}
              </h2>

              {publishedArticles.length > 0 ? (
                <div className="bg-white rounded-xl overflow-auto shadow-md">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Data
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Is Published
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {publishedArticles.map((article) => (
                          <tr key={article.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="text-gray-900 truncate max-w-xs text-sm font-medium">
                                {article.title}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="text-gray-500 truncate text-sm">
                                {formatData(article.created_at)}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="text-gray-500 truncate text-sm">
                                {article.publish?'published' :"unpublished"}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="text-gray-500 truncate text-sm">
                                {article.tags[0]}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap ">
                              <div className="flex items-center space-x-3 sm:space-x-5 text-sm">
                                <Link
                                  // to={`/article/${article.id}`}
                                  className="text-orange-600 hover:text-orange-700 rounded-full hover:bg-orange-50 cursor-pointer"
                                >
                                  <FiEye />
                                </Link>
                                <Link
                                  to={`/admin/blogs/${article.id}`}
                                  className="text-gray-600 hover:text-gray-800 rounded-full hover:bg-orange-50 cursor-pointer"
                                >
                                  <FiEdit2 />
                                </Link>

                                <button
                                  onClick={() => confirmDelete(article)}
                                  className="text-red-600 hover:text-red-800 rounded-full hover:bg-red-50 cursor-pointer"
                                >
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                "no articles found"
              )}
            </div>
          </div>
        )}
      </div>
    </div>
       </div>
</SidebarInset>
 {/* delete model */}
 {articleToDelete && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-100">
    <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Comfirm Deletion
      </h3>
      <p className="mb-6  text-gray-600 font-medium">
        Are you sure you want to delete "
        {articleToDelete.title || "Untitled Article"}"? This action
        cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <button
         onClick={()=> setArticleToDelete(null)}
        className=" cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          Cancel
        </button>
        <button 
        onClick={handleToDelete}
        className="cursor-pointer px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-800 transition-colors duration-200 flex items-center">
          {
            isDeleting ?(
              <>
               <FiLoader className=" animate-spin mr-2"/>
               Deleting...
              </>
            ):(
              <>
               <FiTrash2 className="mr-2"/>
               Delete
              </>
            )
          }
        </button>
      </div>
    </div>
  </div>
)}
</>
  )
}
