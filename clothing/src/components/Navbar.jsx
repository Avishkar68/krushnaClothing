import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Search, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="relative w-full px-6 py-4 flex items-center justify-between font-mainfont font-medium z-40">

        {/* --- LOGO --- */}
        <div className="flex items-center z-50">
          <h1 className="text-2xl font-semibold tracking-widest select-none cursor-pointer">
            <a href="/" className="tracking-[-1px]">RAWAURA</a>
          </h1>
        </div>

        {/* --- DESKTOP SEARCH BAR (Hidden on Mobile) --- */}
        <div className="hidden md:flex justify-between mx-auto border border-[#2727272f] px-4 py-2 rounded-4xl cursor-pointer hover:shadow-sm transition-shadow">
          <div className="">
            <input 
              placeholder="search here..." 
              className="w-[300px] lg:w-[360px] outline-none border-none bg-transparent placeholder-gray-400" 
            />
          </div>
          <ChevronRight className="text-[#bebebecc]" />
        </div>

        {/* --- DESKTOP NAV LINKS + ICONS (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center gap-7 text-gray-700">
          <a href="/about-us" className="hover:text-black transition cursor-pointer">AboutUs</a>
          <a href="/blog" className="hover:text-black transition cursor-pointer">Blogs</a>
          <a href="/faq" className="hover:text-black transition cursor-pointer">FAQs</a>

          <div className="flex items-center gap-5 pl-4 border-l border-gray-200">
            <button className="hover:text-black transition cursor-pointer">
              <ShoppingCart size={22} />
            </button>
            <abbr title="My orders">
              <button className="hover:text-black transition cursor-pointer">
                <User size={22} />
              </button>
            </abbr>
          </div>
        </div>

        {/* --- MOBILE ICONS (Visible on Mobile) --- */}
        <div className="flex md:hidden items-center gap-5 text-gray-800 z-50">
          <button onClick={() => setIsSearchOpen(true)} className="cursor-pointer">
            <Search size={22} />
          </button>
          <button className="cursor-pointer relative">
            <ShoppingCart size={22} />
            {/* Optional notification dot */}
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsMenuOpen(true)} className="cursor-pointer">
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* --------------------------------------------------------- */}
      {/* MOBILE SEARCH OVERLAY (Dialog Box) */}
      {/* --------------------------------------------------------- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-4xl shadow-2xl p-2 flex items-center gap-2 relative">
            
            <Search className="text-gray-400 ml-3" size={20} />
            
            <input 
              autoFocus
              placeholder="Search products..." 
              className="flex-1 py-3 px-2 outline-none text-lg bg-transparent"
            />
            
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <X size={20} />
            </button>
          </div>
          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
        </div>
      )}

      {/* --------------------------------------------------------- */}
      {/* MOBILE MENU OVERLAY (Trendy Full Screen Blur) */}
      {/* --------------------------------------------------------- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-xl flex flex-col justify-center items-center text-center animate-in slide-in-from-right duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full border border-black/10 hover:bg-black/5 transition"
          >
            <X size={32} />
          </button>

          {/* Menu Links */}
          <div className="flex flex-col gap-8 text-3xl font-mainfont font-semibold text-[#1C1C1C]">
            <a href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-500 transition-colors">Home</a>
            <a href="/about-us" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-500 transition-colors">About Us</a>
            <a href="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-500 transition-colors">Blogs</a>
            <a href="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-500 transition-colors">FAQs</a>
            <a href="/profile" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-500 transition-colors">My Profile</a>
          </div>

          <div className="mt-12 text-sm text-gray-500 tracking-widest uppercase">
            Rawaura Fashion
          </div>
        </div>
      )}
    </>
  );
}