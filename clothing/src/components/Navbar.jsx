import { Menu, Bell, ShoppingCart, User, Search, ChevronRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between font-mainfont font-medium ">

      <div className="flex items-center">
        <h1 className="text-2xl  font-semibold tracking-widest select-none cursor-pointer">
          <a href="/" className="tracking-[-1px]">RAWAURA</a>
        </h1>
      </div>

      <div className="flex justify-between ml-40 border border-[#2727272f] px-4 py-2 rounded-4xl cursor-pointer">
        <div className="">
          <input placeholder="search here..." className="w-[360px] outline-none border-none " />
        </div>
        <ChevronRight className="text-[#bebebecc]" />
      </div>


      {/* RIGHT – Nav Links + Icons */}
      <div className="flex items-center gap-7 text-gray-700">
        <a href="/about-us" className="hover:text-black transition cursor-pointer">AboutUs</a>
        <a href="/blog" className="hover:text-black transition cursor-pointer">Blogs</a>
        <a href="/faq" className="hover:text-black transition cursor-pointer">FAQs</a>

        <div className="flex items-center gap-5">

          <button className="hover:text-black transition cursor-pointer">
            <ShoppingCart size={22} />
          </button>
          <abbr title="My orders" >
            <button className="hover:text-black transition cursor-pointer">
              <User size={22} />
            </button>
          </abbr>
        </div>
      </div>
    </nav>
  );
}
