  import AdminDashboard from '../admin/Dashboard'
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/states';
 import StudentDashboard from "../student/Dashboard"


export default function Dashboard() {
    const [currentUserData, setUserData] = useRecoilState(userData);
  
  return (
    <div className='dark:bg-stone-800  bg-slate-50 overflow-hidden h-screen'
      style={{ scrollbarWidth: "none" }}>{
        currentUserData?.role=== "student" ?<StudentDashboard /> : <AdminDashboard /> 


      }
     </div>
  )
}
