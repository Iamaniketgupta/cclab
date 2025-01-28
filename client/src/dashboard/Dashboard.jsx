import AdminDashboard from '../admin/Dashboard'
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/states';
import StudentDashboard from "../student/Dashboard"
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookiesApis';
import { useEffect } from 'react';


export default function Dashboard() {
  const [currentUserData, setUserData] = useRecoilState(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie('authToken')) {
      navigate('/login')
    }
  }, [currentUserData])

  if (!currentUserData || !getCookie('authToken')) {
    return null
  }

  return (
    <div className='dark:bg-stone-800  bg-slate-50 overflow-hidden h-screen'
      style={{ scrollbarWidth: "none" }}>{
        currentUserData?.role === "student" ? <StudentDashboard /> : <AdminDashboard />


      }
    </div>
  )
}
