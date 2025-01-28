
import { Route, Routes, useNavigate } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Auth/Login'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { clearCurrUser, setCurrUser } from './redux/slices/auths/authSlice'
import axiosInstance from './utils/axiosInstance'
import { getCookie, removeCookie } from './utils/cookiesApis'
import Dashboard from './dashboard/Dashboard'
import { useRecoilState } from 'recoil'
import { userData } from './recoil/states'
import HomePage from './pages/HomePage'
import ForgotPass from './pages/Auth/ForgotPass'
import VerificationPage from './pages/VerificationPage'
import Loader from './components/Loaders/Loader'



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUserData, setUserData] = useRecoilState(userData);
  const [loading, setLoading] = useState(false);
  const fetchUserData = async () => {
    try {
      const token = getCookie('authToken')
      if (token) {
        setLoading(true);
        const res = await axiosInstance.get(`/user/verifyauth`)
        setUserData(res?.data?.user)
        setLoading(false);
        dispatch(setCurrUser(res?.data?.user));
      } else {
        // navigate('/login');
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
      // navigate('/login');
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchUserData();
  }, []);

  // console.log({currentUserData});


  return (


    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/forgot/password" element={<ForgotPass />} />
      <Route
        path="/resetpassword/:token"
        element={<VerificationPage />}
      />
    </Routes>


  )
}

export default App
