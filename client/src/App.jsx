
import { Route, Routes, useNavigate } from 'react-router-dom'
 import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Auth/Login'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearCurrUser,setCurrUser } from './redux/slices/auths/authSlice'
import axiosInstance from './utils/axiosInstance'
import { getCookie, removeCookie } from './utils/cookiesApis'
import Dashboard from './dashboard/Dashboard'
import { useRecoilState } from 'recoil'
import { userData } from './recoil/states'
import HomePage from './pages/HomePage'
import ForgotPass from './pages/Auth/ForgotPass'
 
 

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUserData, setUserData] = useRecoilState(userData);

  const fetchUserData = async () => {
    try {
      const token = getCookie('authToken')
      if (token) {
        const res = await axiosInstance.get(`/user/verifyauth`)
        dispatch(setCurrUser(res?.data?.user));
        setUserData(res?.data?.user)
      } else {
        navigate('/login');
        dispatch(clearCurrUser());
        setCurrUser(null);
 
      }
    } catch (error) {
      dispatch(clearCurrUser());
      dispatch(setCurrUser(null));
      setUserData(null);
      removeCookie('authToken');
      console.log(error.response)
      if (error?.response?.data?.expiredSession) {
        alert(error.response.data.message);
      }
      navigate('/login');
      console.log(error);
    }
  }


  useEffect(() => {
    fetchUserData();
  }, []);

    console.log({currentUserData});
  
   
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />}></Route>
      <Route path="/" element={<div><HomePage /></div>} />
      <Route path="/login" element={<div><Login /></div>} />
      <Route path="/dashboard" element={<div><Dashboard /></div>} />
      <Route path="/forgot/password" element={<div><ForgotPass /></div>} />
    
      </Routes>
  )
}

export default App
