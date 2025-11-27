import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
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

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // MULTIPLE IMAGE UPLOAD + PREVIEW
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      imageFiles: files,
      previewImages: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

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

      const res = await axios.post(
        "http://localhost:8000/api/admin/product",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMsg("Product added successfully!");

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
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to add product. Please check the backend.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] flex justify-center py-16 font-mainfont">
      <div className="w-[90%] max-w-3xl bg-white p-10 rounded-3xl shadow-lg border border-gray-200">

        <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">
          Add New Product
        </h1>

        {successMsg && (
          <div className="mb-5 bg-green-100 text-green-700 py-3 px-4 rounded-xl">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-5 bg-red-100 text-red-700 py-3 px-4 rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="font-semibold text-sm">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Green Unisex Hoodie"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Price (₹)</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="799"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="hoodies"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Sizes (comma separated)</label>
            <input
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              required
              placeholder="M, L, XL"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Brushed fleece unisex hoodie — warm, soft and durable"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl outline-none min-h-[120px]"
            ></textarea>
          </div>

          <div>
            <label className="font-semibold text-sm">Stock</label>
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder="18"
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          {/* IMAGES */}
          <div>
            <label className="font-semibold text-sm">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              required
              className="w-full mt-2"
            />
          </div>

          {/* PREVIEW GRID */}
          {formData.previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {formData.previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Preview"
                  className="w-full h-28 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-900 transition disabled:bg-gray-400"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Admin;
