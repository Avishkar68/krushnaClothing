import React from 'react'
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
    { id: 1, title: "Top Pants Series", image: hero1, isTall: false },      // Top Left
    { id: 2, title: "Full Set Series", image: hero1_2, isTall: true },      // Center (Tall)
    { id: 3, title: "Winter Collection Series", image: hero1_3, isTall: false }, // Top Right
    { id: 4, title: "Top Shirt Series", image: hero1_3, isTall: false },    // Bottom Left
    { id: 5, title: "Top Pants Series", image: hero1, isTall: false },      // Bottom Right
  ];
  return (
    <div className='w-[96%] flex flex-col gap-8 text-[#1C1C1C]'>

      <div className='flex gap-8 h-[500px]'>
        <div className='rounded-2xl w-full bg-[#FFFFFF] p-[40px] flex flex-col justify-center'>
          <div className='text-[64px] font-mainfont font-semibold leading-[76px] mb-8'>
            Unleash Your Style<br /> Shop The Latest<br />Trends
          </div>
          <div className='mb-8 font-mainfont leading-[20px]'>
            Discover the latest trends & express your style efforlessly. Shop exclusive collections with premium designs, Just for you.
          </div>
          <div className='flex w-fit justify-center items-center gap-6'>
            <button className='bg-[#1B1B1B] flex justify-center items-center gap-2 text-white py-4 px-8 cursor-pointer text-sm rounded-4xl'>
              Shop Now
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="rounded-2xl w-full overflow-hidden flex justify-center items-center">
          <img src={hero1} alt="hero" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className='flex justify-around gap-8 mb-12'>
        <div className='w-full bg-[#FFFFFF] rounded-2xl h-[400px] overflow-hidden flex justify-start items-start'>
          <img src={hero1_2} alt="hero" className="h-full w-full object-cover" />
        </div>
        <div className='w-full bg-[#FFFFFF] rounded-2xl h-[400px] overflow-hidden flex justify-start items-start'>
          <img src={hero1_3} alt="hero" className="h-full w-full object-cover" />
        </div>
        <div className='w-full bg-[#FFFFFF] rounded-2xl h-[400px] flex flex-col justify-center items-center'>
          <div className='text-[36px] text-center font-mainfont font-medium leading-[36px] mb-8'>
            Models wearing<br /> full outfits
          </div>
          <button className='bg-[#1B1B1B] flex justify-center items-center gap-2 text-white py-4 px-8 cursor-pointer text-sm rounded-4xl'>
            Explore more
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className='flex justify-between items-center px-8 py-4 opacity-70 grayscale mb-8'>
        <div className="flex items-center gap-2 font-bold text-lg"><span className="border-2 border-black p-1 rounded-full">GS</span> GRAPHIC STUDIO</div>
        <div className="flex items-center gap-2 font-semibold text-sm"><span className="border border-black p-2 rounded-full">SA</span> S. SALVA</div>
        <div className="border-2 border-black px-2 py-1 font-bold text-sm tracking-widest">GOLDEN STUDIO</div>
        <div className="flex items-center gap-2 font-bold text-lg">FURNITURE DESIGN</div>
        <div className="flex items-center gap-2 font-bold text-sm"><span className="border-2 border-black p-1">T</span> TRAVEL LOOKBOOK</div>
      </div>

      <div className='flex flex-col gap-8 mb-10'>
        <h2 className='text-[36px] font-mainfont font-semibold'>Our Category List</h2>

        <div className='flex justify-between gap-8'>
          {categories.map((item, index) => (
            <div key={index} className='group relative w-full h-[450px] bg-[#000] rounded-2xl overflow-hidden cursor-pointer'>
              <img
                src={item.image}
                alt={item.title}
                className='h-full w-full opacity-80 object-cover transition-transform duration-500 group-hover:scale-105'
              />

              <div className='absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300'></div>

              <div className='absolute inset-0 flex flex-col justify-center items-center text-white'>
                <h3 className='text-[28px] font-medium mb-4 drop-shadow-md'>{item.title}</h3>
                <button className='bg-[#f4f4f4] flex justify-center items-center gap-2 text-black py-3 px-6 cursor-pointer text-sm rounded-4xl hover:bg-white transition-colors'>
                  Explore more
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                      <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='relative w-full h-[500px] bg-[#FFFFFF] rounded-2xl overflow-hidden flex justify-center items-center mb-20'>

        <div className='absolute inset-0 w-full h-full'>
          <img
            src={hero1_3}
            alt="Promo Background"
            className='w-full h-full object-cover opacity-20' 
          />
        </div>

        <div className='relative z-10 flex flex-col items-center justify-center text-center max-w-lg'>
          <h2 className='text-[64px] font-mainfont font-medium leading-tight mb-4'>
            Get 50% Off
          </h2>
          <p className='text-[#1C1C1C] text-lg mb-8 max-w-xs mx-auto leading-6'>
            for all new product purchases min. purchase $ 450.000
          </p>
          <button className='bg-[#1B1B1B] flex justify-center items-center gap-2 text-white py-4 px-10 cursor-pointer text-sm rounded-4xl hover:scale-105 transition-transform'>
            Shop Now
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                <path d="M7 7h10v10" /><path d="M7 17 17 7" />
              </svg>
            </span>
          </button>
        </div>

      </div>
      <div className="w-[96%] mx-auto mb-20">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-[36px] font-mainfont font-semibold text-[#1C1C1C]">
          Our Featured Collections
        </h2>
        <p className="text-sm text-gray-500 mt-2 font-medium">
          Recently added shirts!
        </p>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[auto] md:h-[600px]">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`
              relative rounded-2xl overflow-hidden group cursor-pointer
              ${item.isTall ? 'row-span-2 md:col-start-2 md:row-start-1' : ''}
              ${index === 3 ? 'md:col-start-1 md:row-start-2' : ''} 
              ${index === 4 ? 'md:col-start-3 md:row-start-2' : ''}
            `}
            // Note: The conditional classes above strictly force the layout order:
            // Item 1 -> Top Left
            // Item 2 -> Center (Tall)
            // Item 3 -> Top Right
            // Item 4 -> Bottom Left
            // Item 5 -> Bottom Right
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay (Darker at bottom for text readability) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

            {/* Text Content */}
            <div className="absolute bottom-6 left-6 text-white z-10">
              <h3 className="text-xl font-medium leading-tight max-w-[80%] drop-shadow-sm">
                {item.title}
              </h3>
            </div>

            {/* Arrow Button */}
            <div className="absolute bottom-5 right-5 z-10">
              <button className="bg-white text-black w-10 h-10 rounded-full flex justify-center items-center transition-transform duration-300 group-hover:rotate-45 shadow-lg">
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
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}

export default Landing