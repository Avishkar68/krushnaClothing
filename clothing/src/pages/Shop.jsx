import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Filter, ChevronDown, X, Heart, ShoppingBag, Check } from "lucide-react";

const Shop = () => {
    const navigate = useNavigate();
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    // --- DATA STATE ---
    const [allProducts, setAllProducts] = useState([]); // Store all fetched data
    const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered results
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- FILTER STATE ---
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);

    // --- FILTER OPTIONS (Matched to Mongoose Schema) ---
    const filters = {
        categories: ["All", "hoodies", "oversized tshirts", "unisex"],
        sizes: ["M", "L", "XL"],
        prices: ["$0 - $500", "$500 - $1000", "$1000 - $2000", "$2000+"]
    };

    // ==========================
    // 1. FETCH PRODUCTS
    // ==========================
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("https://krushnaclothing.onrender.com/api/products");
                const data = res.data.products || res.data || [];
                setAllProducts(data);
                setFilteredProducts(data); // Initially, show all
            } catch (err) {
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // ==========================
    // 2. FILTERING LOGIC
    // ==========================
    useEffect(() => {
        let result = allProducts;

        // A. Category Filter
        if (selectedCategory !== "All") {
            result = result.filter(product => 
                product.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // B. Size Filter (Checks if product.sizes array includes the selected size)
        if (selectedSize) {
            result = result.filter(product => 
                product.sizes?.includes(selectedSize)
            );
        }

        // C. Price Filter
        if (selectedPrice) {
            const priceRange = parsePriceRange(selectedPrice);
            if (priceRange) {
                result = result.filter(product => {
                    const price = product.price;
                    if (priceRange.max === Infinity) {
                        return price >= priceRange.min;
                    }
                    return price >= priceRange.min && price <= priceRange.max;
                });
            }
        }

        setFilteredProducts(result);
    }, [selectedCategory, selectedSize, selectedPrice, allProducts]);

    // Helper to parse price strings like "$0 - $500" or "$2000+"
    const parsePriceRange = (rangeStr) => {
        if (!rangeStr) return null;
        const cleanStr = rangeStr.replace(/\$/g, '').replace(/ /g, ''); // Remove $ and spaces
        
        if (cleanStr.includes('+')) {
            const min = parseInt(cleanStr.replace('+', ''));
            return { min, max: Infinity };
        }
        
        const parts = cleanStr.split('-');
        if (parts.length === 2) {
            return { min: parseInt(parts[0]), max: parseInt(parts[1]) };
        }
        return null;
    };

    // --- HANDLERS ---
    const handleCategoryClick = (cat) => setSelectedCategory(cat);
    
    const handleSizeClick = (size) => {
        // Toggle size (if clicking same size, unselect it)
        setSelectedSize(prev => prev === size ? null : size);
    };

    const handlePriceClick = (price) => {
        // Toggle price
        setSelectedPrice(prev => prev === price ? null : price);
    };

    const handleClearFilters = () => {
        setSelectedCategory("All");
        setSelectedSize(null);
        setSelectedPrice(null);
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="w-full min-h-screen bg-[#F5F5F5] text-[#1C1C1C] font-mainfont">
            <div className="w-[96%] mx-auto flex gap-8 relative pb-20">

                {/* --- SIDEBAR FILTERS (Desktop) --- */}
                <aside className="hidden lg:block w-1/4 sticky top-10 h-fit space-y-8 pr-4">
                    
                    {/* Header with Clear Button */}
                    <div className="flex justify-between items-center">
                        <h2 className="font-bold text-xl">Filters</h2>
                        {(selectedCategory !== "All" || selectedSize || selectedPrice) && (
                            <button onClick={handleClearFilters} className="text-xs text-red-500 underline cursor-pointer hover:text-red-700">
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center justify-between">
                            Categories <ChevronDown size={16} />
                        </h3>
                        <ul className="space-y-3 text-gray-500">
                            {filters.categories.map((cat, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={() => handleCategoryClick(cat)}
                                    className={`cursor-pointer transition-colors flex items-center gap-2 capitalize ${selectedCategory === cat ? 'text-black font-bold' : 'hover:text-black'}`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${selectedCategory === cat ? 'bg-black' : 'bg-transparent border border-gray-300'}`}></div>
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Size */}
                    <div className="border-b border-gray-200 pb-6">
                        <h3 className="font-semibold text-lg mb-4">Size</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {filters.sizes.map((size, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => handleSizeClick(size)}
                                    className={`border cursor-pointer rounded-lg py-2 text-sm transition-all
                                        ${selectedSize === size 
                                            ? 'bg-black text-white border-black' 
                                            : 'border-gray-200 hover:border-black text-gray-600'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Price Range</h3>
                        <ul className="space-y-2 text-gray-500 text-sm">
                            {filters.prices.map((price, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={() => handlePriceClick(price)}
                                    className="flex items-center gap-2 cursor-pointer hover:text-black"
                                >
                                    <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedPrice === price ? 'bg-black border-black' : 'border-gray-300'}`}>
                                        {selectedPrice === price && <Check size={12} className="text-white" />}
                                    </div>
                                    {price}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <div className="w-full lg:w-3/4">

                    {/* Toolbar */}
                    <div className="flex justify-between items-center mb-6 pt-6">
                        <span className="text-gray-500 text-sm">
                            {loading ? "Loading..." : `${filteredProducts.length} Products Found`}
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

                    {/* Empty State */}
                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No products match your selected filters. 
                            <br/>
                            <button onClick={handleClearFilters} className="text-black underline mt-2 font-bold">Clear all filters</button>
                        </div>
                    )}

                    {/* Product Grid */}
                    {!loading && filteredProducts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="group cursor-pointer flex flex-col gap-3"
                                    onMouseEnter={() => setHoveredProduct(product._id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                    onClick={() => handleProductClick(product._id)}
                                >
                                    <div className="relative w-full h-[400px] bg-[#E5E5E5] rounded-2xl overflow-hidden">

                                        {/* Tag (Optional) */}
                                        {product.stock < 5 && (
                                            <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md z-10">
                                                Low Stock
                                            </span>
                                        )}

                                        <button 
                                            onClick={(e) => { e.stopPropagation(); }}
                                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm z-10 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Heart size={18} />
                                        </button>

                                        <img
                                            src={product.images?.[0] || "https://via.placeholder.com/400"} 
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        <div className="hidden md:flex">
                                            <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 transform ${hoveredProduct === product._id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleProductClick(product._id); }}
                                                    className="w-full cursor-pointer bg-[#1C1C1C] text-white py-3 rounded-xl flex justify-center items-center gap-2 font-medium shadow-lg hover:bg-black"
                                                >
                                                    <ShoppingBag size={16} /> View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start px-1">
                                        <div>
                                            <h3 className="font-medium text-lg text-[#1C1C1C] line-clamp-1">{product.name}</h3>
                                            <p className="text-gray-500 text-sm mt-1 capitalize">{product.category}</p>
                                        </div>
                                        <span className="font-semibold text-lg">₹{product.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {!loading && filteredProducts.length > 9 && (
                        <div className="flex justify-center mt-16">
                            <button className="border border-black text-black px-10 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-bold">
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MOBILE FILTER DRAWER --- */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>

                    <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Filters</h2>
                            <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-8">
                            <div>
                                <h3 className="font-semibold mb-3">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filters.categories.map((cat, i) => (
                                        <span 
                                            key={i} 
                                            onClick={() => handleCategoryClick(cat)}
                                            className={`px-3 py-1 rounded-md text-sm capitalize border cursor-pointer
                                                ${selectedCategory === cat ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200'}`}
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filters.sizes.map((size, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => handleSizeClick(size)}
                                            className={`w-10 h-10 border rounded-lg text-sm flex items-center justify-center transition-all
                                                ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-200'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Price</h3>
                                <div className="space-y-3">
                                    {filters.prices.map((p, i) => (
                                        <label key={i} className="flex items-center gap-3 cursor-pointer" onClick={() => handlePriceClick(p)}>
                                            <div className={`w-5 h-5 border rounded flex items-center justify-center ${selectedPrice === p ? 'bg-black border-black' : 'border-gray-300'}`}>
                                                {selectedPrice === p && <Check size={14} className="text-white" />}
                                            </div>
                                            <span className="text-gray-600">{p}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 mt-6">
                            <button 
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full bg-[#1C1C1C] text-white py-4 rounded-xl font-bold uppercase tracking-wide"
                            >
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