const Error = ({ errMessage = "An error occurred" }) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <h3 className="text-[#ff4a4a] text-[20px] leading-[30px] font-semibold m-5">
        {errMessage}
      </h3>
    </div>
  );
};

export default Error;
