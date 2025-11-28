import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-black font-mainfont">
      
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1626284300766-cdd2701053e5?q=80&w=688&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative text-4xl md:text-6xl font-extrabold text-white tracking-tight">
          RAWAURA
        </h1>
      </section>

      {/* Brand Story */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Our Story
        </h2>
        <p className="text-gray-600 text-lg leading-8 text-center max-w-3xl mx-auto">
          RAWAURA was born from the belief that fashion should be bold, expressive,
          and unapologetically authentic. We craft pieces that blend modern streetwear
          with everyday comfort — apparel that elevates your presence the moment you
          walk in.  
          <br /><br />
          RAWAURA isn’t just a brand. It’s an attitude. A reflection of raw energy,
          deep identity, and the aura each person carries within.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
            <p className="text-gray-600 leading-7">
              Every RAWAURA product is crafted using high-grade, breathable fabrics,
              ensuring long-lasting comfort and durability without compromising style.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3">Designed for Expression</h3>
            <p className="text-gray-600 leading-7">
              Our silhouettes are built around confidence. Each design encourages
              individuality — made for the ones who stand out effortlessly.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-3">Made with Passion</h3>
            <p className="text-gray-600 leading-7">
              Behind every stitch is intention. We create with passion, precision, and
              a deep love for fashion that inspires a culture, not just clothing.
            </p>
          </div>

        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
        <p className="text-gray-600 text-lg leading-8">
          RAWAURA aims to redefine the streetwear experience by merging bold design,
          luxurious comfort, and everyday versatility.  
          <br /><br />
          Our vision is simple — to build a community where fashion ignites identity,
          empowers confidence, and celebrates the raw aura within everyone.
        </p>
      </section>

      {/* Footer Image */}
      <section
        className="w-full h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop')",
        }}
      ></section>
    </div>
  );
};

export default AboutUs;
