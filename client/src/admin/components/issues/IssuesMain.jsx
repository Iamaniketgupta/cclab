import  { useState } from 'react'
import IssueCard from '../../../dashboard/issues/IssuesCard';
import ModalWrapper from '../../../common/ModalWrapper';
import { toast } from 'react-toastify';
import {useFetchDataApi} from '../../../contexts/FetchDataApi';
import axiosInstance from '../../../utils/axiosInstance';
import { userData } from '../../../recoil/states';
import { useRecoilState } from 'recoil';

export default function IssuesMain() {
   const {allIssues ,fetchAllIssues} = useFetchDataApi();
const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('Reported');
    const [curruser,setCurrUser] =useRecoilState(userData)

    const filteredIssues = activeTab === 'All Issues'
        ? allIssues?.filter((item)=>item.labId.block === curruser.block)
        : allIssues?.filter((item)=>item.labId.block === curruser.block)?.filter(issue => issue.status === activeTab.toLowerCase());

 
    const markResolveHandler = async (issue) => {
        if(!confirm("Are you sure you want to mark this issue as resolved?")) return;
        try {
            setLoading(true);
            const res = await axiosInstance.put(`/issues/${issue._id}`, {
                status: 'resolved',
            });
            toast.success(res?.data?.message || 'Success');
            fetchAllIssues();
            setLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
  
    return (
        <div className='w-full mt-4 md:p-4 p-2'>

          
            <div className='flex items-center gap-4'>
                {['All Issues', 'Resolved', 'Reported'].map((tab, index) => (
                    <div
                        key={index}
                        className={`px-3 py-2 text-xs md:text-sm rounded-md shadow-xl cursor-pointer
                             border border-emerald-300  dark:border-zinc-800 border-opacity-30 ${activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-900 text-gray-800 dark:text-gray-300'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Issue Cards */}
            <div className='flex flex-wrap gap-4 my-8'>
                { 
                filteredIssues?.length === 0 ? <h2 className='text-xs text-center w-full font-semibold text-gray-700 dark:text-gray-100'>No issues found</h2>
                :filteredIssues?.map((issue) => (
                    <IssueCard loading={loading} key={issue.id} handler={markResolveHandler} issue={issue} />
                ))}
            </div>
        </div>
    )
}
