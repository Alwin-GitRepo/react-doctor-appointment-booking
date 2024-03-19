import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

  const quickLinks01 = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "/services",
      display: "Services",
    },
  ]

const quickLinks02 = [
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/doctors",
    display: "Request an Appoinment",
  },
  {
    path: "/doctors",
    display: "Get an Opinion",
  },
]

const quickLinks03 = [
  {
    path: "/contact",
    display: "Contact us",
  },
]

const Footer = () => {

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <footer className='pt-10 pb-16 bg-yellow-200'>
      <div className='container'>
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />

          </div>

            <div className='mx-3'>
              <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-black'>Quick Links</h2>
              {quickLinks01.map((item, index)=> (
                <li key={index} className='mb-4'>
                  <Link onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} to={item.path} className='text-[16px] leading-7 font[400] text-textColor'>
                    {item.display}
                    </Link>
                </li>
              ))}
            </div>
          <div className='mx-3'>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-black'>I want to</h2>
            {quickLinks02.map((item, index) => (
              <li key={index} className='mb-4'>
                <Link onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} to={item.path} className='text-[16px] leading-7 font[400] text-textColor'>
                  {item.display}
                </Link>
              </li>
            ))}
          </div>
          <div className='mx-3'>
            <h2 className='text-[20px] leading-[30px] font-[700] mb-6 text-black'>Support</h2>
            {quickLinks03.map((item, index) => (
              <li key={index} className='mb-4'>
                <Link onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}} to={item.path} className='text-[16px] leading-7 font[400] text-textColor'>
                  {item.display}
                </Link>
              </li>
            ))}
          </div>
            

        </div>
      </div>
    </footer>
  );
}

export default Footer