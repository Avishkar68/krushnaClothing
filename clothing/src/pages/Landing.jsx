import React from 'react'
import { Link } from 'react-router-dom' // Imported Link
import hero1 from "../assets/hero1.avif"
import hero1_2 from "../assets/hero1_2.webp"
import hero1_3 from "../assets/hero1_3.jpg"

const Landing = () => {

  const categories = [
    { title: "Hoodies Collection", count: "35 items", image: hero1 },
    { title: "Zipper Hoodies", count: "25 items", image: hero1_2 },
    { title: "Oversized T-Shirt", count: "20 items", image: hero1_3 },
  ];
  const items = [
    { id: 1, title: "Top Pants Series", image: hero1, isTall: false },      
    { id: 2, title: "Full Set Series", image: hero1_2, isTall: true },      
    { id: 3, title: "Winter Collection Series", image: hero1_3, isTall: false }, 
    { id: 4, title: "Top Shirt Series", image: hero1_3, isTall: false },    
    { id: 5, title: "Top Pants Series", image: hero1, isTall: false },      
  ];

  return (
    <div className='w-[96%] flex flex-col gap-8 text-[#1C1C1C] mx-auto'>

      {/* HERO SECTION */}
      <div className='flex flex-col md:flex-row gap-8 h-auto md:h-[500px]'>
        
        <div className='rounded-2xl w-full bg-[#FFFFFF] p-6 md:p-[40px] flex flex-col justify-center order-2 md:order-1'>
          <div className='text-4xl md:text-[64px] font-mainfont font-semibold leading-tight md:leading-[76px] mb-6 md:mb-8'>
            Unleash Your Style<br /> Shop The Latest<br />Trends
          </div>
          <div className='mb-8 font-mainfont leading-[20px] text-sm md:text-base'>
            Discover the latest trends & express your style effortlessly. Shop exclusive collections with premium designs, Just for you.
          </div>
          <div className='flex w-fit justify-center items-center gap-6'>
            {/* UPDATED: Link to /shop-now */}
            <Link to="/shop-now" className='bg-[#1B1B1B] flex justify-center items-center gap-2 text-white py-3 px-6 md:py-4 md:px-8 cursor-pointer text-sm rounded-4xl hover:scale-105 transition-transform'>
              Shop Now
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl w-full h-[300px] md:h-auto overflow-hidden flex justify-center items-center order-1 md:order-2">
          <img src={hero1} alt="hero" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* THREE BLOCK SECTION */}
      <div className='flex flex-col md:flex-row justify-around gap-8 mb-12'>
        <div className='w-full bg-[#FFFFFF] rounded-2xl h-[300px] md:h-[400px] overflow-hidden flex justify-start items-start'>
          <img src={hero1_2} alt="hero" className="h-full w-full object-cover" />
        </div>
        <div className='w-full bg-[#FFFFFF] rounded-2xl h-[300px] md:h-[400px] overflow-hidden flex justify-start items-start'>
          <img src={hero1_3} alt="hero" className="h-full w-full object-cover" />
        </div>
        <div className='w-full bg-[#FFFFFF] rounded-2xl h-[300px] md:h-[400px] flex flex-col justify-center items-center p-4'>
          <div className='text-2xl md:text-[36px] text-center font-mainfont font-medium leading-tight md:leading-[36px] mb-8'>
            Models wearing<br /> full outfits
          </div>
          {/* UPDATED: Link to /shop-now */}
          <Link to="/shop-now" className='bg-[#1B1B1B] flex justify-center items-center gap-2 text-white py-4 px-8 cursor-pointer text-sm rounded-4xl hover:scale-105 transition-transform'>
            Explore more
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* LOGO BAR */}
      <div className='flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center px-4 md:px-8 py-4 opacity-70 grayscale mb-8 gap-y-6 md:gap-y-0'>
        <div className="flex items-center gap-2 font-bold text-base md:text-lg w-1/2 md:w-auto justify-center md:justify-start"><span className="border-2 border-black p-1 rounded-full">GS</span> GRAPHIC STUDIO</div>
        <div className="flex items-center gap-2 font-semibold text-xs md:text-sm w-1/2 md:w-auto justify-center md:justify-start"><span className="border border-black p-2 rounded-full">SA</span> S. SALVA</div>
        <div className="border-2 border-black px-2 py-1 font-bold text-xs md:text-sm tracking-widest w-full md:w-auto text-center">GOLDEN STUDIO</div>
        <div className="flex items-center gap-2 font-bold text-base md:text-lg w-1/2 md:w-auto justify-center md:justify-start">FURNITURE DESIGN</div>
        <div className="flex items-center gap-2 font-bold text-xs md:text-sm w-1/2 md:w-auto justify-center md:justify-start"><span className="border-2 border-black p-1">T</span> TRAVEL LOOKBOOK</div>
      </div>

      {/* CATEGORIES SECTION */}
      <div className='flex flex-col gap-8 mb-10'>
        <h2 className='text-2xl md:text-[36px] font-mainfont font-semibold text-center md:text-left'>Our Category List</h2>

        <div className='flex flex-col md:flex-row justify-between gap-8'>
          {categories.map((item, index) => (
            <div key={index} className='group relative w-full h-[300px] md:h-[450px] bg-[#000] rounded-2xl overflow-hidden cursor-pointer'>
              <img
                src={item.image}
                alt={item.title}
                className='h-full w-full opacity-80 object-cover transition-transform duration-500 group-hover:scale-105'
              />

              <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300'></div>

              <div className='absolute inset-0 flex flex-col justify-center items-center text-white'>
                <h3 className='text-2xl md:text-[28px] font-medium mb-4 drop-shadow-md'>{item.title}</h3>
                {/* UPDATED: Link to /shop-now */}
                <Link to="/shop-now" className='bg-[#f4f4f4] flex justify-center items-center gap-2 text-black py-3 px-6 cursor-pointer text-sm rounded-4xl hover:bg-white transition-colors'>
                  Explore more
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DISCOUNT BANNER */}
      <div className='relative w-full h-[400px] md:h-[500px] bg-[#FFFFFF] rounded-2xl overflow-hidden flex justify-center items-center mb-20'>

        <div className='absolute inset-0 w-full h-full'>
          <img
            src={hero1_3}
            alt="Promo Background"
            className='w-full h-full object-cover opacity-20' 
          />
        </div>

        <div className='relative z-10 flex flex-col items-center justify-center text-center max-w-lg px-4'>
          <h2 className='text-4xl md:text-[64px] font-mainfont font-medium leading-tight mb-4'>
            Get 50% Off
          </h2>
          <p className='text-[#1C1C1C] text-base md:text-lg mb-8 max-w-xs mx-auto leading-6'>
            for all new product purchases min. purchase $ 450.000
          </p>
          {/* UPDATED: Link to /shop-now */}
          <Link to="/shop-now" className='bg-[#1B1B1B] flex justify-center items-center gap-2 text-white py-4 px-10 cursor-pointer text-sm rounded-4xl hover:scale-105 transition-transform'>
            Shop Now
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </span>
          </Link>
        </div>

      </div>

      {/* FEATURED GRID */}
      <div className="w-full mx-auto mb-20">
      
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-[36px] font-mainfont font-semibold text-[#1C1C1C]">
            Our Featured Collections
          </h2>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Recently added shirts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`
                relative rounded-2xl overflow-hidden group cursor-pointer
                h-[300px] md:h-auto
                ${item.isTall ? 'md:row-span-2 md:col-start-2 md:row-start-1' : ''}
                ${index === 3 ? 'md:col-start-1 md:row-start-2' : ''} 
                ${index === 4 ? 'md:col-start-3 md:row-start-2' : ''}
              `}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-xl font-medium leading-tight max-w-[80%] drop-shadow-sm">
                  {item.title}
                </h3>
              </div>

              <div className="absolute bottom-5 right-5 z-10">
                {/* UPDATED: Link to /shop-now (Replaced Button with Link) */}
                <Link to="/shop-now" className="bg-white text-black w-10 h-10 rounded-full flex justify-center items-center transition-transform duration-300 group-hover:rotate-45 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Landing