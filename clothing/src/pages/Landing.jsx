import React from 'react'

const Landing = () => {
  return (
    <div className=' w-[96%] flex flex-col gap-4  '>
      <div className='flex gap-8  h-[500px] '>
        <div className='border rounded-2xl w-full p-[20px] '>
          <div className='text-[64px] font-mainfont font-semibold leading-[76px] mb-8'>Unleash Your Style<br /> Shop The Latest<br />Trends</div>
          <div className='mb-8 font-mainfont leading-[20px]'>Discover the latest trends & express your style efforlessly. Shop exclusive collections with premium designs, Just for you.</div>
          <div className='flex w-fit justify-center items-center  '>
            <button>Shop Now</button>
            <button className=' rotate-90 '>↖︎</button>
          </div>
        </div>
        <div className='border rounded-2xl w-full'></div>
      </div>
      <div className=' flex justify-around gap-8'>
        <div className='w-full border rounded-2xl h-[200px]'></div>
        <div className='w-full border rounded-2xl h-[200px]'></div>
        <div className='w-full border rounded-2xl h-[200px]'></div>
      </div>
    </div>
  )
}

export default Landing
