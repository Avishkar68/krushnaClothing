import React from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "The Rise of Streetwear — Inside RAWAURA’s Design DNA",
      desc: "Discover how modern street culture inspires our bold silhouettes and signature styles.",
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
      date: "Feb 2025",
    },
    {
      id: 2,
      title: "Behind the Fabric — What Makes RAWAURA Quality Different",
      desc: "A deep dive into the premium materials and fabric choices that set us apart.",
      img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=80",
      date: "Jan 2025",
    },
    {
      id: 3,
      title: "Styling Oversized Fits — The Ultimate Guide",
      desc: "Oversized done right. Here’s how to build clean, statement-making fits with ease.",
      img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
      date: "Dec 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-mainfont">
      
      {/* HERO SECTION */}
      <section
        className="relative w-full h-[50vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          RAWAURA 
        </h1>
      </section>

      {/* FEATURED POST */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Featured Insight
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=80"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              Feb 2025
            </p>
            <h3 className="text-3xl font-bold mb-4">
              How RAWAURA Builds Confidence Through Streetwear
            </h3>
            <p className="text-gray-600 leading-7 mb-6">
              Fashion isn’t just fabric — it’s expression. At RAWAURA, every piece 
              is crafted to help you feel bold, confident, and authentically you. 
              Here’s how our design philosophy empowers individuality.
            </p>

            {/* Featured blog → always links to blog 1 */}
            <Link
              to="/blog/1"
              className="text-black font-semibold hover:underline"
            >
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Latest Posts</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group"
            >
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">{blog.date}</p>
                <h3 className="font-bold text-lg mb-2 group-hover:text-black">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm leading-6 mb-4">
                  {blog.desc}
                </p>

                <Link
                  to={`/blog/${blog.id}`}
                  className="text-black font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Blog;
