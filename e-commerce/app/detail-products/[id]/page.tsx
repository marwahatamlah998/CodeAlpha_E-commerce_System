/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useEffect, useState } from "react";
import "./detail-products.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";

type CartItem = {
  name: string;
  quantity: number;
  price: number;
};

type AddToCart = {
  product_id: number;
  user_id: number;
};

const DetailProducts = () => {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [uid, setUID] = useState<null | string | number>(null);
  const [cart, setCartItems] = useState<AddToCart[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkout2 = async (items: any) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        items,
      }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };
  // const AddAppointment = () => {
  //   axios
  //     .post(`http://localhost:3000/api/appointments/`, appointments)
  //     .then((res) => {
  //       console.log("res", res);
  //       Swal.fire({
  //         title: "the appointment Added!",
  //         text: "Your appointment has been Added successfully.",
  //         icon: "success",
  //         confirmButtonText: "Okay",
  //       }).then(() => {
  //         window.location.reload();
  //       });
  //       // console.log([...posts, res.data.jobs])
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const router = useRouter();

  const increaseCount = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseCount = () => {
    {
      quantity === 1
        ? setError("Error fetching quantity")
        : setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantity = () => {
    if (quantity > product.quantity) {
      setError("Error fetching quantity");
    } else {
      router.push("/order-processing");
    }
  };

  const checkout = () => {
    // const token = localStorage.getItem("token");
    if (true) {
      router.push(`/checkout`);
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const AddToCart = (cart: any) => {
    axios
      .post(`http://localhost:5001/api/cartItems/`, cart)
      .then((res) => {
        console.log("res", res);
        Swal.fire({
          title: "the Product Added!",
          text: "Your Product has been Added successfully.",
          icon: "success",
          confirmButtonText: "Okay",
        }).then(() => {
          window.location.reload();
        });
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
      toast.error("The product already has been added");
      });
  };

 

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);
      console.log(res.data);
      setProduct(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Error fetching service");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct();
    router.refresh();
    const storedUID = localStorage.getItem("userId");

    if (storedUID) {
      setUID(storedUID);
    }
  }, []);

  return (
    <div className="container_detail relative min-h-screen bg-[#f5f5f5]">
      {/* <div className="absolute inset-0 w-full  h-full bg-[#fqeee8]"></div> */}
      <div className="DetailProductPage relative">
        {/* <nav className="navbar flex items-center justify-between p-6">
          <div className="left">Back</div>
          <div className="logo center">POLÉNE</div>
          <div className=" actions flex gap-6 ">
            <div className="cart relative cursor-pointer">
              🛒
              <span className=" count_cart absolute -top-2 -right-3 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </div>
        </nav> */}
        <Navbar />
        {loading ? (
          <div className="ml-10"> Loading... </div>
        ) : (
          <div className="DetailProduct flex items-center gap-12 px-10">
            <div className="conatiner_image flex-1 flex justify-center">
              <img
                className="image_product_detail max-w-full max-h-[400px] object-contain"
                src={product.image}
              />
            </div>
            <div className="flex-1 flex flex-col gap-6 text-black text-black">
              <h3 className="nameOfProduct">{product.productname}</h3>
              <div>
                <p>Brand:</p>
                <p> {product.brand}</p>
              </div>
              <div>
                <p>Category:</p>
                <p>{product.category}</p>
              </div>
              <p>Quantity:</p>
              <div className="quantity flex flex-row gap-10">
                <button className="bg-[#e1dfd3]" onClick={increaseCount}>
                  +
                </button>
                <p>{quantity}</p>
                <button className="bg-[#e1dfd3]" onClick={decreaseCount}>
                  -
                </button>
              </div>
              <div>
                <p>More Info:</p>
                <p>{product.des_product}</p>
              </div>
              <div className="order_pricing flex flex-row justify-between">
                <div className="sellingprice flex flex-col gap-1">
                  {" "}
                  <p>Selling Price:</p>
                  <button
                    className="buy_cta"
                    onClick={() => {
                      const newItem: CartItem = {
                        name: product.productname,
                        quantity: quantity,
                        price: product.price,
                      };

                      setItems((prev) => [...prev, newItem]);

                      checkout2([...items, newItem]);
                    }}
                  >
                    BUY {product.price} €
                  </button>
                </div>
                <div className="orderActions flex flex-col gap-9">
                  <div className="priceActions flex flex-row gap-6">
                    {" "}
                    <button
                      className="cart"
                      onClick={() => {
                        const newCartItem: AddToCart = {
                          product_id: product.id,
                          user_id: uid,
                        };

                        setCartItems((prev) => [...prev, newCartItem]);

                        AddToCart(newCartItem);
                      }}
                    >
                      {" "}
                      🛒
                    </button>
                    <button
                      className="buy_now"
                      onClick={() => {
                        const newItem: CartItem = {
                          name: product.productname,
                          quantity: quantity,
                          price: product.price,
                        };

                        setItems((prev) => [...prev, newItem]);

                        checkout2([...items, newItem]);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                  <div className="total flex flex-row gap-3">
                    <p>Total:</p>
                    {(quantity * product.price).toFixed(2)} €{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default DetailProducts;
