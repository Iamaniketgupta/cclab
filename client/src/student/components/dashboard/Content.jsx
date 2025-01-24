import React, { useEffect, useState } from 'react'
import TTScheduleCard from '../../../dashboard/widgets/TTScheduleCard'
import MonthlyUsageGraph from '../../../dashboard/widgets/LabUsagechart';
import { useFetchDataApi } from './../../../contexts/FetchDataApi';
import LabsAvailabilityWidget from '../../../dashboard/widgets/LabsAvailabilityWidget';

 
import { BsPcDisplay } from "react-icons/bs";
import { FaCheckCircle } from 'react-icons/fa';
import {  FaFlask } from 'react-icons/fa6';
 

 
export default function Content() {
    const { allStats, allLabs } = useFetchDataApi();

    const [statsData, setStatsData] = useState([
        {
            label: 'Total Labs',
            value: allLabs.length || 0,
            icon: <BsPcDisplay size={35} className="text-yellow-500" />,
            color: 'bg-yellow-100',
            borderColor: 'border-yellow-400',
        },
        {
            label: 'Available Labs',
            value: allStats?.availableLabs?.length || 0,
            icon: <FaCheckCircle size={35} className="text-green-500" />,
            color: 'bg-green-100',
            borderColor: 'border-green-400',
        },
        {
            label: 'Busy Labs',
            value: allStats?.busyLabs?.length || 0,
            icon: <FaFlask size={35} className="text-red-500" />,
            color: 'bg-red-100',
            borderColor: 'border-red-400',
        },
    ])

    useEffect(() => {
        if (!allStats || !allLabs) return;

        setStatsData(prevStatsData => [
            {
                ...prevStatsData[0],
                value: allLabs.length || 0,  
            },
            {
                ...prevStatsData[1],
                value: allStats?.availableLabs?.length || 0,  
            },
            {
                ...prevStatsData[2],
                value: allStats?.busyLabs?.length || 0,  
            },
        ]);
    }, [allLabs, allStats]);

    return (
        <div className='w-full mt-4 min-h-full '>
            <div className='flex items-center gap-4  flex-wrap justify-center'>
                {statsData?.map((item, index) =>
                    <div
                    key={index}
                    className={`${item.color} border dark:opacity-94   ${item.borderColor}   
                    text-stone-800 font-bold flex items-center justify-between  
                     shadow-lg rounded-md p-4 flex-1  min-w-[300px]   md:max-w-[400px]  hover:shadow-xl transition-shadow`}
                >
                    <div>
                        <h2 className="text-lg font-semibold">{item.label}</h2>
                        <h2 className="text-2xl opacity-90 font-bold ">{item.value}</h2>
                    </div>
                    <div className="flex-shrink-0 ml-4">{item.icon}</div>
                </div>
                )}

            </div>



            <div className='flex flex-wrap item-center mt-4 gap-5'>
                <div className='bg-white  p-4 
                shadow-xl
                flex-1 min-w-[300px]
                rounded-md dark:bg-stone-900 border
                 border-zinc-300 dark:border-zinc-800 border-opacity-30'>

                    <TTScheduleCard />
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
