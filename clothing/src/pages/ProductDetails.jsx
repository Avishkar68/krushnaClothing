import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';

// Importing assets to reuse (you can replace these with product specific images later)
import hero1 from "../assets/hero1.avif";
import hero1_2 from "../assets/hero1_2.webp";
import hero1_3 from "../assets/hero1_3.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState('greenish');
  const [selectedSize, setSelectedSize] = useState('L');

  // Mock data to match the screenshot vibes
  const product = {
    title: "Nike Forward Hoodie",
    price: "€ 1,099",
    rating: 4.9,
    reviews: 41,
    description: "Goddamn!, this hoodie makes me feel soooooo much comfortable and genuinely warm af, i love this hoodie, make sure you buy it guys, love it!.",
    colors: [
      { name: 'black', class: 'bg-black' },
      { name: 'white', class: 'bg-white border border-gray-200' },
      { name: 'greenish', class: 'bg-[#AECEB0]' }, // Matches the screenshot green
      { name: 'grey', class: 'bg-gray-300' },
      { name: 'logan', class: 'bg-[#5D5D78]' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL']
  };

  return (
    <div className="w-[96%] mx-auto min-h-screen text-[#1C1C1C] font-mainfont pb-20">
      
      {/* --- BREADCRUMB --- */}
      <div className="py-6 flex items-center gap-2 text-gray-500 text-sm font-medium">
        <Link to="/" className="hover:text-black transition-colors"><ArrowLeft size={16} className="inline mr-1"/> Home</Link> 
        <span className="text-gray-300">•</span>
        <span className="text-black">Product details</span>
      </div>

      {/* --- MAIN GRID LAYOUT --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          
          {/* Main Large Image */}
          <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-[#F0F0F0]">
            <span className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-bold shadow-sm z-10">
              Hoodie
            </span>
            <img 
              src={hero1} 
              alt="Main Product" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info Card (Bottom Left in screenshot) */}
          <div className="bg-white rounded-2xl p-8 flex flex-col gap-8 shadow-sm border border-gray-100">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 font-medium">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span>{product.rating}</span>
                  <span className="text-gray-400">({product.reviews}) New Reviews</span>
                </div>
              </div>
              <button className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                <Heart className="fill-current" size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Color Selector */}
              <div>
                <h3 className="font-bold text-lg mb-4">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${color.class} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    >
                      {selectedColor === color.name && <Check size={16} className={color.name === 'white' ? 'text-black' : 'text-white'} />}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-gray-500 font-medium">
                   {product.colors.map(c => <span key={c.name} className="capitalize text-center">{c.name}</span>)}
                </div>
              </div>

              {/* Size Selector */}
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-4">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                        ${selectedSize === size 
                          ? 'bg-[#1C1C1C] text-white shadow-lg scale-105' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">
          
          {/* Image Grid (Top Right in screenshot) */}
          <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
            {/* Top Left Small */}
            <div className="rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={hero1_2} alt="Detail 1" className="w-full h-full object-cover" />
            </div>
            {/* Top Right Small */}
            <div className="rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={hero1} alt="Detail 2" className="w-full h-full object-cover" />
            </div>
            {/* Bottom Wide Detail */}
            <div className="col-span-2 rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={hero1_3} alt="Fabric Detail" className="w-full h-full object-cover scale-125" />
            </div>
          </div>

          {/* Price & Action Section (Bottom Right in screenshot) */}
          <div className="flex flex-col gap-4">
            
            {/* Black Price Card */}
            <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 flex justify-between items-center text-white shadow-xl">
              <div className="text-4xl font-bold">{product.price}</div>
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                Buy Now <ArrowRight size={20} />
              </button>
            </div>

            {/* Review Snippet Card */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Reviews ({product.reviews})</h3>
                <button className="text-sm font-bold underline">See more</button>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    <img src={hero1_2} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">Alexander Stewart</span>
                      <span className="text-xs text-gray-400">13/12/2024</span>
                   </div>
                   <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed">
                     "{product.description}"
                   </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;