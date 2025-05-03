import React from 'react'
import { Link } from 'react-router'
import { Users, Building2, SunMedium, Award } from 'lucide-react';
import bannerImage from "@/assets/image (1).jpg";
import img2 from "@/assets/image.jpg";

export const AboutPage = () => {
  return (
    <div className="px-4 sm:px-10 py-10 max-w-7xl mx-auto text-gray-800 font-sans">

    {/* Breadcrumb */}
    <div className="text-sm text-gray-500 mb-6">
      <Link to="/" className="hover:underline">Home</Link> / <span className="text-black font-medium">About</span>
    </div>

    {/* Hero Section */}
    <section className="flex flex-col lg:flex-row items-center gap-10 mb-20 mt-10">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl font-extrabold text-black leading-snug">Empowering a Greener Tomorrow</h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our company is dedicated to providing smart, sustainable energy solutions. We specialize in the installation and distribution of solar irrigation systems, solar-powered pumps, solar batteries, and all supporting electronics for energy independence.
        </p>
        <p className="text-gray-600 text-base">
          From residential rooftops to full agricultural irrigation, our experienced team has completed hundreds of successful projects. We believe in affordable, renewable energy for everyone — and we’re just getting started.
        </p>
      </div>
      <img
        src={img2}
        alt="Our Team"
        className="w-full lg:w-[500px] rounded-2xl shadow-xl"
      />
    </section>

    <section className='mb-20'>
    <div className="bg-gradient-to-br from-white to-gray-100 py-16 px-6 md:px-16 lg:px-24 rounded-3xl shadow-2xl">
  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center leading-tight">
    Who We Are & What We Do
  </h2>

  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-justify">
    At <span className="font-semibold text-black">SolTech Energy Solutions</span>, we’re more than just a solar company — we’re a passionate team of engineers, designers, and energy specialists dedicated to changing lives through smart, clean, and sustainable energy technologies. From advanced <span className="text-black font-medium">solar irrigation systems</span> that transform agriculture, to <span className="text-black font-medium">off-grid solar setups</span> that light up homes in remote villages, our mission is rooted in impact and innovation.
  </p>

  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-justify">
    We offer a wide range of services and products: <span className="text-black font-medium">solar panels</span>, <span className="text-black font-medium">charge controllers</span>, <span className="text-black font-medium">inverters</span>, <span className="text-black font-medium">solar batteries</span>, and <span className="text-black font-medium">custom installation solutions</span> for homes, farms, schools, and industries. Whether you're looking to reduce your energy costs, switch to clean energy, or ensure uninterrupted power supply, we provide turnkey solutions tailored to your goals.
  </p>

  <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 mt-12">
    Our Experience & Expertise
  </h3>

  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-justify">
    With over <span className="font-semibold text-black">7 years of hands-on experience</span>, our team has completed more than <span className="text-black font-medium">120+ solar projects</span> across various sectors. From powering irrigation systems in rural communities to installing advanced solar solutions for companies and NGOs, we understand the unique energy challenges in different environments. Our experience allows us to design intelligent systems that are not only technically sound, but also financially efficient and scalable for the future.
  </p>

  <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 mt-12">
    Our Vision for a Brighter Future
  </h3>

  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-justify">
    At the core of our work is a powerful vision: <span className="text-black font-medium">a future where clean, renewable energy is accessible to everyone — everywhere</span>. We believe that solar power is more than a utility — it's a right. Our commitment is to ensure that no school, hospital, farm, or home is left in the dark due to lack of infrastructure. We are actively working with partners, communities, and innovators to bring sustainable energy to even the most hard-to-reach regions.
  </p>

  <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6 mt-12">
    Quality That Speaks for Itself
  </h3>

  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-justify">
    Every product we offer is selected with precision and tested for durability. We work only with <span className="font-semibold text-black">internationally certified suppliers</span>, and we carry out rigorous quality checks before any item reaches our customers. Our <span className="text-black font-medium">installation process</span> follows global safety and efficiency standards, and we proudly offer <span className="text-black font-medium">after-sales support</span> and warranty coverage. When you choose us, you’re investing in a solution that lasts, performs, and pays for itself over time.
  </p>

  <div className="bg-yellow-100 border-l-4 border-yellow-400 p-6 rounded-xl shadow-md mt-12">
    <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
      🌞 Powered by passion. Driven by innovation. Trusted by communities.
    </p>
  </div>

  <div className="mt-16 text-center">
    <p className="text-lg md:text-xl text-gray-600">
      Ready to join the solar revolution? <span className="font-bold text-gray-800">Let’s power your future — together.</span>
    </p>
  </div>
</div>

    </section>

    {/* Company Stats */}
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 text-center">
      {[
        ['Projects Delivered', '200+', <Building2 className="mx-auto w-6 h-6 text-red-500" />],
        ['Happy Clients', '150+', <Users className="mx-auto w-6 h-6 text-red-500" />],
        ['Installed Systems', '300+', <SunMedium className="mx-auto w-6 h-6 text-red-500" />],
        ['Years of Experience', '8+', <Award className="mx-auto w-6 h-6 text-red-500" />],
      ].map(([label, stat, icon]) => (
        <div key={label} className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition">
          {icon}
          <p className="text-3xl font-bold text-red-600 mt-2">{stat}</p>
          <p className="text-sm text-gray-600 mt-1">{label}</p>
        </div>
      ))}
    </section>

    {/* Testimonials */}
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-10 text-center">What Our Clients Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: 'AgriFarm PLC',
            feedback: 'They installed a full solar irrigation system for our farm — reliable and efficient!',
            logo: '/logos/agrifarm.png',
            icon: <SunMedium className="text-red-500 w-6 h-6" />
          },
          {
            name: 'City Hospital',
            feedback: 'We now run 70% on solar thanks to their energy team. Cost-effective and clean!',
            logo: '/logos/hospital.png',
            icon: <Building2 className="text-red-500 w-6 h-6" />
          },
          {
            name: 'TechZone Electronics',
            feedback: 'They supplied and installed solar backup for our retail branches. Highly recommended.',
            logo: '/logos/techzone.png',
            icon: <Users className="text-red-500 w-6 h-6" />
          },
        ].map(({ name, feedback, logo, icon }) => (
          <div key={name} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition space-y-4">
            <div className="flex items-center gap-4">
              <img src={bannerImage} alt={name} className="w-12 h-12 object-contain rounded-lg" />
              <div className="text-gray-800 font-semibold">{name}</div>
            </div>
            <div className="text-gray-600 italic text-sm flex items-start gap-2">
              {icon}
              <span>"{feedback}"</span>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Call to Action */}
    <section className="bg-red-500 text-white rounded-2xl px-8 py-12 text-center">
      <h3 className="text-2xl font-semibold mb-2">Ready to Power Your Project?</h3>
      <p className="mb-6 text-sm sm:text-base">
        We design and deliver customized solar solutions for homes, farms, and businesses.
      </p>
      <Link
        to="/contact"
        className="inline-block bg-white text-red-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
      >
        Get in Touch
      </Link>
    </section>
  </div>
  )
}
