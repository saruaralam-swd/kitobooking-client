import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Keyboard, FreeMode } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide2 from '../../../assets/SlideImage/2.jpg'
import slide3 from '../../../assets/SlideImage/3.jpg'
import slide4 from '../../../assets/SlideImage/4.jpg'

const Banner = () => {
  const slides = [
    {
      _id: 1,
      title: `Swap Your Old Phone for the Latest Model!`,
      image: slide2,
      text: 'Get the best deal on your next phone purchase or sell your old one for a fair price. We offer competitive prices and a secure payment process.'
    },
    {
      _id: 2,
      title: 'Get the Best Deal on Your Next Phone ',
      image: slide3,
      text: 'Upgrade your phone and get the latest features without overspending. Buy or sell on our website for a budget-friendly and reliable experience.'
    },
    {
      _id: 3,
      title: 'Buy the Latest Phone or Sell Your Old One',
      image: slide4,
      text: 'Trust us for all your phone buying and selling needs - our website offers a safe and reliable platform for all transactions.'
    }
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        freeMode={true}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay, FreeMode, Keyboard]}
        className="h-[600px]"
      >
        {
          slides.map(slide =>
            <SwiperSlide className='relative' key={slide._id}>
              <img className='w-full h-full object-cover object' src={slide.image} alt="" />

              <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center'>
                <div className='w-[55%] h-[70%] flex items-center justify-center bg-black/60 text-white text-center p-5 rounded-lg'>
                  <div className='space-y-5'>
                    <h2 className="text-4xl font-semibold">{slide.title}</h2>
                    <p>{slide.text}</p>
                    <button className='btn btn-sm btn-primary'>Browse Phones</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        }
      </Swiper>
    </>
  );
};

export default Banner;