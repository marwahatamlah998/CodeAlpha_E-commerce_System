"use client";

import {  useRouter } from "next/navigation";



const Navigation = () => {
  const navigate = useRouter();

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">

      <button
     onClick={(()=>{
      navigate.back()
      
     })}
        className="text-sm font-medium text-gray-700 hover:text-black transition"
      >
        ← Back
      </button>

      <div className="flex items-center gap-6 text-sm font-medium">

        <a href="/home" className="hover:text-black text-gray-600 transition">
          Home
        </a>

        <a href="/about" className="hover:text-black text-gray-600 transition">
          About
        </a>

        <a href="/features" className="hover:text-black text-gray-600 transition">
          Features
        </a>

        <a href="/products" className="hover:text-black text-gray-600 transition">
          Shop
        </a>

      </div>
    </nav>
  );
};

export default Navigation;