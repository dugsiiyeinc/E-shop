import { Link, useParams } from "react-router";
import { FiCalendar } from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";
import { getArticleById } from "../lib/Article";
import { useEffect, useState } from "react";


export const BlogDetails = () => {
  const { id } = useParams();
  const { user, profile } = useAuth();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(article);
  

  useEffect(() => {
    const fechAricle = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const article = await getArticleById(id);

        setArticle(article);
      } catch (error) {
        console.error(error);
        error;
      } finally {
        setLoading(false);
      }
    };

    fechAricle();
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className=" animate-spin rounded-full border-4  border-t-white border-b-white border-l-white border-orange-700 w-12 h-12"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center p-2 min-h-96 flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800">Article not found</h2>
        <p className="mt-2 text-gray-600 text-sm">
          The article you are lookin for does't exist or has been removed.
        </p>
        <Link
          to={"/articles"}
          className="text-sm mt-4 inline-block text-blue-600 hover:underline"
        >
          Browse all articles
        </Link>
      </div>
    );
  }


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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* hero image */}
      
      {article?.featured_image && (
        <div className="relative w-full h-[60vh]">
          <img
            src={article.featured_image[0].publicUrl}
            alt={article.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t opacity-60 from-gray-950 to-transparent"></div>
        </div>
      )}

      <div
        className={`relative ${
          article.featured_image ? "-mt-32" : "pt-10"
        } px-1 sm:px-0`}
      >
        
        <article className="max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white z-50 p-4">
          {/* article header */}
          <div className="-mb-4 mt-6 px-4">
          <Link to={'/blogs'} className="text-sm text-gray-400 mt-10 underline hover:text-gray-600">/Go back to Blogs</Link>
          </div>
          <div className="px-4 py-7 md:py-10">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {article?.tags?.length > 0 &&
                article.tags.map(tag => (
                  <Link
                  key={tag}
                    className=" ml-2 inline-flex text-orange-600 bg-orange-100 px-3 rounded text-sm hover:text-orange-800 cursor-pointer"
                  >
                    {tag}
                  </Link>
                ))}
            </div>

            {/* title  */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>


            {/* author */}
            <div className="flex my-4items-center gap-3 border-b border-gray-100 pb-5">
              <img src={profile?.avatar_url || 'https://placehold.co/150'} alt="avatar"  className="h-12 w-12 rounded-full object-cover"/>
              <div className="flex flex-col gap-0 text-sm">
                <Link >
                 <strong className="text-gray-700 capitalize  font-medium cursor-pointer  hover:underline">{profile?.name}</strong>
                </Link>
                <span className="text-gray-600 flex items-center text-xs">
                  <FiCalendar className="mr-2"/>
                  {formatData(article.created_at)}
                </span>
              </div>
            </div>
          </div>
          {/* article content */}
          <div className="px-3 md:px-6 pb-10">
            <div className=" prose prose-lg prose-orange max-w-none"
            dangerouslySetInnerHTML={{__html: article.content}}
            ></div>
          </div>
        </article>
      </div>
    </div>
  );
}
