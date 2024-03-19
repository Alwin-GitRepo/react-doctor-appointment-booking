import { useState } from "react";
import DoctorAbout from './DoctorAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { useParams } from 'react-router-dom';
import starIcon from '../../assets/images/Star.png';

const DoctorDetails = () => {
  const [tab, setTab] = useState('about');
  const { id } = useParams();
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`);
  
  if (loading && !error) {
    return <Loader />;
  }

  if (error && !loading) {
    return <Error />;
  }

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        { !loading && !error && doctor &&
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={doctor.photo} alt="" className="w-full mt-5 mb-5" />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-[#246BCE] py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">{doctor.specialization}</span>
                  <h3 className="text-black text-[22px] leading-9 mt-3 font-bold">{doctor.name}</h3>
                  <p>{doctor.bio}</p>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-black">
                      <img src={starIcon} alt="" /> {doctor.averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">({doctor.totalRating})</span>
                  </div>
                </div>
              </div>

              <div className="mt-[50px]">
                <button onClick={() => setTab('about')} className={` ${tab === 'about' && 'border-b-4 border-solid border-blue-400'} py-2 px-5 mr-5 text-[16px] leading-7 text-black font-semibold`}>
                  Details
                </button>
                <button onClick={() => setTab('feedback')} className={` ${tab === 'feedback' && 'border-b-4 border-solid border-blue-400'} py-2 px-5 mr-5 text-[16px] leading-7 text-black font-semibold`}>
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === 'about' && <DoctorAbout about={doctor.about} qualifications={doctor.qualifications} experiences={doctor.experiences} />}
                {tab === 'feedback' && <Feedback reviews={doctor.reviews} totalRating={doctor.totalRating} />}
              </div>
            </div>

            <div>
              <SidePanel doctorId={doctor._id} ticketPrice={doctor.ticketPrice} timeSlots={doctor.timeSlots || []} />
            </div>
          </div>
        }
      </div>
    </section>
  );
};

export default DoctorDetails;
