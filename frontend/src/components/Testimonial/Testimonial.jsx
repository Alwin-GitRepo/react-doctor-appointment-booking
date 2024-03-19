import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { HiStar } from 'react-icons/hi';

const Testimonial = () => {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-black'>
                                    Kiran
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            "While the booking process was easy, I would appreciate more information about the doctors, such as their specialties and experience."
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-black'>
                                    Sooraj
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            "I'll definitely continue using the website for future appointments. It's a convenient and reliable platform."
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="py-[30px] px-5 rounded-3">
                        <div className="flex items-center gap-[13px]">
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-black'>
                                    Rahul
                                </h4>
                                <div className="flex items-center gap-[2px]">
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                    <HiStar className='text-[#e2ca42] w-[18px] h-5' />
                                </div>
                            </div>
                        </div>
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            "I appreciate the clear instructions about what to bring to the appointment. It made my visit much smoother."
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Testimonial;
