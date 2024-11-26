import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'

export default function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center m-auto">
    <Image src="/emptycart.jpg" alt="404 image" width={300} className="" height={300} />
    <h2>Oops! No Item found in this category</h2>
    <p></p>
    {/* <Link href={"/"} className="bg-green-500 rounded-lg py-2 text-white px-4 w-fit">Back to Home</Link> */}
  </div>  )
}
