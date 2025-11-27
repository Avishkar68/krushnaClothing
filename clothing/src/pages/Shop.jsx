import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Filter, ChevronDown, X, Heart, ShoppingBag } from "lucide-react";

const Shop = () => {
    const navigate = useNavigate();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filters = {
        categories: ["All Products", "Hoodies", "T-Shirts", "Pants", "Jackets", "Accessories"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        prices: ["$0 - $50", "$50 - $100", "$100 - $200", "$200+"]
    };

    // ==========================
    // FETCH PRODUCTS WITH AXIOS
    // ==========================
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/products");
setProducts(res.data.products || res.data || []);
            } catch (err) {
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="w-full min-h-screen bg-[#F5F5F5] text-[#1C1C1C] font-mainfont">
            <div className="w-[96%] mx-auto flex gap-8 relative pb-20">

                {/* --- SIDEBAR FILTERS (Desktop) --- */}
                <aside className="hidden lg:block w-1/4 sticky top-10 h-fit space-y-8">
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center justify-between">
                            Categories <ChevronDown size={16} />
                        </h3>
                        <ul className="space-y-3 text-gray-500">
                            {filters.categories.map((cat, idx) => (
                                <li key={idx} className="hover:text-black cursor-pointer transition-colors flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-black' : 'bg-transparent border border-gray-300'}`}></div>
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-semibold text-lg mb-4">Size</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {filters.sizes.map((size, idx) => (
                                <button key={idx} className="border border-gray-200 rounded-lg py-2 hover:border-black hover:bg-black hover:text-white transition-all text-sm">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            {filters.prices.map((price, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-black w-4 h-4" />
                                    {price}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <div className="w-full lg:w-3/4">

                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 text-sm">
                            {loading ? "Loading..." : `${products.length} Products Found`}
                        </span>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-black hover:text-white transition"
                            >
                                <Filter size={16} /> Filters
                            </button>

                            <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:border-black transition">
                                Sort by: Featured <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Error Handler */}
                    {error && (
                        <div className="text-red-500 text-center py-10 text-lg">{error}</div>
                    )}

                    {/* Loading Skeleton */}
                    {loading && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-pulse">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="h-[350px] bg-gray-300 rounded-xl"></div>
                            ))}
                        </div>
                    )}

                    {/* Product Grid */}
                    {!loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="group cursor-pointer flex flex-col gap-3"
                                    onMouseEnter={() => setHoveredProduct(product._id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                    onClick={() => handleProductClick(product._id)}
                                >
                                    <div className="relative w-full h-[400px] bg-[#E5E5E5] rounded-2xl overflow-hidden">

                                        {/* Tag (if your API returns "tag") */}
                                        {product.tag && (
                                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md z-10">
                                                {product.tag}
                                            </span>
                                        )}

                                        <button 
                                            onClick={(e) => { e.stopPropagation(); }}
                                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Heart size={18} />
                                        </button>

                                       <img
    src={product.images?.[0]}  // <-- FIRST IMAGE
    alt={product.name}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>

                                        <div className="hidden md:flex">
                                            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 transform ${hoveredProduct === product._id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleProductClick(product._id); }}
                                                    className="w-full bg-[#1C1C1C] text-white py-3 rounded-xl flex justify-center items-center gap-2 font-medium shadow-lg hover:bg-black"
                                                >
                                                    <ShoppingBag size={16} /> View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start px-1">
                                        <div>
                                            <h3 className="font-medium text-lg text-[#1C1C1C]">{product.name}</h3>
                                            <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                                        </div>
                                        <span className="font-semibold text-lg">${product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    <div className="flex justify-center mt-16">
                        <button className="border border-black text-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-bold">
                            Load More
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE FILTER DRAWER --- */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>

                    <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8">
                            <div>
                                <h3 className="font-semibold mb-3">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filters.categories.map((cat, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-sm">{cat}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Price</h3>
                                <div className="space-y-3">
                                    {filters.prices.map((p, i) => (
                                        <label key={i} className="flex items-center gap-3">
                                            <input type="radio" name="price_mobile" className="w-5 h-5 accent-black" />
                                            <span className="text-gray-600">{p}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button className="w-full bg-[#1C1C1C] text-white py-4 rounded-xl font-bold uppercase tracking-wide">
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Shop;
