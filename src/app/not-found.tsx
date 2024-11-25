'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center m-auto">
      <Image src="/404.png" alt="404 image" width={500} className="" height={500} />
      <h2>Oops! page not found</h2>
      <p></p>
      <Link href={"/"} className="bg-green-500 rounded-lg py-2 text-white px-4 w-fit">Back to Home</Link>
    </div>
  );
}
