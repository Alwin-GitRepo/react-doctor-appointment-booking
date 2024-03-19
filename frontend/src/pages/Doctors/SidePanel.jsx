import convertTime from "../../utils/convertTime";
import { BASE_URL,token } from '../../config'
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const bookingHandler = async ()=>{
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
        method : 'post',
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      const data = await res.json()
      if (!res.ok)
      {
        throw new Error(data.message + 'Please try again')
      }
      if (data.session.url)
      {
        window.location.href = data.session.url
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="p-3 mt-4 rounded-md shadow-panelShadow lg:p-5">
      <div className="flex items-center justify-between">
        <p className="mt-0 font-semibold text-para">Consultation Fee : </p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          $ {ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className='mt-0 font-semibold text-para text-headingColor'>
          Available Time Slots:
        </p>

        <ul className='mt-3'>
          {timeSlots.map((item, index) => (
            <li key={index} className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {item.day.charAt(0).toUpperCase()+item.day.slice(1)}
              </p>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className='w-full px-2 rounded-md btn'>Book Appointment</button>

    </div>
  );
};

export default SidePanel;
