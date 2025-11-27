import React, { useState } from 'react';
import axios from "axios";
import { Menu, X, ShoppingCart, User, Search, ChevronRight, Package, Truck, ShoppingBag, Trash2, CheckCircle, Home, Info, BookOpen, HelpCircle } from "lucide-react";

export default function Navbar() {
  // Navigation States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Profile / Orders State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileInput, setMobileInput] = useState("");
  const [userOrders, setUserOrders] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderError, setOrderError] = useState("");

  // Cart State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartMobileInput, setCartMobileInput] = useState("");
  const [userCart, setUserCart] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false);
  const [cartError, setCartError] = useState("");

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutFormData, setCheckoutFormData] = useState({
    name: "",
    email: "",
    address: {
      room: "",
      building: "",
      area: "",
      landmark: "",
      city: "",
      district: "",
      state: "",
      country: "",
    },
  });

  // --- FETCH ORDERS ---
  const fetchOrders = async () => {
    if (!mobileInput.trim() || mobileInput.length < 10) {
      setOrderError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoadingOrders(true);
      setOrderError("");

      const res = await axios.get(`http://localhost:8000/api/orders/${mobileInput}`);

      if (!res.data || res.data.length === 0) {
        setOrderError("No orders found for this mobile number.");
        setUserOrders(null);
        return;
      }

      setUserOrders(res.data);
    } catch (err) {
      console.error(err);
      setOrderError("Failed to fetch orders. Check details and try again.");
      setUserOrders(null);
    } finally {
      setLoadingOrders(false);
    }
  };

  // --- FETCH CART ---
  const fetchCart = async () => {
    if (!cartMobileInput.trim() || cartMobileInput.length < 10) {
      setCartError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoadingCart(true);
      setCartError("");

      const res = await axios.get(`http://localhost:8000/api/cart/${cartMobileInput}`);
      const cartItems = res.data.items || res.data; 

      if (!cartItems || cartItems.length === 0) {
        setCartError("Your cart is empty.");
        setUserCart(null);
        return;
      }

      setUserCart(cartItems);
    } catch (err) {
      console.error(err);
      setCartError("Failed to fetch cart. You might not have a cart yet.");
      setUserCart(null);
    } finally {
      setLoadingCart(false);
    }
  };

  // --- REMOVE FROM CART API ---
  const handleRemoveFromCart = async (productId) => {
    if (!cartMobileInput || !productId) {
      console.error("Missing Mobile or Product ID for deletion");
      return; 
    }

    try {
      await axios.delete("http://localhost:8000/api/cart/remove", {
        data: {
          mobile: cartMobileInput,
          productId: productId
        }
      });

      setUserCart((prev) => {
          if (!prev) return null;
          return prev.filter(item => {
              const currentId = item.productId || item._id;
              return currentId !== productId;
          });
      });
      
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  // --- CHECKOUT LOGIC ---

  const handleProceedToCheckout = () => {
    if (!userCart || userCart.length === 0) return;
    setCheckoutItems(userCart);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleRemoveFromCheckout = (indexToRemove) => {
    setCheckoutItems((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCheckoutFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setCheckoutFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setCheckoutFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async () => {
    if (checkoutItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalAmount = checkoutItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

    const orderData = {
      mobile: cartMobileInput,
      name: checkoutFormData.name,
      email: checkoutFormData.email,
      address: checkoutFormData.address,
      paymentMethod: "Cash on Delivery",
      items: checkoutItems.map(item => ({
        productId: item.productId || item._id,
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: totalAmount,
    };

    try {
      const res = await axios.post("http://localhost:8000/api/orders/place", orderData);
      console.log("ORDER PLACED:", res.data);
      alert("Order placed successfully!");
      setIsCheckoutOpen(false);
      setCheckoutItems([]);
      setUserCart(null);
    } catch (err) {
      console.error("ORDER FAILED:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      {/* ===================== NAVBAR ===================== */}
      <nav className="relative w-full px-6 py-4 flex items-center justify-between font-mainfont font-medium z-40 ">

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
            <button onClick={() => setIsCartOpen(true)} className="hover:text-black transition">
               <ShoppingCart size={22} className="cursor-pointer" />
            </button>

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
        <div className="flex md:hidden items-center gap-5 text-gray-800 z-50 pointer-events-auto">
          <button onClick={() => setIsSearchOpen(true)}><Search size={22} /></button>
          <button onClick={() => setIsCartOpen(true)} className="relative">
             <ShoppingCart size={22} />
             <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsMenuOpen(true)}><Menu size={26} /></button>
        </div>
      </nav>

      {/* ===================== MOBILE SEARCH OVERLAY (Trendy Blur) ===================== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white/80 backdrop-blur-xl flex flex-col pt-32 px-6 animate-in fade-in duration-300">
          
          <button 
            onClick={() => setIsSearchOpen(false)} 
            className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <X size={24} />
          </button>

          <div className="w-full max-w-lg mx-auto">
             <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Search Rawaura</p>
             <input 
               type="text" 
               placeholder="What are you looking for?" 
               className="w-full bg-transparent text-3xl md:text-5xl font-bold placeholder-gray-300 border-b-2 border-gray-200 focus:border-black outline-none py-4 transition-colors"
               autoFocus
             />
             <p className="mt-4 text-gray-500 text-sm">Type 'Hoodie', 'T-Shirt', or 'Pants' to start...</p>
          </div>
        </div>
      )}

      {/* ===================== MOBILE MENU OVERLAY (Trendy Blur) ===================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white/90 backdrop-blur-2xl flex flex-col justify-center items-center animate-in fade-in zoom-in-95 duration-300">
           
           <button 
              onClick={() => setIsMenuOpen(false)} 
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
            >
              <X size={24}/>
           </button>
           <div className="flex flex-col gap-8 text-center">
              <a href="/" className="text-4xl font-semibold hover:text-gray-500 transition-colors">Home</a>
              <a href="/about-us" className="text-4xl font-semibold hover:text-gray-500 transition-colors">About</a>
              <a href="/blog" className="text-4xl font-semibold hover:text-gray-500 transition-colors">Blog</a>
              <a href="/faq" className="text-4xl font-semibold hover:text-gray-500 transition-colors">FAQs</a>
           </div>

           <div className="mt-8 flex gap-6">
              <button 
                onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }} 
                className="flex flex-col items-center gap-2 text-gray-600 hover:text-black transition-transform hover:scale-110"
              >
                <div className="p-4 bg-white rounded-full shadow-md"><ShoppingBag size={24}/></div>
                <span className="text-sm font-bold">Cart</span>
              </button>
              
              <button 
                onClick={() => { setIsMenuOpen(false); setIsProfileOpen(true); }} 
                className="flex flex-col items-center gap-2 text-gray-600 hover:text-black transition-transform hover:scale-110"
              >
                <div className="p-4 bg-white rounded-full shadow-md"><User size={24}/></div>
                <span className="text-sm font-bold">Orders</span>
              </button>
           </div>
<p className='mt-42 text-gray-400'>Fashion by RawAura</p>

        </div>
      )}


      {/* ===================== USER ORDERS MODAL ===================== */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Package className="text-black" /> My Orders</h2>
              <button onClick={() => { setIsProfileOpen(false); setUserOrders(null); setMobileInput(""); setOrderError(""); }} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={20} /></button>
            </div>
            {/* STEP 1: ENTER MOBILE NUMBER */}
            {!userOrders && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm mb-4">Enter your registered mobile number to view your order history.</p>
                  <input type="text" placeholder="e.g. 9029656714" value={mobileInput} onChange={(e) => setMobileInput(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-medium outline-none focus:ring-2 focus:ring-black transition-all mb-4" autoFocus />
                  {orderError && <div className="mb-4 text-red-500 text-sm bg-red-50 py-2 px-3 rounded-lg">{orderError}</div>}
                  <button onClick={fetchOrders} disabled={loadingOrders} className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition active:scale-[0.98] disabled:opacity-70">{loadingOrders ? "Searching..." : "Find Orders"}</button>
                </div>
              </div>
            )}
            {/* STEP 2: SHOW ORDERS LIST */}
            {userOrders && (
              <div className="space-y-4">
                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {userOrders.map((order, idx) => (
                    <div key={order._id || idx} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <p className="font-bold text-gray-900">{order.items?.[0]?.name} {order.items?.length > 1 && `+ ${order.items.length - 1} others`}</p>
                            <p className="text-xs text-gray-400 mt-1">ID: {order._id?.slice(-6).toUpperCase()}</p>
                         </div>
                         <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status || 'Pending'}</span>
                      </div>
                      <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-200/50">
                        <div className="flex items-center gap-2 text-sm text-gray-500"><Truck size={14} /><span>{new Date(order.createdAt).toLocaleDateString()}</span></div>
                        <p className="font-bold text-lg">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setUserOrders(null); setOrderError(""); }} className="w-full py-3 text-gray-500 hover:text-black text-sm font-medium underline">Check another number</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== SHOPPING CART MODAL ===================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2"><ShoppingBag className="text-black" /> Your Cart</h2>
              <button onClick={() => { setIsCartOpen(false); setUserCart(null); setCartMobileInput(""); setCartError(""); }} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={20} /></button>
            </div>
            {/* STEP 1: ENTER MOBILE NUMBER FOR CART */}
            {!userCart && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm mb-6">Please enter your mobile number to load your saved cart items.</p>
                  <input type="text" placeholder="e.g. 9029656714" value={cartMobileInput} onChange={(e) => setCartMobileInput(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-medium outline-none focus:ring-2 focus:ring-black transition-all mb-4" autoFocus />
                  {cartError && <div className="mb-4 text-red-500 text-sm bg-red-50 py-2 px-3 rounded-lg">{cartError}</div>}
                  <button onClick={fetchCart} disabled={loadingCart} className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition active:scale-[0.98] disabled:opacity-70">{loadingCart ? "Loading Cart..." : "View Cart"}</button>
                </div>
              </div>
            )}
            {/* STEP 2: SHOW CART ITEMS */}
            {userCart && (
              <div className="space-y-4">
                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {userCart.map((item, idx) => {
                    // Extract ID safely for deletion
                    const currentId = item.productId || item._id;

                    return (
                      <div key={currentId || idx} className="flex gap-4 border border-gray-100 rounded-2xl p-3 bg-white shadow-sm hover:shadow-md transition-all relative group">
                        
                        {/* --- DELETE BUTTON (Fixed Logic) --- */}
                        <button 
                          onClick={() => handleRemoveFromCart(currentId)}
                          className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10 cursor-pointer"
                          title="Remove from cart"
                        >
                          <Trash2 size={16} />
                        </button>

                        {/* Product Image */}
                        <div className="h-20 w-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-300"><Package /></div>
                          )}
                        </div>
                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                              <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                              <p className="text-sm text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                          </div>
                          <div className="flex justify-between items-end">
                              <span className="font-bold">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Footer / Checkout */}
                <div className="border-t border-gray-100 pt-4 mt-2">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-500">Total Items</span>
                      <span className="font-bold">{userCart.length}</span>
                   </div>
                   <button onClick={handleProceedToCheckout} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition shadow-lg flex justify-center items-center gap-2">Proceed to Checkout <ChevronRight size={18}/></button>
                </div>
                <button onClick={() => { setUserCart(null); setCartError(""); }} className="w-full py-2 text-gray-400 hover:text-gray-600 text-xs text-center">Change Number</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== BUY NOW / CHECKOUT MODAL ===================== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
                <p className="text-gray-500 text-sm mt-1">Review your items and complete purchase</p>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors"><X size={28} /></button>
            </div>
            <div className="space-y-8">
              {/* SECTION 1: ITEMS REVIEW */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2 mb-4"><div className="w-1 h-6 bg-black rounded-full"></div> Order Summary</h3>
                {checkoutItems.length > 0 ? (
                  <div className="space-y-3">
                    {checkoutItems.map((item, idx) => (
                      <div key={idx} className="flex gap-4 border border-gray-100 rounded-2xl p-3 bg-gray-50 hover:bg-white hover:shadow-sm transition-all relative group">
                        {/* Remove from Checkout (Local only) */}
                        <button 
                          onClick={() => handleRemoveFromCheckout(idx)} 
                          className="absolute -top-2 -right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer" 
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                        
                        <div className="h-16 w-16 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-200">
                          {item.image ? (<img src={item.image} alt={item.name} className="h-full w-full object-cover" />) : (<div className="h-full w-full flex items-center justify-center text-gray-300"><Package size={16}/></div>)}
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                          </div>
                          <div className="font-bold text-gray-900">₹{item.price}</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end pt-2 text-sm font-bold">Total: ₹{checkoutItems.reduce((acc, i) => acc + (Number(i.price) * i.quantity), 0)}</div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl text-gray-500">No items selected for checkout.</div>
                )}
              </div>
              {/* SECTION 2: PERSONAL DETAILS */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2"><div className="w-1 h-6 bg-black rounded-full"></div> Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="name" onChange={handleCheckoutFormChange} placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"/>
                  <input type="text" value={cartMobileInput} disabled className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed" title="Mobile number from cart login"/>
                </div>
                <input name="email" onChange={handleCheckoutFormChange} placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"/>
              </div>
              {/* SECTION 3: SHIPPING ADDRESS */}
              <div className="space-y-4 pt-2">
                 <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2"><div className="w-1 h-6 bg-black rounded-full"></div> Shipping Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["room", "building", "area", "landmark", "city", "district", "state", "country"].map((field) => (
                    <input key={field} name={`address.${field}`} onChange={handleCheckoutFormChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all ${field === 'area' || field === 'landmark' ? 'md:col-span-2' : ''}`}/>
                  ))}
                </div>
              </div>
              <button onClick={handlePlaceOrder} className="w-full bg-black text-white py-4 rounded-xl text-lg font-bold mt-4 hover:bg-gray-900 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl flex justify-center items-center gap-2">Confirm Order <CheckCircle size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}