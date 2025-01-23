import React from 'react'

export default function ReqCards({req}) {
  return (
    <div
     className="p-2 bg-white rounded hover:scale-105 cursor-pointer 
     transition duration-300 ease-in-out
     shadow dark:bg-stone-800 dark:text-gray-100"
  >
    <div className='bg-emerald-900 text-white p-2 rounded shadow-lg mb-2'>
    <p className="font-thin text-xs">#{req._id}</p>
    <h3 className='font-bold text-lg'>{req.labId?.labName}
      <span className='text-xs font-thin mx-3'>({req.labId?.labCode?.charAt(0).toUpperCase() + req.labId?.labCode?.slice(1)})</span> </h3>
    </div>

    <div className='p-2'>

    <p className='text-emerald-700 '>For: {req.resourceType}</p>
    <p className="text-sm">{req.requestDesc}</p>
    <p className={`mt-2 text-sm ${req.status === 'approved'
      ? 'text-green-500'
      : req.status === 'rejected'
        ? 'text-red-500'
        : 'text-yellow-500'
      } capitalize`}>
      {req.status}
    </p>
      </div>
  </div>
  )
}
