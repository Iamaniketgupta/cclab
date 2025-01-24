import { useRecoilState } from "recoil";
import { userData } from "../../recoil/states";
import Loader from "../../components/Loaders/Loader";
export default function IssueCard({ issue, handler, loading }) {
    console.log(issue)
    const [currUser, setCurrUser] = useRecoilState(userData);
    return (
        <div className='bg-white min-w-[300px]  rounded-md shadow-md dark:bg-stone-900 border border-gray-300 dark:border-stone-700'>
            <div className='bg-emerald-900 text-white p-2 rounded shadow-lg mb-2'>
                <p className="font-thin text-xs">#{issue._id}</p>
                <h3 className='font-bold text-lg'>{issue.labId?.labName}
                    <span className='text-xs font-thin mx-3'>({issue.labId?.labCode?.charAt(0).toUpperCase() + issue.labId?.labCode?.slice(1)})</span> </h3>
            </div>

            <div className="p-3 ">
                <div className="text-xs flex items-center border-b pb-1 justify-between">
                    <h3 className='text-xs font-bold text-gray-800 dark:text-gray-100'>Type - {issue?.issueType?.charAt(0).toUpperCase() + issue?.issueType?.slice(1)}</h3>
                    {currUser?.role === 'admin' && <div className="dark:text-gray-100">
                        <p >By : {issue?.reportedBy?.name}</p>
                        <p> Roll: {issue?.reportedBy?.rollNumber}</p>
                    </div>}
                </div>

                <p className='text-gray-600 my-2 dark:text-gray-100'>{issue?.issueDesc}</p>
                <span className={`text-xs  ${issue?.status === 'resolved' ? 'text-green-500' : 'text-red-500'
                    }`}>{issue?.status?.slice(0, 1).toUpperCase() + issue?.status?.slice(1)}</span>

                {currUser?.role === 'admin' && issue?.status !== 'resolved' && <div className="mt-2">
                    <button
                        disabled={loading}
                        onClick={() => handler(issue)}
                        className="text-xs bg-emerald-700 hover:bg-green-800
                    text-white font-bold py-2 px-4  rounded">{loading ? <Loader /> : "Mark as Resolved"}</button>

                </div>}
            </div>
        </div>
    );
}
