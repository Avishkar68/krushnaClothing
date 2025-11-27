import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Star, Heart, ArrowRight, ArrowLeft, X, ShoppingBag, CheckCircle, Smartphone } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("L");
  
  // Dialog states
  const [showBuyNowDialog, setShowBuyNowDialog] = useState(false);
  const [showCartDialog, setShowCartDialog] = useState(false); // New dialog for Cart Mobile input

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart/Order states
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMobile, setCartMobile] = useState(""); // State to capture mobile for cart

  // Order form data (Buy Now)
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    name: "",
    address: {
      area: "",
      landmark: "",
      room: "",
      building: "",
      city: "",
      district: "",
      state: "",
      country: "",
    },
  });

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // HANDLE FORM INPUTS (Buy Now)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 1. OPEN CART DIALOG
  const handleAddToCartClick = () => {
    setShowCartDialog(true);
  };

  // 2. CONFIRM ADD TO CART (Call API)
  const confirmAddToCart = async () => {
    if (!product) return;
    if (!cartMobile || cartMobile.length < 10) {
      alert("Please enter a valid mobile number");
      return;
    }

    setIsAddingToCart(true);

    // Constructing Payload as per requirements
    const cartPayload = {
      mobile: cartMobile,
      item: {
        productId: id, // from params or product._id
        name: product.name,
        price: product.price,
        size: selectedSize, // mapped from UI state
        quantity: 1, // default quantity
        image: product.images?.[0] || "" // first image from array
      }
    };

    try {
      const res = await axios.post("http://localhost:8000/api/cart/add", cartPayload);
      console.log("ADDED TO CART:", res.data);
      alert("Product added to cart successfully!");
      setShowCartDialog(false); // Close dialog on success
      setCartMobile(""); // Reset mobile input
    } catch (err) {
      console.error("ADD TO CART FAILED:", err);
      alert("Failed to add to cart. Check console for details."); 
    } finally {
      setIsAddingToCart(false);
    }
  };

  // PLACE ORDER (BUY NOW)
  const handleSubmit = async () => {
    if (!product) return;

    const orderData = {
      ...formData,
      paymentMethod: "Cash on Delivery",
      items: [
        {
          productId: id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          quantity: 1,
          image: product.images?.[0] || ""
        },
      ],
      totalAmount: product.price,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/orders/place", orderData);

      console.log("ORDER PLACED:", res.data);

      // Clear form
      setFormData({
        mobile: "",
        email: "",
        name: "",
        address: {
          area: "",
          landmark: "",
          room: "",
          building: "",
          city: "",
          district: "",
          state: "",
          country: "",
        },
      });

      setShowBuyNowDialog(false);
      alert("Order placed successfully!");

    } catch (err) {
      console.error("ORDER FAILED:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // ERROR UI
  if (error || !product) {
    return (
      <div className="text-center py-20 text-red-500 text-xl font-medium">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div className="w-[96%] mx-auto min-h-screen text-[#1C1C1C] font-mainfont pb-20">
      
      {/* BREADCRUMB */}
      <div className="py-6 flex items-center gap-2 text-gray-500 text-sm font-medium">
        <Link to="/" className="hover:text-black transition-colors">
          <ArrowLeft size={16} className="inline mr-1"/> Home
        </Link>
        <span className="text-gray-300">•</span>
        <span className="text-black">Product details</span>
      </div>

      {/* ---- MAIN PRODUCT PAGE ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">

          <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden bg-[#F0F0F0]">
            <img 
              src={product.images?.[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-2xl p-8 flex flex-col gap-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 font-medium">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span>4.9</span>
                  <span className="text-gray-400">(41) New Reviews</span>
                </div>
              </div>
              <button className="p-3 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition">
                <Heart className="fill-current" size={24} />
              </button>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.length > 0 ? product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                      ${selectedSize === size 
                        ? "bg-[#1C1C1C] text-white shadow-lg scale-105" 
                        : "bg-white border border-gray-200 text-gray-600 hover:border-black"}`}
                  >
                    {size}
                  </button>
                )) : (
                   <span className="text-gray-500 text-sm">One Size</span>
                )}
              </div>
            </div>

             <div className="prose text-gray-600 leading-relaxed">
                <h3 className="font-bold text-black text-lg mb-2">Description</h3>
                <p>{product.description}</p>
             </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">

          <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
            <div className="rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={product.images?.[1] || product.images?.[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover" alt="detail" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={product.images?.[2] || product.images?.[0] || "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover" alt="detail" />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={product.images?.[3] || product.images?.[0] || "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover" alt="detail" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 flex justify-between items-center text-white shadow-xl">
              <div className="text-4xl font-bold">₹ {product.price}</div>
              <button 
                onClick={() => setShowBuyNowDialog(true)}
                className="bg-white cursor-pointer text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 hover:scale-105 transition-all"
              >
                Buy Now <ArrowRight size={20} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCartClick}
              disabled={isAddingToCart}
              className="bg-white border-2 border-[#1C1C1C] cursor-pointer text-[#1C1C1C] px-8 py-5 w-full text-center rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-70"
            >
               Add to Cart <ShoppingBag size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* ---- 1. CART MOBILE INPUT DIALOG ---- */}
      {showCartDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
           <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-bold">Add to Cart</h3>
                 <button onClick={() => setShowCartDialog(false)} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="space-y-4">
                 <p className="text-gray-500 text-sm">Please enter your mobile number to add items to your cart.</p>
                 <div className="relative">
                    <Smartphone className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      value={cartMobile}
                      onChange={(e) => setCartMobile(e.target.value)}
                      placeholder="Mobile Number" 
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
                      autoFocus
                    />
                 </div>
                 <button 
                    onClick={confirmAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                 >
                    {isAddingToCart ? "Adding..." : "Confirm & Add"}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* ---- 2. BUY NOW MODAL ---- */}
      {showBuyNowDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
                <p className="text-gray-500 text-sm mt-1">Complete your order details below</p>
              </div>
              <button 
                onClick={() => setShowBuyNowDialog(false)} 
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-black rounded-full"></div> Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    name="name" 
                    onChange={handleChange} 
                    placeholder="Full Name" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  />
                  <input 
                    name="mobile" 
                    onChange={handleChange} 
                    placeholder="Mobile Number" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                  />
                </div>
                <input 
                  name="email" 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-2">
                 <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-black rounded-full"></div> Shipping Address
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["room", "building", "area", "landmark", "city", "district", "state", "country"].map((field) => (
                    <input
                      key={field}
                      name={`address.${field}`}
                      onChange={handleChange}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all ${
                        field === 'area' || field === 'landmark' ? 'md:col-span-2' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary Snippet */}
              <div className="bg-gray-50 rounded-xl p-4 mt-6 flex justify-between items-center border border-gray-200">
                <div className="flex items-center gap-3">
                   <div className="h-12 w-12 rounded-lg bg-white border border-gray-200 overflow-hidden">
                      <img src={product.images?.[0]} className="w-full h-full object-cover" alt="mini" />
                   </div>
                   <div>
                      <p className="font-bold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">Size: {selectedSize} | Qty: 1</p>
                   </div>
                </div>
                <div className="font-bold text-lg">₹ {product.price}</div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold mt-4 hover:bg-gray-900 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl flex justify-center items-center gap-2"
              >
                Confirm Order <CheckCircle size={20} />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;