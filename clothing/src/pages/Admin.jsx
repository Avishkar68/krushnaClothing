import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  PlusCircle, 
  Package, 
  Settings, 
  Search, 
  Edit3, 
  Trash2, 
  UploadCloud, 
  X, 
  Check, 
  CheckCircle, // Added CheckCircle
  DollarSign, 
  TrendingUp, 
  Users, 
  ChevronDown 
} from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- DATA STATES ---
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0 });
  const [loading, setLoading] = useState(false);

  // --- MODAL STATES ---
  const [editProduct, setEditProduct] = useState(null); // For Edit Modal
  const [successModal, setSuccessModal] = useState({ show: false, message: "" }); // NEW: Success Modal State

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
      products: products.length
    });
  }, [orders, products]);


  // ================= API CALLS =================

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/products");
      setProducts(res.data.products || res.data); 
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/admin/order/${orderId}`, {
        status: newStatus
      });
      // Refresh orders to see change
      fetchOrders();
      setSuccessModal({ show: true, message: "Order status updated successfully!" }); // Trigger Dialog
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      await axios.patch(`http://localhost:8000/api/admin/product/${editProduct._id}`, {
        price: Number(editProduct.price),
        stock: Number(editProduct.stock)
      });
      
      setEditProduct(null);
      fetchProducts(); // Refresh list
      setSuccessModal({ show: true, message: "Product details updated successfully!" }); // Trigger Dialog
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
    const files = Array.from(e.target.files);
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

      await axios.post("http://localhost:8000/api/admin/product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setFormData({
        name: "", price: "", category: "", sizes: "", description: "", stock: "", imageFiles: [], previewImages: [],
      });
      fetchProducts(); // Update the list
      setSuccessModal({ show: true, message: "New product added successfully!" }); // Trigger Dialog
    } catch (error) {
      console.error(error);
      setFormError("Failed to add product.");
    }
    setFormLoading(false);
  };


  // ================= RENDER COMPONENTS =================

  // 1. DASHBOARD TAB
  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-black text-white rounded-full"><DollarSign /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-gray-100 text-black rounded-full"><Package /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold">{stats.orders}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-gray-100 text-black rounded-full"><ShoppingBag /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h3 className="text-2xl font-bold">{stats.products}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1,2,3].map(i => (
             <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-600">New order received from <span className="font-bold text-black">Customer #{1000+i}</span></p>
                <span className="ml-auto text-xs text-gray-400">2 mins ago</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 2. PRODUCTS TAB
  const renderProducts = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Products</h2>
        <button onClick={() => setActiveTab('add-product')} className="bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-800">
          <PlusCircle size={20} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Image</th>
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Stock</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                    </div>
                  </td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-gray-500">{product.category}</td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => setEditProduct(product)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-black transition"
                    >
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // 3. ADD PRODUCT TAB
  const renderAddProduct = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold mb-8">Add New Product</h2>
      
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
        {formError && <div className="mb-6 bg-red-50 text-red-700 py-3 px-4 rounded-xl flex items-center gap-2"><X size={20}/> {formError}</div>}

        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Product Name</label>
              <input name="name" value={formData.name} onChange={handleFormChange} required placeholder="e.g. Oversized Hoodie" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Category</label>
              <input name="category" value={formData.category} onChange={handleFormChange} required placeholder="e.g. hoodies" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Price (₹)</label>
              <input name="price" type="number" value={formData.price} onChange={handleFormChange} required placeholder="799" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Stock</label>
              <input name="stock" type="number" value={formData.stock} onChange={handleFormChange} required placeholder="18" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-2 text-gray-700">Sizes (comma sep)</label>
              <input name="sizes" value={formData.sizes} onChange={handleFormChange} required placeholder="M, L, XL" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleFormChange} required placeholder="Product details..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black transition min-h-[120px]" />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-700">Images (Max 4 recommended)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
              <input type="file" multiple onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <UploadCloud size={32} />
                <p>Click to upload or drag and drop</p>
              </div>
            </div>
          </div>

          {/* Preview Grid */}
          {formData.previewImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {formData.previewImages.map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-200 relative">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <button type="submit" disabled={formLoading} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-70">
            {formLoading ? "Uploading..." : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );

  // 4. ORDERS TAB
  const renderOrders = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold">Order Management</h2>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
            
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-gray-100 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">Order #{order._id.slice(-6).toUpperCase()}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider 
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 
                      'bg-yellow-100 text-yellow-700'}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{new Date(order.createdAt).toLocaleString()} • {order.items?.length} Items</p>
              </div>

              {/* Status Updater */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Update Status:</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer Details</h4>
                <p className="text-sm text-gray-600">{order.name}</p>
                <p className="text-sm text-gray-600">{order.email}</p>
                <p className="text-sm text-gray-600">{order.mobile}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                <p className="text-sm text-gray-600">
                  {order.address?.room}, {order.address?.building}<br/>
                  {order.address?.area}, {order.address?.landmark}<br/>
                  {order.address?.city} - {order.address?.state}
                </p>
              </div>
            </div>

            {/* Order Items (Images) */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Ordered Items</h4>
              <div className="flex flex-wrap gap-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-[200px]">
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200 shrink-0">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-300"><Package size={16}/></div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.size} • Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <p className="text-xl font-bold">Total: ₹{order.totalAmount}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );


  // ================= MAIN RENDER =================
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1C] font-mainfont flex">
      
      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} hidden md:block`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold tracking-tighter">ADMIN.</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
             <LayoutDashboard size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          <SidebarItem icon={<TrendingUp />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} isOpen={sidebarOpen} />
          <SidebarItem icon={<ShoppingBag />} label="Products" active={activeTab === 'products'} onClick={() => setActiveTab('products')} isOpen={sidebarOpen} />
          <SidebarItem icon={<PlusCircle />} label="Add Product" active={activeTab === 'add-product'} onClick={() => setActiveTab('add-product')} isOpen={sidebarOpen} />
          <SidebarItem icon={<Package />} label="Orders" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} isOpen={sidebarOpen} />
        </nav>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 w-full bg-white z-40 border-b border-gray-200 p-4 flex justify-between items-center">
         <h1 className="text-xl font-bold">ADMIN PANEL</h1>
         <button onClick={() => setSidebarOpen(!sidebarOpen)}><LayoutDashboard/></button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 p-6 md:p-10 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} mt-16 md:mt-0`}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'add-product' && renderAddProduct()}
        {activeTab === 'orders' && renderOrders()}
      </main>

      {/* EDIT MODAL */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in">
            <h3 className="text-2xl font-bold mb-6">Edit Product</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Product Name</label>
                <input value={editProduct.name} disabled className="w-full mt-1 px-4 py-3 bg-gray-100 rounded-xl text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Price</label>
                <input 
                  type="number" 
                  value={editProduct.price} 
                  onChange={(e) => setEditProduct({...editProduct, price: e.target.value})}
                  className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" 
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Stock</label>
                <input 
                  type="number" 
                  value={editProduct.stock} 
                  onChange={(e) => setEditProduct({...editProduct, stock: e.target.value})}
                  className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" 
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setEditProduct(null)} className="flex-1 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition">Cancel</button>
                <button onClick={handleEditProductSubmit} className="flex-1 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {successModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm text-center animate-in fade-in zoom-in duration-300">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
             </div>
             <h3 className="text-2xl font-bold mb-2">Success!</h3>
             <p className="text-gray-500 mb-6">{successModal.message}</p>
             <button 
                onClick={() => setSuccessModal({ show: false, message: "" })} 
                className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition"
             >
                Okay
             </button>
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
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200
      ${active ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}
      ${!isOpen ? 'justify-center' : ''}
    `}
  >
    {icon}
    {isOpen && <span className="font-semibold">{label}</span>}
  </button>
);

export default Admin;