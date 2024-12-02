import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa'


export default function Page({}) {
  return (
    <div>
        <div
        className="h-20 bg-cover bg-center flex items-center px-6"
        style={{
          backgroundImage: `url('/images/organic.jpeg')`,
        }}
      >
        {/* Breadcrumbs */}
        <nav className="text-sm text-white">
          <ul className="flex items-center space-x-2">
           
            <li>
              <Link href="/" className="hover:underline">
              <FaHome />

              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-green-200">About</li>
          </ul>
        </nav>
      </div>
      <section className="bg-green-100 py-16">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Text Content */}
    <div className="text-center md:text-left">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        100% Trusted Agricultural Marketplace
      </h1>
      <p className="text-gray-700 mb-6">
        Agro-Splash connects farmers and buyers to promote fresh, locally-grown produce. Experience a transparent and sustainable agricultural ecosystem.
      </p>
    </div>
    {/* Image */}
    <div>
      <Image
            width={500}
            height={500}
        src="/images/smiling-farmer.jpg"
        alt="Farmer Smiling"
        className="rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>
<section className="py-16 bg-white">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    {/* Image */}
    <div>
      <Image
            width={500}
            height={500}
        src="/images/market.jpg"
        alt="Organic Farmer"
        className="rounded-lg shadow-lg"
      />
    </div>
    {/* Text Content */}
    <div className="text-center md:text-left">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Trusted Marketplace for Farmers
      </h2>
      <p className="text-gray-700 mb-6">
        Agro-Splash ensures that every product listed is organic and locally sourced. We value your trust and provide premium quality goods from verified farmers.
      </p>
      <ul className="space-y-4">
        <li className="flex items-center">
          ✅ Fresh Organic Produce
        </li>
        <li className="flex items-center">
          ✅ Transparent Transactions
        </li>
        <li className="flex items-center">
          ✅ Community Feedback
        </li>
        <li className="flex items-center">
          ✅ Secure Payment Options
        </li>
      </ul>
    </div>
  </div>
</section>
<section className="bg-green-50 py-16">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-600 mb-4">
      From Our Farms to Your Doorstep
    </h2>
    <p className="text-gray-700 mb-6">
      Agro-Splash offers seamless delivery services to ensure fresh produce reaches you on time. We guarantee satisfaction with every order.
    </p>
    <Image
            width={500}
            height={500}
      src="/images/deliveryPerson.jpg"
      alt="Delivery Person"
      className="rounded-lg shadow-lg mx-auto"
    />
  </div>
</section>
<section className="py-16 bg-white">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-green-600 mb-4">Meet Our Team</h2>
    <p className="text-gray-700 mb-6">
      Our dedicated team ensures every product and service is of the highest quality, fostering a sustainable future for agriculture.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Team Member */}
      {[
        { name: "Jenny Wilson", role: "CEO & Founder", image: "/images/jenny.jpg" },
        { name: "Jane Cooper", role: "Field Worker", image: "/images/jane.jpg" },
        { name: "Cody Fisher", role: "Researcher", image: "/images/cody.jpg" },
        { name: "Robert Fox", role: "Farm Manager", image: "/images/robert.jpg" },
      ].map((teamMember) => (
        <div
          key={teamMember.name}
          className="bg-gray-100 rounded-lg shadow-lg p-4"
        >
          <Image
            width={500}
            height={500}
            src={teamMember.image}
            alt={teamMember.name}
            className="rounded-full w-24 h-24 mx-auto mb-4"
          />
          <h3 className="text-lg font-bold text-green-600">{teamMember.name}</h3>
          <p className="text-gray-600">{teamMember.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  )
}