import React, { useState } from 'react';
import axios from "axios";
import { Menu, X, ShoppingCart, User, Search, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [mobileInput, setMobileInput] = useState("");
  const [userOrders, setUserOrders] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Fetch user orders from backend
  const fetchOrders = async () => {
    if (!mobileInput.trim()) {
      setOrderError("Please enter a valid mobile number");
      return;
    }

    try {
      setLoadingOrders(true);
      setOrderError("");

      const res = await axios.get(`http://localhost:8000/api/orders/${mobileInput}`);

      // Backend returns ARRAY directly
      if (!res.data || res.data.length === 0) {
        setOrderError("No orders found for this mobile number.");
        setUserOrders(null);
        return;
      }

      setUserOrders(res.data); // <-- FIXED
    } catch (err) {
      setOrderError("Failed to fetch orders. Please try again.");
      setUserOrders(null);
    } finally {
      setLoadingOrders(false);
    }
  };

  return (
    <>
      <nav className="relative w-full px-6 py-4 flex items-center justify-between font-mainfont font-medium z-40">

        {/* LOGO */}
        <div className="flex items-center z-50">
          <h1 className="text-2xl font-semibold tracking-widest cursor-pointer">
            <a href="/" className="tracking-[-1px]">RAWAURA</a>
          </h1>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex justify-between mx-auto border border-[#2727272f] px-4 py-2 rounded-4xl">
          <input 
            placeholder="search here..." 
            className="w-[360px] outline-none bg-transparent placeholder-gray-400" 
          />
          <ChevronRight className="text-gray-400" />
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-7 text-gray-700">
          <a href="/about-us" className="hover:text-black transition">AboutUs</a>
          <a href="/blog" className="hover:text-black transition">Blogs</a>
          <a href="/faq" className="hover:text-black transition">FAQs</a>

          <div className="flex items-center gap-5 pl-4 border-l border-gray-200">
            <ShoppingCart size={22} className="cursor-pointer hover:text-black" />

            {/* PROFILE / ORDERS BUTTON */}
            <abbr title="My orders">
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="hover:text-black"
              >
                <User size={22} />
              </button>
            </abbr>
          </div>
        </div>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden items-center gap-5 text-gray-800 z-50">
          <button onClick={() => setIsSearchOpen(true)}><Search size={22} /></button>
          <button className="relative"><ShoppingCart size={22} /><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
          <button onClick={() => setIsMenuOpen(true)}><Menu size={26} /></button>
        </div>
      </nav>

      {/* ===================== USER PROFILE / ORDERS MODAL ===================== */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-md flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 relative">

            {/* Close */}
            <button 
              onClick={() => {
                setIsProfileOpen(false);
                setUserOrders(null);
                setMobileInput("");
                setOrderError("");
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">My Orders</h2>

            {/* STEP 1: ENTER MOBILE NUMBER */}
            {!userOrders && (
              <>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  Enter your mobile number to fetch your orders.
                </p>

                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={mobileInput}
                  onChange={(e) => setMobileInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none mb-3"
                />

                {orderError && (
                  <p className="text-red-600 text-sm mb-3 text-center">{orderError}</p>
                )}

                <button
                  onClick={fetchOrders}
                  className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900"
                >
                  {loadingOrders ? "Loading..." : "Fetch Orders"}
                </button>
              </>
            )}

            {/* STEP 2: SHOW ORDERS */}
            {userOrders && (
              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-4">Your Orders</h3>

                <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">

                  {userOrders.map((order) => (
                    <div key={order._id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm">
                      
                      <p className="font-semibold">{order.items?.[0]?.name}</p>
                      <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                      <p className="text-sm text-gray-600">Amount: ₹{order.totalAmount}</p>
                      <p className="text-sm text-gray-600">Placed On: {new Date(order.createdAt).toLocaleDateString()}</p>

                      <p className="text-sm text-gray-800 mt-1">
                        Status: <span className="font-semibold">{order.status}</span>
                      </p>
                    </div>
                  ))}

                </div>

                <button
                  onClick={() => {
                    setUserOrders(null);
                    setOrderError("");
                  }}
                  className="w-full mt-5 py-3 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Search Again
                </button>
              </div>
            )}

          </div>

          {/* Click outside */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsProfileOpen(false)}></div>
        </div>
      )}
    </>
  );
}
