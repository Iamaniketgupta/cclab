import React from 'react';

export default function LabsAvailabilityWidget() {
    // Array of lab objects with random codes and statuses
    const labs = [
        { code: 'ET101', status: 'Available' },
        { code: 'PH202', status: 'Busy' },
        { code: 'CH303', status: 'Available' },
        { code: 'BI404', status: 'Busy' },
    ];

    return (
        <div className="p-2">
           
            {/* Table Header */}
            <div className="grid grid-cols-2 bg-gradient-to-r from-emerald-800 via-emerald-800 to-black text-gray-100 dark:bg-stone-800 dark:text-gray-300 font-bold py-2 px-3 rounded-t-md">
                <div>Lab Code</div>
                <div>Status</div>
            </div>

            {/* Lab Details */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {labs.map((lab, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-2 items-center py-2 px-3 text-gray-800 dark:text-gray-100"
                    >
                        {/* Lab Code */}
                        <div>{lab.code}</div>

                        {/* Lab Status with ping animation for Available */}
                        <div className="flex items-center">
                            {lab.status === 'Available' && (
                                <span className="relative flex h-3 w-3 mr-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                            )}
                            <span
                                className={`${
                                    lab.status === 'Available' ? 'text-gray-800' : 'text-red-500 font-bold'
                                }`}
                            >
                                {lab.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
