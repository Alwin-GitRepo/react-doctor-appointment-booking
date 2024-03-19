// import React from 'react'
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

const About = () => {

    useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
  
  return (
      <section>
          <div className='container'>
              <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row' >
                  {/* ================= About img ================== */}
                  <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                      <img src={aboutImg} alt="" />
                      <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                          <img src={aboutCardImg} alt="" />
                      </div>
                  </div>

                  {/* ================= About Content ================== */}
                  <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                      <h2 className='heading mt-[20px]'>Proud to be one of the nation's best</h2>
                      <p className='text__para mt-[40px]'>
                          For 30 years in a row, several reports has recognized us as one of the best
                          in the Nation.<br /> <br /> <span style={{color : "blue"}}>#1</span> leading health service in India.
                      </p>

                      <p className='text__para mt-[40px]'>
                          Our best is something we strive for each day, caring for our patients-not looking at what we have
                          accomplished, but towards what we can do tomorrow. Providing the best we can offer to our patients.
                      </p>

                      <Link to='/services'>
                          <button className='btn' onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}>Learn More</button>
                      </Link>
                  </div>
              </div>
          </div>
      </section>

  )
}

export default About



