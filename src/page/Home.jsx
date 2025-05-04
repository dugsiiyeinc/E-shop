import { useState, useEffect } from "react";
import { Link } from "react-router";
import supabase from "../lib/supabase";
import {
  FaSolarPanel,
  FaBatteryFull,
  FaLightbulb,
  FaPlug,
  FaTools,
  FaBolt,
} from "react-icons/fa";
import {
  Eye,
  Heart,
  Truck,
  ShieldCheck,
  Clock,
  PackageCheck,
} from "lucide-react";
import { FaHeart } from "react-icons/fa";
import bunner_solar from "../assets/image (4).jpg";
import { IoCartOutline } from "react-icons/io5";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Home = () => {
  const categories = [
    { name: "Solar Systems", icon: <FaSolarPanel size={30} /> },
    { name: "Inverters", icon: <FaPlug size={30} /> },
    { name: "Batteries", icon: <FaBatteryFull size={30} /> },
    { name: "LED Lights", icon: <FaLightbulb size={30} /> },
    { name: "Controllers", icon: <FaBolt size={30} /> },
    { name: "Accessories", icon: <FaTools size={30} /> },
  ];

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .limit(15);

        if (error) throw error;
        const ShuffledDat = shuffleArray(data);
        setProducts(ShuffledDat);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleProducts();
    getBlogs();

    function shuffleArray(array) {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getBlogs = async () => {
    try {
      const { data, err } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: true });

      setBlogs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const extractTextFromPTags = (html) => {
    if (!html) return "";
    const matches = html.match(/<(h[1-3]|p)[^>]*>(.*?)<\/\1>/gi);

    return matches
      ? matches.map((tag) => tag.replace(/<[^>]+>/g, "")).join(" ")
      : "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className=" animate-spin rounded-full h-12 w-12 border-2 border-b-orange-600  border-t-white border-r-white border-l-white"></div>
      </div>
    );
  }
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  // console.log(blogs)

  return (
    <div className="max-w-7xl mx-auto">
      {/* hero section */}
      <div className="relative flex flex-colrelative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl mt-3 mb-12  items-center ">
        <div className="relative z-10 bg-black/34 bg-opacity-60 w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
            Powering the Future of Electronics
          </h1>
          <p className="text-gray-300 mt-2 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl">
            Discover high-quality controllers, batteries, routers, and
            innovative electronic solutions.
          </p>
          <Link
            to={"/products"}
            className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-400 hover:bg-red-500 text-white rounded-md text-sm sm:text-base transition duration-200 text-center w-full sm:max-w-[200px] "
          >
            Explore Products
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-3">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold mb-2">Flash Sales</h1>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Object.values(timeLeft).map((value, index) => (
                <span
                  key={index}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  {String(value).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link to="/products" className="text-red-600 hover:underline">
          Visit All Products
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-10 px-4 sm:px-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
          >
            <div className="bg-gray-100 h-[250px] rounded-lg mb-3 flex items-center justify-center">
              {product.thumnail_image ? (
                <>
                  <Link
                    to={`/products/${product.id}`}
                    className="h-full object-cover p-1 w-full rounded-md relative"
                  >
                    <img
                      src={product.thumnail_image[0].publicUrl}
                      alt={product.title}
                      className="h-full object-cover  w-full rounded-md hover:scale-110 duration-230 "
                    />
                    <span className="flex flex-col absolute top-2 right-0">
                      <Heart className=" text-gray-600 w-4 font-light" />
                      <Eye className=" text-gray-600 w-4 font-light" />
                    </span>
                  </Link>
                </>
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <h3 className="font-semibold mb-2">{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-600 font-bold">${product.price}</span>
              <span className="text-gray-400 line-through">
                ${product.price * 2}
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400 mb-4">
              ★★★★
            </div>
            <div>
              {product.stock < 1 ? (
                <>
                  <span className="text-red-500 text-sm">( Out of stock )</span>
                </>
              ) : (
                <span className="text-green-400 text-sm">
                  Stock <span className="text-gray-700">({product.stock})</span>
                </span>
              )}
            </div>
            <Link
              to={`/products/${product.id}`}
              className=" cursor-pointer px-3 py-1 border-1 hover:bg-red-100 border-red-500 flex items-center gap-1 text-sm rounded justify-center hover:border-red-700 transition-colors"
            >
              View to cart <IoCartOutline className="text-xl text-red-500" />
            </Link>
            {product.stock < 1 && (
              <TooltipProvider className=" relative ">
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={`/products/${product.id}`}
                      className="bg-gray-200/50 w-full h-full absolute inset-0 "
                    ></Link>
                  </TooltipTrigger>
                  <TooltipContent className="absolute bottom-98 min-w-[250px] bg-red-100">
                    <p className="min-w-full text-red-600">
                      {" "}
                      This product is out of stock
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        ))}
      </div>

      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm text-red-500 font-medium mb-2">Categories</h2>
          <h3 className="text-2xl font-bold mb-6">Browse By Category</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className=" hover:scale-110 cursor-pointer flex flex-col items-center justify-center p-4 border rounded hover:bg-gray-50 transition"
              >
                <div className="text-gray-400 mb-2">{cat.icon}</div>
                <span className="text-sm font-medium text-center">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="my-8">
        <img
          src={bunner_solar}
          alt="bunner_solar"
          className="rounded-lg w-full max-h-[300px]  md:max-h-[450px] object-cover"
        />
      </div>

      {/* blogs   */}
      <section className="py-8 mb-12">
        <div className="container mx-auto px-4">
          <div className="my-6">
            <h2 className="text-2xl font-bold ">Visit Our Blogs</h2>
            <p className="text-sm text-red-500">To get more information</p>
          </div>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-4 ">
            <div className="relative overflow-hidden rounded-lg group md:col-span-2 md:row-span-2 grid grid-rows-[1fr_auto] min-h-[250px] md:min-h-[300px]">
              <img
                src={blogs[0]?.featured_image[0].publicUrl}
                alt={blogs[0]?.title}
                className="absolute inset-0 w-full h-full object-cover row-start-1"
              />
              <div className="p-4 z-10 row-start-2 bg-black/20 backdrop-blur-sm text-white">
                <h3 className="text-lg font-semibold">{blogs[0]?.title}</h3>
                <p className="text-sm">
                  {extractTextFromPTags(blogs[0]?.content?.slice(0, 300))}
                </p>
                <Link to={`blogs/${blogs[0]?.id}`}>
                  <button className="mt-2 px-3 py-1 bg-black text-white rounded text-sm">
                    Visit
                  </button>
                </Link>
              </div>
            </div>

            <div className="min-h-[250px] relative overflow-hidden rounded-lg group md:col-span-2 grid grid-rows-[1fr_auto]">
              <img
                src={blogs[2]?.featured_image[0].publicUrl}
                alt={blogs[2]?.title}
                className="absolute inset-0 w-full h-full object-cover row-start-1"
              />
              <div className="p-4 z-10 row-start-2 bg-black/20 backdrop-blur-sm text-white">
                <h3 className="text-lg font-semibold">{blogs[2]?.title}</h3>
                <p className="text-sm">
                  {extractTextFromPTags(blogs[2]?.content?.slice(0, 300))}
                </p>
                <Link to={`blogs/${blogs[2]?.id}`}>
                  <button className="mt-2 px-3 py-1 bg-black text-white rounded text-sm">
                    Visit
                  </button>
                </Link>
              </div>
            </div>

            <div className=" min-h-[250px] relative overflow-hidden rounded-lg group md:col-span-2 grid grid-rows-[1fr_auto]">
              <img
                src={blogs[1]?.featured_image[0].publicUrl}
                alt={blogs[1]?.title}
                className="absolute inset-0 w-full h-full object-cover row-start-1"
              />
              <div className="p-4 z-10 row-start-2 bg-black/20 backdrop-blur-sm text-white">
                <h3 className="text-lg font-semibold">{blogs[1]?.title}</h3>
                <p className="text-sm">
                  {extractTextFromPTags(blogs[1]?.content?.slice(0, 300))}
                </p>
                <Link to={`blogs/${blogs[1]?.id}`}>
                  <button className="mt-2 px-3 py-1 bg-black text-white rounded text-sm">
                    Visit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-18">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-400 text-white rounded-full mb-4">
              <Truck size={28} />
            </div>
            <h3 className="font-bold text-lg">FAST DELIVERY</h3>
            <p className="text-sm text-gray-700">
              We deliver solar and electronics quickly across Ethiopia.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-400 text-white rounded-full mb-4">
              <PackageCheck size={28} />
            </div>
            <h3 className="font-bold text-lg">SAFE PACKAGING</h3>
            <p className="text-sm text-gray-700">
              All products are securely packed to prevent damage.
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-400 text-white rounded-full mb-4">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-lg">SECURE DELIVERY</h3>
            <p className="text-sm text-gray-700">
              All orders are tracked and delivered safely to your door.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-400 text-white rounded-full mb-4">
              <Clock size={28} />
            </div>
            <h3 className="font-bold text-lg">ON-TIME SERVICE</h3>
            <p className="text-sm text-gray-700">
              We prioritize timely delivery and efficient logistics.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col px-4 sm:px-20 mb-8">
        <h1 className="text-2xl text-black">F&Q</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What products do you offer?</AccordionTrigger>
            <AccordionContent>
              We provide solar irrigation systems, batteries, inverters, charge
              controllers, water pumps, AVRs, home lighting, and electrical
              accessories.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do you offer installation services?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We offer full installation for all solar and electrical
              systems, handled by our expert technicians.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What areas do you serve?</AccordionTrigger>
            <AccordionContent>
              We serve customers across Somali region. Contact us to confirm if
              we cover your area.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent>
              We accept mobile money (like E-biir, Bank), bank transfer,
              credit/debit cards, and cash on delivery.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              Do your products come with a warranty?
            </AccordionTrigger>
            <AccordionContent>
              Yes, most products include a 1 to 2-year warranty. Specific
              details are available on each product page.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              How long does installation take?
            </AccordionTrigger>
            <AccordionContent>
              Most installations are completed within 1 to 3 days, depending on
              the system size and complexity.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
