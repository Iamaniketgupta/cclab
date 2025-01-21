import React from 'react';

export default function AllLabs() {
    // Array of lab objects with random names and statuses
    const labs = [
        { name: 'ETCC1 Lab', status: 'Available' },
        { name: 'Physics Lab', status: 'Busy' },
        { name: 'Chemistry Lab', status: 'Available' },
        { name: 'Biology Lab', status: 'Busy' },
    ];

    return (
        <div className="p-2">
            <h2 className="text-xl mb-4">All Labs</h2>

             <div className="grid grid-cols-2 gap-2">
                {/* Table headers */}
                <div className="font-semibold text-stone-700 dark:text-gray-300 underline">Lab Name</div>
                <div className="font-semibold text-stone-700 dark:text-gray-300 underline">Status</div>

                {/* Map through labs array */}
                {labs.map((lab, index) => (
                    <React.Fragment key={index}>
                        <div className="text-gray-800 dark:text-gray-100">{lab.name}</div>
                        <div
                            className={`text-sm font-bold ${
                                lab.status === 'Available' ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {lab.status}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
