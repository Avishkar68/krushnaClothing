import React from "react";
import { useParams } from "react-router-dom";

const blogData = [
  {
    id: "1",
    title: "The Rise of Streetwear — Inside RAWAURA’s Design DNA",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    date: "Feb 2025",
    content: `
      Streetwear has evolved beyond fashion—it's a culture, a voice, and a 
      medium of expression. At RAWAURA, our design DNA takes inspiration 
      from real stories, real streets, and real people.

      We believe in silhouettes that speak for you, pieces that bring confidence, 
      and colors that blend personality with presence.

      Here’s a deeper dive into how RAWAURA builds its signature identity.
    `,
  },
  {
    id: "2",
    title: "Behind the Fabric — What Makes RAWAURA Quality Different",
    img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1200&q=80",
    date: "Jan 2025",
    content: `
      Every collection starts with one question: how do we make it better?

      Our fabrics are ethically sourced, skin-friendly, and long-lasting.
      From softness to durability, each material goes through a strict selection 
      process to match our standards.
    `,
  },
  {
    id: "3",
    title: "Styling Oversized Fits — The Ultimate Guide",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
    date: "Dec 2024",
    content: `
      Oversized fashion is more than an outfit—it's a statement.

      Whether it's hoodies, tees, or jackets, styling oversized fits requires 
      balance, confidence, and an eye for clean detailing.

      Let's break down how you can elevate your everyday style effortlessly.
    `,
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === id);

  if (!blog)
    return (
      <div className="p-10 text-center text-gray-600">
        Blog not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black font-mainfont">
      <section className="w-full h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${blog.img})` }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            {blog.title}
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-500 mb-4">{blog.date}</p>
        <p className="text-gray-700 leading-8 whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
