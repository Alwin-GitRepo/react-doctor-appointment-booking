import { useContext,useState } from "react";
import { authContext } from './../../context/AuthContext'
import MyProfile from "./MyProfile";
import MyBookings from "./MyBookings";
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {

  const {dispatch} = useContext(authContext)
  const [tab,setTab] = useState('bookings')
  const navigate = useNavigate()

  const {data : userData,loading,error} = useGetProfile(`${BASE_URL}/users/profile/me`)
  
  console.log(userData,'user data')

  const handleLogout = () => {
    dispatch({type : 'LOGOUT'})
    navigate('/')
  }
  
  return (
<section  className="m-8">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading/>}
        {error && !loading && <Error errMessage={error} />}
        {
          !loading && !error &&
                  <div className="grid gap-10 md:grid-cols-3">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[200px] h-[200px]">
                <img src={userData.photo} alt="" className="w-full h-full" />
              </figure>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userData.name}</h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
              <p className="text-textColor text-[15px] leading-6 font-medium">Blood Type : <span className="ml-2 text-headingColor text-[22px] leading-8">{userData.bloodType}</span></p>
            </div>
            <div className="mt-[25px] md:mt-[50px]">
              <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Logout</button>
              <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">Delete Account</button>
            </div>
          </div>
        <div className="md:col-span-2 md:px-[30px]">
          <div>
            <button onClick={() => setTab('bookings')} className={`${tab == 'bookings' && 'bg-[#0067FF] text-[#FFFFFF]'} p-2 mr-5 mb-5 px-5 rounded-md text-[#181A1E] font-semibold text-[16px] leading-7 border border-solid border-[#0067FF]`}>
              My Bookings
            </button>
            <button onClick={() => setTab('settings')} className={`${tab == 'settings' && 'bg-[#0067FF] text-[#FFFFFF]'} py-2 px-5 rounded-md text-[#181A1E] font-semibold text-[16px] leading-7 border border-solid border-[#0067FF]`}>
              Profile Settings
            </button>
          </div>
          {
            tab == 'bookings' && <MyBookings/>
          }
          {
            tab == 'settings' && <MyProfile user={userData} />
          }
        </div>
        </div>
        }
    </div>
</section>
  );
};

export default MyAccount;
