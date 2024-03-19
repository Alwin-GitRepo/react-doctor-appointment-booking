import { useState } from "react";
import DoctorCard from '../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useEffect } from 'react';

const Doctors = () => {
  const [query,setQuery]=useState('');
  const [debounceQuery,setDebounceQuery]=useState('');
  const {data:doctors,loading,error}=useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  
  useEffect(() => {
    const timeOut=setTimeout(() => {
      setDebounceQuery(query)
    }, 700);
    return () => clearTimeout(timeOut);
  });

  const handleSearch=() => {
    setQuery(query.trim());
    console.log('handle search');
  };

  return (
    <>
      <section className='bg-[#fff9ea] p-10'>
        <div className="container text-center">
          <h2 className='heading'>Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input type="search" className='w-full py-4 pl-4 pr-2 bg-transparent cursor-pointer focus:outline-none placeholder:text-textColor' placeholder='Search doctors by name or specialization' value={query} onChange={e => setQuery(e.target.value)} />
            <button className='btn mt-0 rounded-[0px] rounded-r-md' onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section>
        <div className="container flex justify-center mt-5">
          {loading && !error && <Loader/>}
          {error && !loading && <Error/>}
          {!loading && !error && (
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container mt-5">
          <div className="xl:w-[470px] mx-auto">
            <h2 className='m-4 text-center heading'> What our patients say</h2>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
}

export default Doctors;
