import React from 'react';
import { useFetchDataApi } from '../../contexts/FetchDataApi';
import { all } from 'axios';

export default function LabsAvailabilityWidget() {


    const { allStats } = useFetchDataApi();


    return (
        <div className="p-2">

            {/* Table Header */}
            <div className="grid grid-cols-2 bg-gradient-to-r from-emerald-800 via-emerald-800 to-black text-gray-100 dark:bg-stone-800 dark:text-gray-300 font-bold py-2 px-3 rounded-t-md">
                <div>Lab Code</div>
                <div>Status</div>
            </div>

            {/* Lab Details */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                    ...(allStats?.busyLabs || []),
                    ...(allStats?.availableLabs || [])
                ]?.map((lab) => (
                    <div
                        key={lab.labId}
                        className="grid grid-cols-2 items-center py-2 px-3 text-gray-800 dark:text-gray-50"
                    >
                        {/* Lab Code */}
                        <div className='flex items-center gap-2'>
                            <div className='font-bold text-sm'>{lab.labName}</div>
                            <div className='text-xs uppercase'>({lab.labCode})</div>
                        </div>

                        {/* Lab Status */}
                        <div className="flex items-center">
                            {lab.status === 'available' && (
                                <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-55"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            )}
                            <span
                                className={`${lab.status === 'available' ? 'text-gray-800 dark:text-gray-100' : 'text-red-500 font-bold'
                                    }`}
                            >
                                {lab.status?.charAt(0).toUpperCase() + lab.status?.slice(1)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
