"use client";
import React, { useContext, useEffect, useState } from "react";
import "./products.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { productID, SetProductID } = useContext(AuthContext);
  console.log(productID);
  const router = useRouter();

  const handleAction = (index: string) => {
    // const token = localStorage.getItem("token");
    if (true) {
      //{`/detail-products/${ele.id}`}
      router.push(`/detail-products/${+index}`);
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const handleOrder = () => {
    // const token = localStorage.getItem("token");
    if (true) {
      router.push("/order-processing");
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const get_products = () => {
    axios.get(`http://localhost:5001/api/products`).then((res) => {
      console.log("res", res.data);
      setProducts(res.data);
      // console.log([...posts, res.data.jobs])
    });
  };

  const handleProduct = () => {
    const token = localStorage.getItem("token");

    const targetImageUrl = "http://localhost:3000/images/sunglasees_1.jpg";

    const product = products.find((item) => item.image === targetImageUrl);

    const productId = product?.id;

    if (!token) {
      toast.error("Please log in or register to access this feature");
      return;
    }

    router.push(`/detail-products/${productId}`);

    //console.log(productId);
  };

  useEffect(() => {
    get_products();
  }, []);

  return (
    <div className="container relative min-h-screen bg-[#f5f5f5]">
      {/* <div className="absolute inset-0 w-full  h-full bg-[#fqeee8]"></div> */}

      <div className=" landing_products_page relative">
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
        <div className="landing_ProductPage">
          <div className="header_ProductPage flex flex-col justify-center  text-black">
            <p className="header_text_ProductPage">/Sunglasses</p>
            <p className="sub_headerProductPage">
              French know-how with high-technology lenses in order to never be
              taken by surprise when there is a sharp bright sunny turn in the
              road.
            </p>
            <button className="buy_cta" onClick={handleProduct}>
              BUY 115 €
            </button>
          </div>{" "}
          <div className="conatiner_image">
            <img className="sunglasees_image" src="\images\sunglasees_1.jpg" />
          </div>
        </div>
      </div>
      <div className="show_products">
        <ul className="keywords flex flex-row gap-10 justify-center">
          <li>FASHION</li>
          <li>TRAVEL</li>
          <li>EVERY DAY</li>
          <li>CRAFTS</li>
        </ul>

        <div className="products flex gap-4 flex-wrap">
          {products?.map((ele, i) => {
            return (
              <div
                key={i}
                className="product-card "
                onClick={() => {
                  handleAction(ele.id);
                }}
              >
                <div className="card w-[250px] h-[400px] bg-[#E3E3E1]">
                  <img
                    className="product-image"
                    src={ele.image}
                    alt="product"
                  />
                  <p className="product-name">{ele.productname}</p>
                  <p className="product-price">{ele.price} €</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
