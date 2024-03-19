import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import DoctorCard from './../../components/Doctors/DoctorCard';

const MyBookings = () => {
    const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

    if (loading && !error) {
        return <Loading />;
    }

    if (!error && !loading && appointments.length === 0) {
        return <div className="mt-10"><h2 className="mt-10 leading-7 text-center text-[20px] font-semibold text-[#0067FF]">No Bookings Yet</h2></div>
    }

    if (error && !loading) {
        return <Error errMessage={error} />;
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {appointments.map(doctor => (
                    <DoctorCard doctor={doctor} key={doctor._id} />
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
