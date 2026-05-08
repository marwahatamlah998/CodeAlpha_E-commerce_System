"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navigation from "../components/Navigation";

const Checkout = () => {


  const checkout2 = async () => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    body: JSON.stringify({
      items: [
        { name: "T-Shirt", price: 20, quantity: 2 },
      ],
    }),
  });

  const data = await res.json();

  window.location.href = data.url;
};

const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'WALLET' | 'COD'>('CARD');
  const router = useRouter();

  const orderProcessing = () => {
    // const token = localStorage.getItem("token");
    if (true) {
      router.push(`/order-processing`);
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          {/* Top section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Shipping Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

              <div className="flex flex-col gap-4">
                <input
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
                />

                <input
                  placeholder="Address 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
                />

                <input
                  placeholder="Address 2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
                  />

                  <input
                    placeholder="State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
                  />
                </div>

                <input
                  placeholder="Zip Code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-100 rounded-xl p-6 h-fit">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <p>Subtotal</p>
                <p>€0.00</p>
              </div>

              <div className="flex justify-between mb-2">
                <p>Shipping</p>
                <p>€5.00</p>
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <p>Total</p>
                <p>€0.00</p>
              </div>

              <button
                className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                onClick={checkout2}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Payment */}
          <div className="flex flex-col gap-4 mb-6 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            <div className="Mpayment flex gap-5 w-[400px] h-[80px] ">
              <button
                onClick={() => setPaymentMethod("card")}
                className="px-5 py-2.5  text-black font-medium border border-gray-300 rounded-xl
                     active:scale-95 transition duration-200 
                       focus:outline-none focus:ring-2 focus:ring-black-400"
              >
                Card
              </button>

              <button
                onClick={() => setPaymentMethod("wallet")}
                className="px-5 py-2.5  text-black font-medium border border-gray-300 rounded-xl
                   active:scale-95 transition duration-200 
                   focus:outline-none focus:ring-2 focus:ring-black-400"
              >
                Wallet
              </button>

              <button
                onClick={() => setPaymentMethod("cod")}
                className="px-5 py-2.5  text-black font-medium border border-gray-300 rounded-xl
                   active:scale-95 transition duration-200 
                   focus:outline-none focus:ring-2 focus:ring-black-400"
              >
                $COD
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Name on Card"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
              />

              <input
                placeholder="Card Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
              />

              <input
                placeholder="Expiry (MM/YY)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
              />

              <input
                placeholder="CVV"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl 
  bg-white text-black placeholder-gray-400
  focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10
  transition duration-200"
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Checkout;
