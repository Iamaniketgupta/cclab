import { useRecoilState } from "recoil"
import { userData } from "../../recoil/states"
import Loader from "../../components/Loaders/Loader";


export default function ReqCards({handler, req, loading }) {
  const [currUser,setCurrUser] =useRecoilState(userData);
  return (
    <div
      className="p-2 bg-white dark:bg-stone-900 rounded hover:scale-105 cursor-pointer 
     transition duration-300 ease-in-out
     shadow   dark:text-gray-100"
    >
      <div className='bg-emerald-900 text-white p-2 rounded shadow-lg mb-2'>
        <p className="font-thin text-xs">#{req._id}</p>
        <h3 className='font-bold text-lg'>{req.labId?.labName}
          <span className='text-xs font-thin mx-3'>({req.labId?.labCode?.charAt(0).toUpperCase() + req.labId?.labCode?.slice(1)})</span> </h3>
      </div>

      <div className='p-2'>

        <p className='text-emerald-700 '>For: {req.resourceType}</p>
        <p className="text-sm">{req.requestDesc}</p>
        <p className={`mt-2 text-sm ${req.status === 'approved'
          ? 'text-green-500'
          : req.status === 'rejected'
            ? 'text-red-500'
            : 'text-yellow-500'
          } capitalize`}>
          {req.status}
        </p>
      </div>
{
    currUser.role==='admin' &&  <div className="flex items-center gap-4 justify-end">
        {/* aprrove,reject */}
        <button 
        disabled={loading}
        onClick={()=>changeStatusHandler('approved')}
        className="bg-green-800 hover:bg-green-700 text-white p-2 rounded">
          {loading? <Loader/> :"Approve"}
        </button>
        <button 
        disabled={loading}

        onClick={()=>changeStatusHandler('rejected')}
        className="bg-red-800 hover:bg-red-700 text-white p-2 rounded">
        {  loading ? <Loader/> : "Reject"}
        </button>
      </div>}
    </div>
  )
}
