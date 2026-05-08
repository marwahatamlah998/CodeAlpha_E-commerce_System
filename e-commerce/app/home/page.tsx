"use client";
import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { carts } = useContext(AuthContext);
  //   const storedCarts = localStorage.getItem("carts");
  //   const parsedCarts = storedCarts
  // ? JSON.parse(storedCarts)
  // : [];
  console.log("carts", carts);
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");
  const UID = localStorage.getItem("userId");
  const { setToken } = useContext(AuthContext);
  const [best_sellers, set_best_sellers] = useState([]);
  const [images, set_images_comapny] = useState([]);
  const { data: session } = useSession();

  const router = useRouter();

  const handleAction = () => {
    if (token) {
      router.push("/products");
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const Login = () => {
    if (token) {
      router.push("/home");
    } else {
      toast.error("Please log in or register to access this feature");
    }
  };

  const YourCarts = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in or register to access this feature");
      return;
    }

    router.push(`/your-cart`);
  };

  const get_best_sellers = () => {
    axios
      .get(`http://localhost:5001/api/best-sellers/`)
      .then((res) => {
        console.log("res", res.data);
        set_best_sellers(res.data);
        // console.log([...posts, res.data.jobs])
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`http://localhost:5001/api/best-sellers/`, )
    //   .then((res) => {
    //     console.log("res", res);
    // Swal.fire({
    //   title: "Get best sellers!",
    //   text: "Your appointment has been Added successfully.",
    //   icon: "success",
    //   confirmButtonText: "Okay",
    // }).then(() => {
    //   window.location.reload();
    // });
    // console.log([...posts, res.data.jobs])
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const get_images_products = () => {
    axios
      .get(`http://localhost:5001/api/imagesCompany`)
      .then((res) => {
        console.log("res", res.data);
        set_images_comapny(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = async () => {
    setToken(null);
    sessionStorage.clear();

    await signOut({ redirect: true, callbackUrl: "/login" }); // Redirects to login page after logout
  };

  useEffect(() => {
    get_best_sellers();
    get_images_products();
    const isReload = sessionStorage.getItem("isReload");

    if (session) {
      localStorage.setItem("roleId", session.user.role_id.toString());
      localStorage.setItem("email", session.user.email);
      localStorage.setItem("userId", session.user.id.toString());
      localStorage.setItem("token", session.user.token);
    }
    if (!isReload) {
      sessionStorage.setItem("isReload", "true");
      window.location.reload();
    }
  }, [session]);

  return (
    <div className="container overflow-x-hidden relative ">
      {/* <div className="absolute inset-0 w-full  h-full bg-[#fqeee8]"></div> */}

      <div className="relative">
        <nav className="navbar flex items-center justify-between p-6">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-10">
            <h1 className="logo text-xl font-bold">
              POL<span className="letter">É</span>NE
            </h1>

            <ul className="flex gap-6">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a>Shop</a>
              </li>
            </ul>
          </div>

          <div className=" actions flex gap-6 ">
            {token ? (
              <div className="cart relative cursor-pointer" onClick={YourCarts}>
                🛒
                <span className=" count_cart absolute -top-2 -right-3 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {carts.length}
                </span>
              </div>
            ) : (
              <div> </div>
            )}

            {token ? (
              <>
                <button
                  className="cursor-pointer btn btn-primary btn-m"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="login text-sm cursor-pointer" onClick={Login}>
                Login
              </button>
            )}
          </div>
        </nav>
        <div className="landing_page">
          <div className="header_page flex flex-col justify-center  text-black">
            <p className="header_text">
              The future <span className="span">of</span> <br />
              beauty
              <span className="dot">.</span>
            </p>
            <p className="sub_header_page">
              Activate Cellular regeneration with our science-backed innovation.
            </p>
            <button className="shop_now_cta" onClick={handleAction}>
              Shop now
            </button>
          </div>{" "}
          <div className="conatiner_image">
            <img className="image" src="/images/hydro_3.jpg" />
          </div>
        </div>
        <div className="container_best_sellers">
          <div className=" conatiner_best_sellers flex flex-col ">
            <div className="bestSellers"> Bestsellers </div>

            <div className="subHeader">
              From balance boards to robotic lawn mowers, if you’re looking for
              <br></br>
              popular things to sell in 2026, check out these trending products.
            </div>
          </div>

          {/* <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
    *{
        font-family: "Geist", sans-serif;
    }
</style> */}
          <section className="bg-white flex  px-4 py-16">
            <div className=" container_cards flex p-20 flex-wrap items-stretch justify-center gap-10">
              {best_sellers?.map((e) => (
                <div
                  key={e?.id}
                  className="border border-zinc-200 hover:border-zinc-300 transition-colors rounded-xl p-3 flex flex-col w-44"
                >
                  {/* Top */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-lime-300 text-neutral-800 text-xs px-2 py-0.5 rounded-full">
                      <span className="font-bold">20%</span> off
                    </span>

                    <div className="size-7 rounded-full border border-zinc-300 flex items-center justify-center cursor-pointer">
                      <svg width="9" height="11" viewBox="0 0 9 11" fill="none">
                        <path
                          d="M7.357.5c.303 0 .594.117.808.325s.335.491.335.786v8.334a.54.54 0 0 1-.076.277.584.584 0 0 1-.779.205L5.067 8.995a1.17 1.17 0 0 0-1.134 0l-2.578 1.432a.584.584 0 0 1-.779-.205.54.54 0 0 1-.076-.277V1.61c0-.295.12-.577.335-.786A1.16 1.16 0 0 1 1.643.5z"
                          stroke="#27272a"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex items-center justify-center h-28 mb-2">
                    <img
                      src={
                        e?.image ||
                        "https://assets.prebuiltui.com/images/components/card/card-lamp-image.png"
                      }
                      alt={e?.productname || "product"}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title */}
                  <p className="text-sm text-neutral-500 mb-2 px-2">
                    {e?.productname || "Product name"}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-sm font-semibold text-neutral-800">
                      ${e?.price || "29.00"}
                    </span>

                    {e?.discount && (
                      <span className="text-xs text-neutral-500 line-through">
                        ${e.discount}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="container_show_products overflow-x-hidden">
          <div className="our_moment">
            Moment <span className="span">of</span> <br /> Product Balance
          </div>
          <div className=" relative w-full h-[400px] ">
            <img
              src="/images/product.jpg"
              alt="product"
              className="w-full h-[400px] object-contain rounded-lg "
            />
          </div>

          <div className="relative bottom-50 left-20 w-full h-full flex items-center justify-center z-10 ">
            <div className="flex animate-scroll gap-3 w-max ">
              {images.map((ele) => (
                <div key={ele.id} className="w-32 h-32 flex-shrink-0 z-20">
                  <img
                    src={ele?.image}
                    className="w-full h-full object-cover rounded-md"
                    alt="slide"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" ads flex flex-row justify-between ">
          <div className="text">
            From morning focus <br></br> to evening calm
          </div>
          <div className="text">
            Daily moments that <br></br>restore balance
          </div>
        </div>
        <div className="create_own_nutrition">
          <div className="text_side flex flex-col gap-5">
            <div className="heading_create_own_nutrition">
              Create our own <br /> nutrition kit
            </div>
            <div className="subheading_create_own_nutrition">
              Behind the sense, we've <br /> been expermiment with new <br />
              science. <br /> Creating all new formulations just go! you{" "}
            </div>
            <button className="read_more_cta">Read more</button>
          </div>
          <div className="images_side flex flex-col gap-5">
            <img
              className="img_1 h-[400px] w-[300px]"
             src="\images\ourstory_2.jpg"
              alt=""
            />
            
          </div>
        </div>
        <div className="our_story flex flex-row w-screen h-full justify-between">
          <img
            className="image_our_story"
            src="\images\kit_clothes.jpg"
            alt="our_product"
          />
          <div>
            <div className="why_story_matters">Why Our Story Matters</div>
            <div className="story_matters">
              People don't buy products or services. They buy stories,
              relationships, and meaning. Your brand story is what makes you
              different. In a crowded wellness industry, your journey and
              passion create the emotional connection that builds trust with
              your audience.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
