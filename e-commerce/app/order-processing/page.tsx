"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderConfirmation = () => {
  const router = useRouter();

  const orderProcessing = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/products");
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <ToastContainer />

      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-3xl">✔</span>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Order Confirmed
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you! Your order has been placed successfully.
        </p>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          Order ID: <span className="font-semibold text-black">#123456</span>
        </div>

        <div className="mt-8 flex flex-col gap-3">

          <button
            className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            onClick={orderProcessing}
          >
            Continue Shopping
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmation;