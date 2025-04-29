import React, { useEffect, useState } from 'react'
import { getBlogsPaginated } from '../lib/Article';
import { Link } from 'react-router-dom';

export const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadBlogs = async (page) => {
    setLoading(true);
    try {
      const { blogs, totalPages } = await getBlogsPaginated(page, 100); // Load all to allow search
      setBlogs(blogs);
      setAllBlogs(blogs);
      setTotalPages(Math.ceil(blogs.length / 6));
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to load blogs:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs(1);
  }, []);

  // Filter blogs by title
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const extractTextFromPTags = (html) => {
    if (!html) return '';
    const matches = html.match(/<(h[1-3]|p)[^>]*>(.*?)<\/\1>/gi);

    return matches
      ? matches.map(tag => tag.replace(/<[^>]+>/g, '')).join(' ')
      : '';
  };
  
  
  
  
  

  // Paginate filtered results
  const blogsPerPage = 6;
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="max-w-full mx-auto px-4 py-10 text-gray-800">

      {/* Header with gradient background */}
      <div className="w-full min-h-[200px] bg-gradient-to-r from-red-500 to-red-300 flex flex-col justify-center  text-white p-10 rounded-xl shadow-lg animate-pulse mb-10">
        <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
        <p className="text-sm md:text-base">Explore insights, tips, and updates on solar tech and sustainability.</p>
      </div>

      {/* Search */}
      <div className=" max-w-6xl mx-auto mb-19">
        <input
          type="text"
          placeholder="Search blog titles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading blogs...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center text-red-500">No blogs found.</div>
      ) : (
        <>
          {/* Blog Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto my-20">
            {paginatedBlogs.map((blog) => (
              <div
              key={blog.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img
                src={blog.featured_image[0].publicUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 text-black line-clamp-2">{blog.title}</h3>
            
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {blog.tags && blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
            
                {/* Clean Paragraph Content */}
                <p className="text-sm text-gray-600 line-clamp-3">
                  {extractTextFromPTags(blog.content?.slice(0, 300))}
                </p>
            
                {/* Read More Link */}
                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-block mt-4 text-red-500 text-sm font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
            
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === i + 1
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
