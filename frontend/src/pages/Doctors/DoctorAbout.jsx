import { formateDate } from '../../utils/formateDate'; 

const DoctorAbout = ({ about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className='text-[20px] leading-[30px] text-black font-semibold flex items-center gap-2'>
          <span className='text-[#246BCE] font-bold text-[20px] leading-9 mb-3'>
            About
          </span>
        </h3>
        {about ? (
          <p className="text__para">
            {about}
          </p>
        ) : (
          <p>No information available.</p>
        )}
      </div>

      <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-[#246BCE] font-semibold'>Education</h3>
        <ul className='pt-4 md:p-5'>
          {qualifications?.length > 0 ? (
            qualifications.map((item, index) => (
              <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                <div>
                  <span className='text-[#f84343] text-[15px] leading-6 font-semibold'>
                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                  </span>
                  <p className='text-[16px] leading-6 font-medium text-textColor'>{item.degree}</p>
                </div>
                <p className='text-[14px] leading-5 font-medium text-textColor'>{item.university}</p>
              </li>
            ))
          ) : (
            <p>No education information available.</p>
          )}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className='text-[20px] leading-[30px] text-[#246BCE] font-semibold'>Experience</h3>
        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
          {experiences?.length > 0 ? (
            experiences.map((item, index) => (
              <li key={index} className='p-4 rounded bg-[#9af58c]'>
                <span className='text-[#f84343] text-[15px leading-6 font-extrabold]'>
                  <b>{formateDate(item.startingDate)} - {formateDate(item.endingDate)}</b>
                </span>
                <p className='text-[16px] leading-6 font-medium text-textColor'>{item.position}</p>
                <p className='text-[16px] leading-6 font-medium text-textColor'>{item.hospital}</p>
              </li>
            ))
          ) : (
            <p>No experience information available.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default DoctorAbout;
