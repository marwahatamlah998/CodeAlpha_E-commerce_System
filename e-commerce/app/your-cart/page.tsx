"use client";
import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";


type CartItem = {
  id?:number
  productname?: string;
  price?: number;
  image?: string;
  quantity?: number;
};

const YourCart = () => {
  const token = localStorage.getItem("token");

  const [count, setCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const { carts, setCarts } = useContext(AuthContext);
  const [uid, setUID] = useState<null | string | number>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  console.log(" carts", carts);


  const deleteCartItem = (id: number) => {
    console.log(id)
    axios
      .delete(`http://localhost:5001/api/cartItems/`+id)
      .then((res) => {
        console.log("res", res);
        Swal.fire({
          title: "the Product Deleted!",
          text: "Your Product has been Deleted successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          window.location.reload();
        });
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
      // toast.error("The product already has been added");
      });
  };

  const checkout2 = async (items: any) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();

    console.log("data:", data);

    if (data.url) {
      window.location.assign(data.url);
    }
  };
  const subtotal = carts.reduce((acc, item) => {
    return acc + Number(item.price) * Number(item.quantity);
  }, 0);
  console.log(subtotal);
  const shipping = 5;
  const total = subtotal + shipping;

  const updateQuantity = (index: number, value: number) => {
    setCarts((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: value } : item,
      ),
    );
  };

  const getCarts = () => {
    axios.get(`http://localhost:5001/api/carts/${uid}`).then((res) => {
      console.log("res", res.data);
      //setCarts(res.data);
      setCarts(res.data);

      // console.log([...posts, res.data.jobs])
    });
  };

  useEffect(() => {
    const storedUID = localStorage.getItem("userId");

    if (storedUID) {
      setUID(storedUID);
    }
  }, []);

  useEffect(() => {
    if (!uid) return;
    getCarts();
  }, [uid]);

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-4xl font-semibold mb-6">
              Your Cart {carts.firstname}
            </h1>

            {carts?.length >= 1 ? (
              <div className="space-y-4">
                {carts?.map((e, i) => {
                  return (
                    <div key={i}>
                      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-6">
                        <img
                          src={e.image}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                        />

                        <div className="flex-1">
                          <h3 className="font-medium">{e.productname}</h3>
                          <p className="text-gray-500 text-sm">Category</p>
                        </div>

                        <div className="text-sm">
                          <p className="font-semibold">{e.price}€</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-lg"
                            onClick={() => updateQuantity(i, e.quantity - 1)}
                          >
                            -
                          </button>
                          <span>{e.quantity}</span>
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-lg"
                            onClick={() => updateQuantity(i, e.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => deleteCartItem(e.id)}>
                          X
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>No Carts...</div>
            )}
          </div>

          <div className="w-full lg:w-[350px]">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2 text-gray-600">
                <p>Subtotal</p>
                <p>{Number(subtotal).toFixed(2)}€</p>
              </div>

              <div className="flex justify-between mb-2 text-gray-600">
                <p>Shipping</p>
                <p>€5.00</p>
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                <p>Total</p>
                <p>{Number(total).toFixed(2)}€</p>
              </div>

              <button
                className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                onClick={() => {
                  const itemsForCheckout = carts.map((item) => ({
                    name: item.productname,
                    price: item.price,
                    quantity: item.quantity,
                  }));

                  checkout2(itemsForCheckout);
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-sm">
          <p className="mb-3 font-medium">Have a coupon? Enter your code.</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              placeholder="Coupon code"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl 
              focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
            />

            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourCart;
