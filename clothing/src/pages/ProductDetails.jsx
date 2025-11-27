import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Star, Heart, ArrowRight, ArrowLeft, X } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();

  const [selectedSize, setSelectedSize] = useState("L");
  const [showDialog, setShowDialog] = useState(false);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orderSuccess, setOrderSuccess] = useState(false);

  // Order form data
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

  // HANDLE FORM INPUTS
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

  // PLACE ORDER
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
      setOrderSuccess(true);

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

      setShowDialog(false);
      alert("Order placed successfully!");

    } catch (err) {
      console.error("ORDER FAILED:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  // LOADING UI
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // ERROR UI
  if (error || !product) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        {error}
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
              src={product.images?.[0]} 
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
                {product.sizes?.map((size) => (
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
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-4">

          <div className="grid grid-cols-2 gap-4 h-[500px] lg:h-[600px]">
            <div className="rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={product.images?.[1] || product.images?.[0]} className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={product.images?.[2] || product.images?.[0]} className="w-full h-full object-cover" />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden bg-[#F0F0F0]">
              <img src={product.images?.[3] || product.images?.[0]} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-[#1C1C1C] rounded-2xl p-6 md:p-8 flex justify-between items-center text-white shadow-xl">
            <div className="text-4xl font-bold">₹ {product.price}</div>
            <button 
              onClick={() => setShowDialog(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition"
            >
              Buy Now <ArrowRight size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* ---- BUY NOW MODAL ---- */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-8 shadow-2xl border border-gray-200 max-h-[85vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Complete Your Order</h2>
              <button onClick={() => setShowDialog(false)} className="p-2 rounded-full hover:bg-gray-100 transition">
                <X size={26} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              <input name="name" onChange={handleChange} placeholder="Full Name" className="input" />
              <input name="mobile" onChange={handleChange} placeholder="Mobile Number" className="input" />
              <input name="email" onChange={handleChange} placeholder="Email" className="input" />

              <h3 className="font-semibold mt-3 text-lg text-gray-800">Address</h3>

              {["area","landmark","room","building","city","district","state","country"].map((field) => (
                <input
                  key={field}
                  name={`address.${field}`}
                  onChange={handleChange}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  className="input"
                />
              ))}

              <button 
                onClick={handleSubmit}
                className="bg-black text-white py-3 rounded-xl text-lg font-semibold mt-4 hover:bg-gray-900 transition"
              >
                Place Order
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
