import { useState,useContext } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import {authContext} from '../context/AuthContext.jsx'
import HashLoader from 'react-spinners/HashLoader.js'

const Login = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        // Check for specific error conditions and handle them
        throw new Error(result.message || 'Login failed');
      }

      // Ensure that the result object has the expected properties
      if (result.data && result.token && result.role) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: result.data,
            token: result.token,
            role: result.role,
          },
        });

        console.log(result, 'login data');
        toast.success(result.message);
        navigate('/home');
        window.location.reload();
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className='px-5 m-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
          Hello! <span className='text-blue-600'>Welcome</span> Back
        </h3>

        <form className='py-4 md:py-0' action=" " onSubmit={submitHandler}>
          <div className='mb-5'>
            <input 
            type="email" 
            placeholder='Enter Your Email' 
            name='email' 
            value={formData.email} 
            onChange={handleInputChange} 
            required
            className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-sky-600 text-[16px]
            leading-7 text-headingColor placeholder:text-black rounded-md cursor-pointer'/>
          </div>

          <div className='mb-5'>
            <input 
            type="password" 
            placeholder='Enter Your Password' 
            name='password' 
            value={formData.password} 
            onChange={handleInputChange} 
            required
            className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-sky-600 text-[16px]
            leading-7 text-headingColor placeholder:text-black rounded-md cursor-pointer'/>
          </div>

          <div className='mt-7'>
            <button type='submit' className='w-full bg-blue-500 text-white leading-[30px] rounded-lg px-4 py-3'>
              {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}
            </button>
          </div>

          <p className='mt-5 text-center text-textColor'>
            Don&apos;t have an account? 
            <Link className="ml-1 font-medium text-blue-600" to='/register'>Register</Link>
          </p>

        </form>
      </div>
    </section>
  )
}

export default Login