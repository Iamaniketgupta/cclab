import React from 'react'

export default function FeedBackCard({ item }) {
    return (
        <div
            className="p-2 rounded-md shadow min-h-[150px] min-w-[300px] bg-white dark:bg-stone-800 text-stone-700 dark:text-gray-300"
        >
            <div className='bg-emerald-900 text-white p-2 rounded shadow-lg mb-2'>
                <h3 className='font-bold text-lg'>{item.labId?.labName}
                    <span className='text-xs font-thin mx-3'>({item.labId?.labCode?.charAt(0).toUpperCase() + item.labId?.labCode?.slice(1)})</span> </h3>
            </div>

        <div className='p-2'>

            <h2 className='font-bold text-lg'>Feedback</h2>
            <p>{item.feedback}</p>
        </div>
        </div>
    )
}
