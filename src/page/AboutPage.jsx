import React from 'react'
import { Link } from 'react-router'
import { Users, Building2, SunMedium, Award } from 'lucide-react';

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
        src="/solar-team.jpg"
        alt="Our Team"
        className="w-full lg:w-[500px] rounded-2xl shadow-xl"
      />
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
              <img src={logo} alt={name} className="w-12 h-12 object-contain" />
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
