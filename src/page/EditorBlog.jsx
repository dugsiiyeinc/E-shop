import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiInfo, FiSave, FiTag, FiX } from "react-icons/fi";
import { QuillEditor } from "../components/Quill";
import { Navigate, useNavigate, useParams } from "react-router";
import { deleteImage, uploadImage } from "../lib/storage";
import { createErticle, getArticleById, updateRticle } from "../lib/Article";
import { useAuth } from "../Context/AuthContext";

export const EditorBlog = () => {
  const { id } = useParams();
  const isEdintongMode = Boolean(id);
  const dropdownRef = useRef(null);
  const navigaete=useNavigate()

  // states for article data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [Error, setError] = useState(null);

  // states for image uplaod
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUplaoding, setIsUplaoding] = useState(false);
  const [imagePath, setImagePath] = useState("");

  const { user } = useAuth();

  const fileInputRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (isEdintongMode) {
      const fechAricle = async () => {
        try {
          const article = await getArticleById(id);
          console.log(article)

          if (!article) return;

          setTitle(article.title);
          setSelectedTags(article.tags);
          setContent(article.content);
          setIsPublished(article.published || false);

          if (article.featured_image) {
            setFeaturedImageUrl(article.featured_image[0]);
          } else {
            setFeaturedImageUrl(null);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fechAricle();
    }
  }, [id, user.id, isEdintongMode]);

  const addNewTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      // check fiilw type
      if (!file.type.startsWith("image/")) {
        toast.error("please select an image file");
        setSelectedImage(null);
        e.target.value = "";
        return;
      }

      // check file size
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(
          `image size (${(file.size / 1024 / 1024).toFixed(
            2
          )}MP) exeeds 2MP limit`
        );
        setSelectedImage(null);
        e.target.value = "";
        return;
      }

      setSelectedImage(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) {
      toast.error("Please select image");
      return;
    }

    if (!user) {
      Navigate("/singin");
      return;
    }

    // upoald image
    setIsUplaoding(true);
    try {
      const { filePath, publicUrl } = await uploadImage(selectedImage, user.id);
      console.log("image uploading successfylly", { filePath, publicUrl });

      setFeaturedImageUrl({ publicUrl, filePath });
      setImagePath(filePath);

      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return { publicUrl, filePath };
    } catch (error) {
      console.log("Error image uploading");
    } finally {
      setIsUplaoding(false);
    }
  };

  const handleSave = async (publishMode = null) => {
    setError(null);
    if (!title.trim()) {
      setError((prev) => ({ ...prev, title: "Please add article title" }));
      return;
    }

    if (!content || content === "<p><br></p>") {
      setError((prev) => ({ ...prev, content: "Please add article title" }));
      return;
    }

    let uploadedImageData = null;

    // check if there is image that hant been uploaded
    if (selectedImage) {
      const shouldUpload = confirm(
        "You have selected image that hasn`t been uploaded yet. Whould you like to upload it now?"
      );

      if (shouldUpload) {
        setIsUplaoding(t);
        try {
          uploadedImageData = await handleUploadImage();

          // await a moment for state to update
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          toast.error("Failed to upload image during save,", error);
          console.log(error);
          throw error;
        }
      } else {
        const ShouldProceed = confirm(
          "Do you want to proceed without Uploading image?"
        );
        if (!ShouldProceed) {
          return;
        }

        setSelectedImage(null);
        if (fileInputRef.current) {
          fileInputRef.current.value - "";
        }
      }
    }

    setIsSaving(true);
    // console.log('starting aarticle save with states:',{
    //   isEdintongMode,
    //   featuredImageUrl,
    //   imagefilePath,
    //   selectedImage,
    //   uploadedImageData
    // });

    try {
      const published = publishMode !== null ? publishMode : isPublished;

      // image path and url
      const currentImageUrl = uploadedImageData?.publicUrl || featuredImageUrl;
      const currentImagePath = uploadedImageData?.filePath || imagePath;

      // console.log('current image  states:',{
      //   featuredImageUrl:currentImageUrl,
      //   imagePath:currentImagePath,
      //   selectedImage,
      // })

      const articeleData = {
        title,
        published,
        content,
        tags: selectedTags,
        authorId: user.id,
        featuredImageUrl,
      };
      // console.log('saveing article data');
      let savedArticle;

      if (isEdintongMode) {
        // update fucntion
        savedArticle = await updateRticle(id, articeleData);
        cleanUp()
      } else {
        savedArticle = await createErticle(articeleData);
        cleanUp()
      }
      console.log("article saved successfully", savedArticle);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  // tags
  const tags = [
    "Solar Products",
    "Solar Batteries",
    "Solar Irrigation Systems",
    "Solar Water Pumps",
    "Home Solar Kits",
    "Electrical Wiring Supplies",
    "Off-Grid Solar Solutions",
    "Energy Storage Batteries",
    "Solar Power Accessories",
    "Renewable Energy Systems",
  ];
  // Handle clicks outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTagMenuOpen(false); // Click outside -> close menu
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveImg = async () => {
    if (!featuredImageUrl) return;
    let bucket = "blogimg";
    try {
      await deleteImage(featuredImageUrl.filePath, bucket);
      setFeaturedImageUrl(null);
    } catch (error) {
      console.error(error);
    }
  };


  const cleanUp=()=>{
    setContent('')
    setFeaturedImageUrl(null)
    setError(null)
    setTitle('')
    setSelectedTags([])
    navigaete('/admin/blogs')
  }

  return (
    <SidebarInset className="">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Welcome to E-shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>/Add or Edit Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="w-full ">
        <div className=" px-4 py-8 min-h-screen">
          {/* header section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="font-bold text-2xl text-gray-800 mb-4 md:mb-0">
              {isEdintongMode ? "Edit Article" : "Create New Article"}
            </h1>

            {/* buttons */}
            <div className="flex gap-4 flex-wrap">

            <button
                onClick={() => handleSave(false)}
                className="text-sm sm:text-md px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 hover:bg-gray-50 cursor-pointer "
              >
                {isEdintongMode ? "Update as Draft" : "Save as Draft"}
              </button>

              <button
                onClick={() => handleSave(true)}
                type="button"
                disabled={isSaving}
                className="flex items-center justify-center gap-2 text-sm sm:text-md px-4 py-2 rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:bg-gray-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed  transition-all duration-300 ease-in-out"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <><FiSave className="inline mr-1" />
                    {isEdintongMode ? "Update and Publish" : "Save and Publish"}
                  </>
                )}
              </button>

            </div>
          </div>

          {/* title input */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="text-sm block font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-orange-500 focus:border-gray-500 sm:text-sm"
              placeholder="Enter article title"
            />

            {Error?.title && (
              <p className="text-sm text-orange-500">{Error.title}</p>
            )}
          </div>

          {/* featured image */}
          <div className="mb-6">
            <label className="text-sm text-gray-600 block mb-2">
              Featured Image
              <button
                type="button"
                className="ml-2 text-xs text-gray-500 hover:text-gray-700"
              >
                <FiInfo
                  onClick={() =>
                    toast("Maximum image size allowed is 5MP", {
                      position: "top-right",
                    })
                  }
                  className="inline-block"
                />
              </button>
            </label>
          </div>

          {/* imgaw uplaod ui */}
          <div className="mb-6">
            <div className="flex  space-y-2 items-start">
              <input
                onChange={handleImage}
                ref={fileInputRef}
                type="file"
                id="featured-image"
                accept="image/*"
                className="mr-4 text-sm text-gray-500 file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 hover:file:bg-gray-200 file:cursor-pointer file:text-orange-700"
              />
              {selectedImage && (
                <button
                  onClick={async () => {
                    try {
                      await handleUploadImage();
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  type="button"
                  className="px-4 py-2 rounded cursor-pointer bg-black text-sm hover:bg-gray-800 text-white font-medium"
                >
                  Upload
                </button>
              )}
            </div>
          </div>

          {/* display currently stored image */}
          {featuredImageUrl && (
            <div className="mb-4 mt-2">
              <img
                src={featuredImageUrl.publicUrl}
                alt="featured img"
                className="w-full max-h-64 object-cover rounded-md"
              />
              <div className="flex items-center justify-between mt-1 space-x-4 flex-wrap sm:flex-nowrap">
                <span className="text-xs font-semibold text-gray-400 ">
                  {featuredImageUrl.publicUrl}
                </span>
                <button
                  onClick={handleRemoveImg}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm cursor-pointer hover:bg-red-100 rounded-md py-1"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6 relative">
            <label className="block text-sm text-gray-600 font-semibold mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2 items-center">
              {selectedTags.length > 0 &&
                selectedTags.map((selectedTag) => (
                  <span
                    className="font-semibold inline-flex items-center px-2.5 py-0.5 bg-orange-100 text-orange-800 cursor-pointer rounded-full text-sm"
                    key={selectedTag}
                  >
                    {selectedTag}
                    <button
                      onClick={() => addNewTag(selectedTag)}
                      className=" ml-2 inline-flex text-orange-400 hover:text-orange-600 cursor-pointer"
                    >
                      <FiX />
                    </button>
                  </span>
                ))}
            </div>
            {/*add tag button  */}
            <button
              onClick={() => setIsTagMenuOpen(!isTagMenuOpen)}
              className="mt-1 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-0 focus:border-gray-200 rounded-md cursor-pointer"
            >
              <FiTag className="mr-1.5 h-4 w-4" />
              Add Tags
            </button>

            {isTagMenuOpen && (
              <div className="absolute z-10 mt-1 w-full max-w-md border border-gray-300 rounded-xl p-3 overflow-auto bg-white shadow-lg max-h-60">
                {tags.length > 0 && (
                  <div className="grid grid-cols-2 gap-3" ref={dropdownRef}>
                    {tags.map((tag) => (
                      <span
                        onClick={() => addNewTag(tag)}
                        className={`cursor-pointer select-none text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 
                    ${
                      selectedTags.includes(tag)
                        ? "bg-orange-100 text-orange-600 border border-orange-400"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black"
                    }`}
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* react Quil */}
          <div className="mb-6 ">
            <label className="block text-sm text-gray-600 font-semibold mb-1">
              Content
            </label>
            <div className="rounded-md overflow-hidden border-b-1 border-b-gray-300">
              {Error?.content && (
                <p className="text-sm text-orange-500">{Error.content}</p>
              )}
              <QuillEditor
                ref={editorRef}
                value={content}
                onChange={handleContentChange}
                placeholder={"Write your article content here..."}
                height="500"
              />
            </div>
            <div className="my-7 flex justify-end space-x-3">
              <button
                onClick={() => handleSave(false)}
                className="text-sm sm:text-md px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-0 hover:bg-gray-50 cursor-pointer "
              >
                {isEdintongMode ? "Update as Draft" : "Save as Draft"}
              </button>

              <button
                onClick={() => handleSave(true)}
                type="button"
                disabled={isSaving}
                className="flex items-center justify-center gap-2 text-sm sm:text-md px-4 py-2 rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 hover:bg-gray-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed  transition-all duration-300 ease-in-out"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <><FiSave className="inline mr-1" />
                    {isEdintongMode ? "Update and Publish" : "Save and Publish"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};
