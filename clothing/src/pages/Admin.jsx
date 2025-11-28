// Admin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  Package,
  Search,
  Edit3,
  UploadCloud,
  X,
  CheckCircle,
  DollarSign,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true); // desktop collapse
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // mobile slide-over

  // --- DATA STATES ---
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0 });
  const [loading, setLoading] = useState(false);

  // --- MODAL STATES ---
  const [editProduct, setEditProduct] = useState(null);
  const [successModal, setSuccessModal] = useState({ show: false, message: "" });

  // --- FORM STATES (Add Product) ---
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    sizes: "",
    description: "",
    stock: "",
    imageFiles: [],
    previewImages: [],
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // ================= INITIAL DATA FETCHING =================
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Calculate simple stats whenever data changes
  useEffect(() => {
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    setStats({
      revenue: totalRevenue,
      orders: orders.length,
      products: products.length,
    });
  }, [orders, products]);

  // ================= API CALLS =================

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://krushnaclothing.onrender.com/api/products");
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://krushnaclothing.onrender.com/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.patch(`https://krushnaclothing.onrender.com/api/admin/order/${orderId}`, {
        status: newStatus,
      });
      await fetchOrders();
      setSuccessModal({ show: true, message: "Order status updated successfully!" });
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      await axios.patch(`https://krushnaclothing.onrender.com/api/admin/product/${editProduct._id}`, {
        price: Number(editProduct.price),
        stock: Number(editProduct.stock),
      });

      setEditProduct(null);
      fetchProducts();
      setSuccessModal({ show: true, message: "Product details updated successfully!" });
    } catch (err) {
      console.error("Failed to update product", err);
      alert("Failed to update product");
    }
  };

  // --- ADD PRODUCT LOGIC ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 8); // safe cap
    setFormData((prev) => ({
      ...prev,
      imageFiles: files,
      previewImages: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("sizes", formData.sizes);
      productData.append("description", formData.description);
      productData.append("stock", formData.stock);

      formData.imageFiles.forEach((file) => {
        productData.append("images", file);
      });

      await axios.post("https://krushnaclothing.onrender.com/api/admin/product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Revoke preview object URLs to avoid memory leak
      formData.previewImages.forEach((url) => URL.revokeObjectURL(url));

      // Reset form
      setFormData({
        name: "",
        price: "",
        category: "",
        sizes: "",
        description: "",
        stock: "",
        imageFiles: [],
        previewImages: [],
      });
      fetchProducts();
      setSuccessModal({ show: true, message: "New product added successfully!" });
    } catch (error) {
      console.error(error);
      setFormError("Failed to add product.");
    }
    setFormLoading(false);
  };

  // ================= RENDER COMPONENTS =================

  // 1. DASHBOARD TAB
  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-black text-white rounded-full"><DollarSign /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-xl md:text-2xl font-bold">₹{Number(stats.revenue).toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-gray-100 text-black rounded-full"><Package /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-xl md:text-2xl font-bold">{stats.orders}</h3>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-gray-100 text-black rounded-full"><ShoppingBag /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-xl md:text-2xl font-bold">{stats.products}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-gray-600 text-sm">New order received from <span className="font-bold text-black">Customer #{1000 + i}</span></p>
              <span className="ml-auto text-xs text-gray-400">2 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. PRODUCTS TAB
  const renderProducts = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Products</h2>
        <div className="flex gap-2">
          <button onClick={() => setActiveTab("add-product")} className="bg-black text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-800">
            <PlusCircle size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[680px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-3 font-semibold text-gray-600">Image</th>
                <th className="p-3 font-semibold text-gray-600">Name</th>
                <th className="p-3 font-semibold text-gray-600">Category</th>
                <th className="p-3 font-semibold text-gray-600">Price</th>
                <th className="p-3 font-semibold text-gray-600">Stock</th>
                <th className="p-3 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="p-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {product.images?.[0] ? (
                        // ensure remote images don't overflow
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">No</div>
                      )}
                    </div>
                  </td>
                  <td className="p-3 font-medium max-w-[220px] truncate">{product.name}</td>
                  <td className="p-3 text-gray-500">{product.category}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => setEditProduct(product)} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-black transition" aria-label={`Edit ${product.name}`}>
                      <Edit3 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 3. ADD PRODUCT TAB
  const renderAddProduct = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Add New Product</h2>

      <div className="bg-white p-4 md:p-8 rounded-3xl border border-gray-100 shadow-lg">
        {formError && (
          <div className="mb-4 bg-red-50 text-red-700 py-3 px-4 rounded-xl flex items-center gap-2">
            <X size={18} /> {formError}
          </div>
        )}

        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Product Name</label>
              <input name="name" value={formData.name} onChange={handleFormChange} required placeholder="e.g. Oversized Hoodie" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Category</label>
              <input name="category" value={formData.category} onChange={handleFormChange} required placeholder="e.g. hoodies" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Price (₹)</label>
              <input name="price" type="number" value={formData.price} onChange={handleFormChange} required placeholder="799" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Stock</label>
              <input name="stock" type="number" value={formData.stock} onChange={handleFormChange} required placeholder="18" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Sizes (comma sep)</label>
              <input name="sizes" value={formData.sizes} onChange={handleFormChange} required placeholder="M, L, XL" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} required placeholder="Product details..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition min-h-[100px]" />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-700">Images (Max 4 recommended)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer relative">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <UploadCloud size={24} />
                <p className="text-sm">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">Max 4 images recommended</p>
              </div>
            </div>
          </div>

          {/* Preview Grid */}
          {formData.previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.previewImages.slice(0, 8).map((src, i) => (
                <div key={i} className="aspect-[1/1] rounded-xl overflow-hidden border border-gray-200 relative">
                  <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => {
              setFormData({
                name: "",
                price: "",
                category: "",
                sizes: "",
                description: "",
                stock: "",
                imageFiles: [],
                previewImages: [],
              });
              setFormError("");
            }} className="flex-1 py-2 border border-gray-200 rounded-xl font-medium hover:bg-gray-50">Reset</button>

            <button type="submit" disabled={formLoading} className="flex-1 bg-black text-white py-2 rounded-xl font-bold hover:bg-gray-900 disabled:opacity-70">
              {formLoading ? "Uploading..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // 4. ORDERS TAB
  const renderOrders = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl md:text-3xl font-bold">Order Management</h2>

      <div className="grid grid-cols-1 gap-4">
        {orders.length === 0 && <div className="text-gray-500 p-4">No orders found.</div>}
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 hover:shadow-md transition">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 border-b border-gray-100 pb-4">
              <div className="w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">Order #{String(order._id).slice(-6).toUpperCase()}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                    ${order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{new Date(order.createdAt).toLocaleString()} • {order.items?.length || 0} Items</p>
              </div>

              {/* Status Updater */}
              <div className="mt-3 md:mt-0 flex items-center gap-3">
                <label className="text-sm font-medium text-gray-600">Update Status:</label>
                <select
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer Details</h4>
                <p className="text-sm text-gray-600">{order.name}</p>
                <p className="text-sm text-gray-600">{order.email}</p>
                <p className="text-sm text-gray-600">{order.mobile}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                <p className="text-sm text-gray-600">
                  {order.address?.room}, {order.address?.building} <br />
                  {order.address?.area}, {order.address?.landmark} <br />
                  {order.address?.city} - {order.address?.state}
                </p>
              </div>
            </div>

            {/* Order Items (Images) */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Ordered Items</h4>
              <div className="flex flex-wrap gap-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[200px]">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200 shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-300"><Package size={16} /></div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">₹{item.price}</p>
                    </div>
                  </div>
                )) || <div className="text-gray-500">No items</div>}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <p className="text-lg md:text-xl font-bold">Total: ₹{order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ================= MAIN RENDER =================
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1C] font-mainfont flex">

      {/* DESKTOP SIDEBAR */}
      <aside className={`hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>
        <div className="p-5 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold tracking-tighter">ADMIN.</h1>}
          <button onClick={() => setSidebarOpen((s) => !s)} className="p-2 hover:bg-gray-100 rounded-lg">
            <LayoutDashboard size={18} />
          </button>
        </div>

        <nav className="mt-6 px-3 space-y-2">
          <SidebarItem icon={<TrendingUp />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} isOpen={sidebarOpen} />
          <SidebarItem icon={<ShoppingBag />} label="Products" active={activeTab === "products"} onClick={() => setActiveTab("products")} isOpen={sidebarOpen} />
          <SidebarItem icon={<PlusCircle />} label="Add Product" active={activeTab === "add-product"} onClick={() => setActiveTab("add-product")} isOpen={sidebarOpen} />
          <SidebarItem icon={<Package />} label="Orders" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} isOpen={sidebarOpen} />
        </nav>
      </aside>

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 w-full bg-white z-50 border-b border-gray-200 p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-100">
            <LayoutDashboard size={18} />
          </button>
          <h1 className="text-lg font-bold">ADMIN PANEL</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveTab("orders")} className="text-sm px-3 py-1 rounded-md hover:bg-gray-50">Orders</button>
        </div>
      </header>

      {/* MOBILE SIDEBAR (slide-over) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4 shadow-xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">ADMIN.</h2>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 rounded-md hover:bg-gray-100"><X size={18} /></button>
            </div>

            <nav className="space-y-2">
              <SidebarItem icon={<TrendingUp />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => { setActiveTab("dashboard"); setMobileSidebarOpen(false); }} isOpen={true} />
              <SidebarItem icon={<ShoppingBag />} label="Products" active={activeTab === "products"} onClick={() => { setActiveTab("products"); setMobileSidebarOpen(false); }} isOpen={true} />
              <SidebarItem icon={<PlusCircle />} label="Add Product" active={activeTab === "add-product"} onClick={() => { setActiveTab("add-product"); setMobileSidebarOpen(false); }} isOpen={true} />
              <SidebarItem icon={<Package />} label="Orders" active={activeTab === "orders"} onClick={() => { setActiveTab("orders"); setMobileSidebarOpen(false); }} isOpen={true} />
            </nav>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"} mt-16 md:mt-0 w-full`}>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "products" && renderProducts()}
        {activeTab === "add-product" && renderAddProduct()}
        {activeTab === "orders" && renderOrders()}
      </main>

      {/* EDIT MODAL */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
          <div className="bg-white w-full max-w-md rounded-2xl p-4 md:p-6 shadow-2xl animate-in zoom-in">
            <h3 className="text-lg md:text-2xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditProductSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-600">Product Name</label>
                <input value={editProduct.name} disabled className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-xl text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Price</label>
                <input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Stock</label>
                <input
                  type="number"
                  value={editProduct.stock}
                  onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setEditProduct(null)} className="flex-1 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-black text-white font-bold rounded-xl hover:bg-gray-900">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {successModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-2xl w-full max-w-sm text-center animate-in zoom-in">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={26} />
            </div>
            <h3 className="text-lg md:text-2xl font-bold mb-1">Success!</h3>
            <p className="text-gray-500 mb-4">{successModal.message}</p>
            <button onClick={() => setSuccessModal({ show: false, message: "" })} className="w-full bg-black text-white py-2 rounded-xl font-bold hover:bg-gray-900">Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for Sidebar Items
const SidebarItem = ({ icon, label, active, onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left
      ${active ? "bg-black text-white shadow-lg" : "text-gray-600 hover:bg-gray-50 hover:text-black"}
    `}
  >
    <div className="w-6 h-6 flex items-center justify-center">
      {icon}
    </div>
    {isOpen && <span className="font-semibold">{label}</span>}
  </button>
);

export default Admin;
