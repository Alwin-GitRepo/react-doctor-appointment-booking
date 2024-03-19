/* eslint-disable react/prop-types */
import starIcon from '../../assets/images/Star.png';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useEffect } from 'react';

const DoctorCard = ({ doctor }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const {
    name,
    avgRating,
    totalRating,
    photo,
    specialization,
    experiences
  } = doctor;

  return (
    <div className='p-3 lg:p-5'>
      <div>
        <img src={photo} className='w-full' style={{height:'300px'}} alt="" />
      </div>

      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-black font-[700] mt-3 lg:mt-5'>
        {name}
      </h2>

      <p>{}</p>

      <div className="flex items-center justify-between mt-2 lg:mt-4">
        <span className='bg-[#CCF0F3] text-[#246BCE] py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px]
        lg:leading-7 font-semibold rounded'>
          {specialization}
        </span>

        <div className='flex items-center gap-[6px]'>
          <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold
          text-black'>
            <img src={starIcon} alt="" /> {avgRating}
          </span>
          <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-[#696969]'>({totalRating})</span>
        </div>
      </div>

      <div className="mt-[a8px] lg:mt-5 flex items-center justify-between">
        <div>
          <p className='text-[14px] leading-6 font-[400] text-black'>
            {experiences && experiences[0]?.hospital}
          </p>
        </div>

        <div>
          <Link to={localStorage.getItem('token') === "null" || localStorage.length === 0 ? '/login' : `/doctors/${doctor._id}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] 
              mx-auto flex items-center justify-center group hover:bg-blue-500 hover:border-none'>
            <BsArrowRight className='w-6 h-5 group-hover:text-white' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
