import React from 'react';
import { Facebook, Youtube, Instagram, Twitter, Hexagon } from 'lucide-react'; // Using Hexagon as a placeholder for Pinterest if needed, or simple SVG below

const Footer = () => {
  return (
    <footer className="w-[96%] mx-auto bg-white rounded-2xl p-10 text-[#1C1C1C] ">
      {/* Top Section: Grid Layout */}
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
        
        {/* Left Column: Brand & Socials */}
        <div className="md:w-1/3 flex flex-col gap-6">
        <h1 className="text-2xl  font-semibold tracking-widest select-none cursor-pointer">
          <a href="/" className="tracking-[-1px]">RAWAURA</a>
        </h1>
          <p className="text-gray-600 leading-relaxed max-w-sm">
            Seamless transactions, personalized insights, and innovative solutions for a smarter tomorrow.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Youtube size={18} />} />
            {/* Pinterest Custom SVG since it might not be in all lucide versions */}
            <SocialIcon icon={
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> 
               // Replaced with a generic plus/cross or you can use a specific Pinterest SVG path here
            } />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Twitter size={18} />} />
          </div>
        </div>

        {/* Right Columns: Links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* About Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">About</h3>
            <ul className="flex flex-col gap-3 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">Company</li>
              <li className="hover:text-black cursor-pointer transition-colors">Leadership</li>
              <li className="hover:text-black cursor-pointer transition-colors">Press</li>
              <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Help</h3>
            <ul className="flex flex-col gap-3 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-black cursor-pointer transition-colors">Support Team</li>
              <li className="hover:text-black cursor-pointer transition-colors">Community</li>
              <li className="hover:text-black cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>

          {/* Menu Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Menu</h3>
            <ul className="flex flex-col gap-3 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">Men</li>
              <li className="hover:text-black cursor-pointer transition-colors">Women</li>
              <li className="hover:text-black cursor-pointer transition-colors">Children</li>
              <li className="hover:text-black cursor-pointer transition-colors">Popular</li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <ul className="flex flex-col gap-3 text-gray-600 text-sm">
              <li className="hover:text-black cursor-pointer transition-colors">About Treadly</li>
              <li className="hover:text-black cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-black cursor-pointer transition-colors">News & Blogs</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>Copyright © 2025 Treadly All Rights Reserved.</p>
        <p className="hover:text-black cursor-pointer mt-4 md:mt-0">Privacy Policy</p>
      </div>
    </footer>
  );
};

// Helper component for Social Icons to avoid repetition
const SocialIcon = ({ icon }) => {
  return (
    <div className="w-10 h-10 rounded-full border border-gray-200 flex justify-center items-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer">
      {icon}
    </div>
  );
};

export default Footer;