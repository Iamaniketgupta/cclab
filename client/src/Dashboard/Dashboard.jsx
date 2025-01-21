import React from 'react'
 import StudentDashboard from '../Student/StuDashboard/Dashboard'
import AdminDashboard from '../Admin/Dashboard'
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/states';



export default function Dashboard() {
    const [currentUserData, setUserData] = useRecoilState(userData);
  
  return (
    <div className='dark:bg-stone-800  bg-slate-50 overflow-hidden h-screen'
      style={{ scrollbarWidth: "none" }}>{
        currentUserData?.role=== "admin" ? <AdminDashboard /> : <StudentDashboard />
      }
     </div>
  )
}
