import React from 'react'
import AllLabs from './AllLabs'
import MonthlyUsageGraph from '../charts/LabUsagechart';
import IssuesMarqCard from './IssuesMarqCard';
import { BsPcDisplay } from "react-icons/bs";
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FaClipboardList, FaFlask, FaUserTie } from 'react-icons/fa6';


const statsData = [
    {
        label: 'Total Labs',
        value: 20,
        icon: <BsPcDisplay size={35} className="text-yellow-500" />,
        color: 'bg-yellow-100',
        borderColor: 'border-yellow-400',
    },
    {
        label: 'Available Labs',
        value: 10,
        icon: <FaCheckCircle size={35} className="text-green-500" />,
        color: 'bg-green-100',
        borderColor: 'border-green-400',
    },
    {
        label: 'Busy Labs',
        value: 10,
        icon: <FaFlask size={35} className="text-red-500" />,
        color: 'bg-red-100',
        borderColor: 'border-red-400',
    },
    {
        label: 'Issues',
        value: 10,
        icon: <FaExclamationCircle size={35} className="text-purple-500" />,
        color: 'bg-purple-100',
        borderColor: 'border-purple-400',
    },
    {
        label: 'Faculties',
        value: 10,
        icon: <FaUserTie size={35} className="text-zinc-500" />,
        color: 'bg-gray-100',
        borderColor: 'border-gray-400',
    },
    {
        label: 'Requests',
        value: 10,
        icon: <FaClipboardList size={35} className="text-indigo-500" />,
        color: 'bg-indigo-100',
        borderColor: 'border-indigo-400',
    },
];

export default function Content() {
    return (
        <div className="w-full mt-4 min-h-full">
            <div className="flex items-center gap-4 flex-wrap justify-center">
                {statsData.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.color} border ${item.borderColor}   
                        text-stone-800 font-bold flex items-center justify-between  
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

                    <AllLabs />
                </div>
            </div>

            {/* Some Graph */}
            <div className='mt-4'>

                <MonthlyUsageGraph />
            </div>

        </div>
    )
}
