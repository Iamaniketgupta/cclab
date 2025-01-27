
import IssuesMarqCard from './IssuesMarqCard';
import { BsPcDisplay } from "react-icons/bs";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FaClipboardList, FaFlask, FaUserTie } from 'react-icons/fa6';
import LabsAvailabilityWidget from '../../../dashboard/widgets/LabsAvailabilityWidget';
import MonthlyUsageGraph from '../../../dashboard/widgets/LabUsagechart';
import { useContext, useEffect, useState } from 'react';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import { useRecoilState } from 'recoil';
import { userData } from '../../../recoil/states';




export default function Content() {
    const { allLabs, allStats, allFaculties, allResRequests, allIssues } = useFetchDataApi()
const  [currUser,setCurrUser] =useRecoilState(userData)
    const [stats, setStats] = useState(
        [
            {
                label: 'Total Labs',
                value: 0,
                icon: <BsPcDisplay size={35} className="text-yellow-500" />,
                color: 'bg-yellow-100',
                borderColor: 'border-yellow-400',
            },
            {
                label: 'Available Labs',
                value: 0,
                icon: <FaCheckCircle size={35} className="text-green-500" />,
                color: 'bg-green-100',
                borderColor: 'border-green-400',
            },
            {
                label: 'Busy Labs',
                value: 0,
                icon: <FaFlask size={35} className="text-red-500" />,
                color: 'bg-red-100',
                borderColor: 'border-red-400',
            },
            {
                label: 'Issues',
                value: 0,
                icon: <FaExclamationCircle size={35} className="text-purple-500" />,
                color: 'bg-purple-100',
                borderColor: 'border-purple-400',
            },
            {
                label: 'Faculties',
                value: 0,
                icon: <FaUserTie size={35} className="text-zinc-500" />,
                color: 'bg-gray-100',
                borderColor: 'border-gray-400',
            },
            {
                label: 'Requests',
                value: 0,
                icon: <FaClipboardList size={35} className="text-indigo-500" />,
                color: 'bg-indigo-100',
                borderColor: 'border-indigo-400',
            },
        ]
    )
 
    console.log(allFaculties)
 
    useEffect(() => {
        // if (!allLabs || !allStats || !allFaculties || !allRequests || !allIssues) return;

        setStats((prevStats) => [
            {
                ...prevStats[0],
                value: allLabs?.filter((item)=>item.block === currUser.block)?.length || 0,  
            },
            {
                ...prevStats[1],
                value: allStats?.availableLabs?.length || 0, 
            },
            {
                ...prevStats[2],
                value: allStats?.busyLabs?.length || 0,  
            },
            {
                ...prevStats[3],
                value: allIssues?.filter((item)=>item.labId.block === currUser.block)?.filter((issue) => issue.status === 'reported').length || 0,  
            },
            {
                ...prevStats[4],
                value: allFaculties?.filter((item)=>item.block === currUser.block).length || 0,  
            },
            {
                ...prevStats[5],
                value: allResRequests?.filter((item)=>item.labId.block === currUser.block)?.filter((request) => request.status === 'pending').length || 0,  
            },
        ]);
    }, [allLabs, allStats, allFaculties, allResRequests, allIssues]);
        


 

    return (
        <div className="w-full mt-4 min-h-full">
            <div className="flex items-center gap-4 flex-wrap justify-center">
                {stats?.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.color} border ${item.borderColor}   
                        text-stone-800 font-bold flex dark:opacity-95 items-center justify-between  
                         shadow-lg rounded-md p-4 flex-1  min-w-[300px]   md:max-w-[400px]  hover:shadow-xl transition-shadow`}
                    >
                        <div>
                            <h2 className="text-lg font-semibold">{item.label}</h2>
                            <h2 className="text-2xl opacity-90 font-bold ">{item.value}</h2>
                        </div>
                        <div className="flex-shrink-0 ml-4">{item.icon}</div>
                    </div>
                ))}
            </div>



            <div className='flex flex-wrap item-center mt-4 gap-5'>
                <div className='bg-white p-4 
                shadow-xl
                flex-1 min-w-[300px]
                rounded-md dark:bg-stone-900 border
                 border-zinc-300 dark:border-zinc-800 border-opacity-30'>

                    <IssuesMarqCard />
                </div>


                <div className='bg-white p-4 
                rounded-md dark:bg-stone-900 border
                shadow-xl
                flex-1 min-w-[300px]
                 border-zinc-300 dark:border-zinc-800 border-opacity-30'>

                    <LabsAvailabilityWidget />
                </div>
            </div>

            {/* Some Graph */}
            <div className='mt-4'>

                <MonthlyUsageGraph />
            </div>

        </div>
    )
}
