import React, { useContext } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";


const Navbar = () => {
  const { carts } = useContext(AuthContext);
  const router = useRouter();

  const YourCarts = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in or register to access this feature");
      return;
    }

    router.push(`/your-cart`);
  };

  return (
    <nav className="navbar flex items-center justify-between p-6">
      <button
        onClick={() => {
          router.back();
        }}
        className="text-sm font-medium text-gray-700 hover:text-black transition"
      >
        ← Back
      </button>
      <div className="logo center">POLÉNE</div>
      <div className=" actions flex gap-6 ">
        <div className="cart relative cursor-pointer" onClick={YourCarts}>
          🛒
          <span className=" count_cart absolute -top-2 -right-3 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            <span>{carts?.length}</span>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
