import { useEffect, useState } from 'react';
import PasswordInp from '../../components/Auths/PasswordInp'
import Loader from '../../components/Loaders/Loader'
import { Link, useNavigate } from 'react-router-dom'
 import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
 import { getCookie, setCookie } from '../../utils/cookiesApis';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userData } from '../../recoil/states';
import axiosInstance from '../../utils/axiosInstance';

export default function Login() {

  const [loading, setLoading] = useState(false);
  const [loginAs, setLoginAs] = useState('student');

  const navigate = useNavigate();
  const [data, setData] = useState({
      email: '',
      rollNumber:'',
      password: ""
  });
  const [currentUserData, setUserData] = useRecoilState(userData);
  console.log({currentUserData});

 
  const handleChange = (e) => {
      const { name, value } = e.target;
      setData({
          ...data,
          [name]: value
      })
  }
  useEffect(() => {
     const token= getCookie('authToken') 
     if(currentUserData || token ){
      navigate('/')
     }
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await axiosInstance.post(`/user/login`, {
            ...data
        })
        toast.success(res?.data?.message || 'Success');
        console.log(res)
        setCookie('authToken', res?.data?.token);
        setUserData(
            res?.data?.user
        )
        navigate('/dashboard')

    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
        console.log(error);
    } finally {
        setLoading(false);

    }
}

  return (
    <div className='h-screen w-full relative lg:overflow-clip'>
      <div className='absolute top-0 z-50 left-0 right-0 w-full py-4'>
          <Link to={'/'} className="flex items-center flex-shrink-0">
            <div
              className={`text-2xl md:pl-2 text-blue-600 font-bold ${!open && "hidden"}`}
            >
              <span className='text-white ml-2 '>CampusFlow</span>
            </div>
          </Link>
      </div>

      <img src={"https://images.pexels.com/photos/9881353/pexels-photo-9881353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        alt='login' className='h-full w-full object-fill bg-fixed  ' />

      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50'></div>
      <div className='p-4 absolute inset-0  flex-1 w-full flex justify-center items-center'>

        <div className='py-10 md:px-5 p-3 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10
        bg-clip-padding border border-white border-opacity-30
          dark:text-gray-100 rounded-2xl mt-20 max-sm:mt-16 max-w-[500px] h-fit flex-1   shadow-sm'
          style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 10px' }}
        >
          <h1 className='text-center text-2xl font-bold  text-gray-100 my-4'>Welcome Back 👋</h1>

          <div className=' py-2 my-2 flex gap-4 items-center'>
            <button className={`${loginAs === 'student' ?
              'bg-gradient-to-r font-semibold from-emerald-600 to-emerald-800' : 'border border-gray-500'}
             text-white text-xs py-2 px-4 
             flex items-center gap-2
            rounded-full hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-800
            ${loading && 'cursor-not-allowed'}
            `}
              onClick={() => setLoginAs('student')}
            ><PiStudentFill size={15} /> Student</button>

            <button className={`${loginAs === 'faculty' ? 'bg-gradient-to-r font-semibold from-emerald-600 to-emerald-800' : 'border border-gray-500'}
             text-white text-xs py-2 px-4 
             flex items-center gap-2
            rounded-full hover:bg-gradient-to-r  hover:from-emerald-600 hover:to-emerald-800
            ${loading && 'cursor-not-allowed'}
            `}
              onClick={() => setLoginAs('faculty')}


            > <FaChalkboardTeacher size={15} />
              Organization</button>


          </div>
          <form className="w-full"
          onSubmit={(e) => handleSubmit(e)}
          >



           {loginAs === 'faculty' && <input className='w-full my-2 p-2 px-3  outline-none rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50 '
              type="email" autoComplete="off"
              onChange={handleChange} 
              name="email" id="email" placeholder='Email*' required />}

            {loginAs === 'student' && <input className='w-full my-2 p-2 px-3  outline-none rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50 '
              type="text" autoComplete="off" maxLength={10}
              onChange={handleChange} 
              name="rollNumber" id="rollNumber" placeholder='Roll Number*' required />}

            <PasswordInp
              onChange={handleChange}
              placeholder={'Password*'} name={'password'} />
            <Link to='/forgot/password' className='text-emerald-600  text-xs px-2 font-semibold'>Forgot password ?</Link>
            <button type='submit'
              disabled={loading}
              className='bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-full
               inline-flex justify-center  mx-auto w-full mt-3 max-w-[500px] 
               hover:bg-gradient-to-r hover:from-emerald-600 hover:to-indigo-700
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                text-white p-1 py-2 px-3'>
              {loading ? <Loader /> : "Log In"}
            </button>

            <div className='text-center my-4 gap-1 flex items-center justify-center text-xs text-gray-100'>Not Having Account? <span   className='text-emerald-600 font-semibold'>Contact Admin</span> </div>
          </form>
        </div>
      </div>
    </div>

  )
}
