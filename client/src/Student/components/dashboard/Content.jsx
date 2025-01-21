import React, { useEffect, useState } from 'react'
import TTScheduleCard from './TTScheduleCard'
import AllLabs from './AllLabs'
import MonthlyUsageGraph from '../charts/LabUsagechart';
import { useFetchDataApi } from '../../../../contexts/FetchDataApi';




export default function Content() {
    const [statsData ,setStastData] = useState([
        { label: 'Total Labs', value: 0 },
        { label: 'Available Labs', value: 0 },
        { label: 'Busy Labs', value: 0 },
    ]);
    
    
const {allLabs} = useFetchDataApi();

useEffect(() => {
    if(!allLabs) return;
    const totalLabs = allLabs.length;
    const availableLabs = allLabs.filter((lab) => lab.status === 'Available').length;
    const busyLabs = allLabs.filter((lab) => lab.status === 'Busy').length;

    setStastData([
        { label: 'Total Labs', value: totalLabs },
        { label: 'Available Labs', value: availableLabs },  
        { label: 'Busy Labs', value: busyLabs },
    ]);
}, [allLabs]);

    return (
        <div className='w-full mt-4 min-h-full '>
            <div className='flex items-center gap-4 flex-wrap justify-center'>
                {statsData.map((item, index) =>
                    <div
                        key={index} className='bg-white shadow-lg rounded-md p-4 flex-1  min-w-[270px]  dark:bg-stone-900 border border-zinc-300 dark:border-zinc-800 border-opacity-30'>
                        <h2 className='text-lg '>{item.label}</h2>
                        <h2 className='text-2xl opacity-80 font-bold'>{item.value}</h2>
                    </div>
                )}

            </div>



            <div className='flex flex-wrap item-center mt-4 gap-5'>
                <div className='bg-white p-4 
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

                    <AllLabs />
                </div>
            </div>

            {/* Some Graph */}
            <div className='mt-4'>

            <MonthlyUsageGraph/>
            </div>

        </div>
    )
}
