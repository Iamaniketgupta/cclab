import { useState } from 'react';
import PasswordInp from '../../components/Auths/PasswordInp'
import Loader from '../../components/Loaders/Loader'
import { Link } from 'react-router-dom'
import authbg from '../../assets/images/authbg.png'
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Navbar from '../../components/Home/Navbar';

export default function SignUp() {

    const [loading, setLoading] = useState(false);
    const [signInAs, setSignInAs] = useState('student');

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        rollNumber: '',
        block: '',
        role: ''
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <div className='h-screen w-full relative lg:overflow-clip'>
            <div className='absolute top-0 z-50 left-0 right-0 w-full py-4'>
                <Link to={'/'} className="flex items-center flex-shrink-0">
                    <div
                        className={`text-2xl md:pl-2 text-blue-600 font-bold ${!open && "hidden"}`}
                    >
                        <span className='text-white ml-2 '>PCTE CLABS</span>
                    </div>
                </Link>
            </div>

            <img src={"https://images.pexels.com/photos/9881353/pexels-photo-9881353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt='SignUp' className='h-full w-full object-fill bg-fixed  ' />

            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50'></div>
            <div className='p-4 absolute inset-0  flex-1 w-full flex justify-center items-center'>

                <div className='py-10 md:px-5 p-3 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10
        bg-clip-padding border border-white border-opacity-30
          dark:text-gray-100 rounded-2xl mt-20 max-sm:mt-16 max-w-[500px] h-fit flex-1   shadow-sm'
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 10px' }}
                >
                    <h1 className='text-center text-2xl font-bold  text-gray-100 my-4'>Create Account</h1>

                    <div className=' py-2 my-2 flex gap-4 items-center'>
                        <button className={`${signInAs === 'student' ?
                            'bg-gradient-to-r font-semibold from-emerald-600 to-emerald-800' : 'border border-gray-500'}
             text-white text-xs py-2 px-4 
             flex items-center gap-2
            rounded-full hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-800
            ${loading && 'cursor-not-allowed'}
            `}
                            onClick={() => setSignInAs('student')}
                        ><PiStudentFill size={15} /> Student</button>

                        <button className={`${signInAs === 'faculty' ? 'bg-gradient-to-r font-semibold from-emerald-600 to-emerald-800' : 'border border-gray-500'}
             text-white text-xs py-2 px-4 
             flex items-center gap-2
            rounded-full hover:bg-gradient-to-r  hover:from-emerald-600 hover:to-emerald-800
            ${loading && 'cursor-not-allowed'}
            `}
                            onClick={() => setSignInAs('faculty')}


                        > <FaChalkboardTeacher size={15} />
                            Faculty</button>


                    </div>
                    <form className="w-full"
                    // onSubmit={(e) => handleSubmit(e)}
                    >

                        <div className='flex items-center justify-between gap-3 '>

                            <input className='w-full my-2 p-2 px-3  outline-none rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50 '
                                type="name" autoComplete="off"
                                // onChange={handleChange} 
                                name="name" id="name" placeholder='Full Name*' required />

                            <select className='w-full my-2 p-2 px-3  outline-none rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50 '
                                type="block" autoComplete="off"
                                // onChange={handleChange} 
                                name="block" id="block" placeholder='Block' required >
                                    <option value=''>Select Block</option>
                                    <option value='ET'>ET</option>
                                    <option value='MT'>MT</option>   
                                    <option value='HM'>HM</option>
                                    <option value='PH'>PH</option>
                            </select>
                        </div>


                        {signInAs === 'faculty' && <input className='w-full my-2 p-2 px-3  outline-none rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50 '
                            type="email" autoComplete="off"
                            // onChange={handleChange} 
                            name="email" id="email" placeholder='Email*' required />}

                        {signInAs === 'student' && <input className='w-full my-2 p-2 px-3  outline-none rounded-md bg-gray-50 dark:bg-stone-800 dark:text-gray-50 '
                            type="text" autoComplete="off" maxLength={10}
                            // onChange={handleChange} 
                            name="rollNumber" id="rollNumber" placeholder='Roll Number*' required />}

                        <PasswordInp
                            // onChange={handleChange}
                            placeholder={'Password*'} name={'password'} />

                        <button type='submit'
                            disabled={loading}
                            className='bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-full
               inline-flex justify-center  mx-auto w-full mt-3 max-w-[500px] 
               hover:bg-gradient-to-r hover:from-emerald-600 hover:to-indigo-700
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                text-white p-1 py-2 px-3'>
                            {loading ? <Loader /> : "Sign Up"}
                        </button>

                        <div className='text-center my-4 gap-1 flex items-center justify-center text-xs text-gray-100'>Already Having an Account? <Link to='/login' className='text-emerald-600 font-semibold'>LogIn here</Link> </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
