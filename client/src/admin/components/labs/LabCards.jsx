import React from 'react'
import { MdToggleOff, MdToggleOn } from 'react-icons/md'
 
export default function LabCards({lab,toggleAvailability}) {
    return (
        <div
        className=" bg-white dark:bg-stone-900 shadow-lg rounded-lg border border-gray-200 dark:border-stone-700 transition-transform transform hover:scale-105"
      >
        {/* Lab Name and Code */}
        <div className="mb-4 p-2 px-4 shadow-xl bg-zinc-800 dark:bg-zinc-900 dark:text-gray-100 trounded-t-md text-white">
          <h3 className="text-lg font-bold  first-line: ">
            {lab.labName}
          </h3>
          <p className="text-sm   dark:text-gray-400">
            Code: {lab.labCode?.toUpperCase()}
          </p>
        </div>
      
        {/* Lab Details */}
        <div className="space-y-2 mb-4 px-4">
          <p className="text-sm text-gray-700 dark:text-gray-100">
            <span className="font-medium">Floor:</span> {lab.floor}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-100">
            <span className="font-medium">Capacity:</span> {lab.capacity}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-100">
            <span className="font-medium">Block:</span> {lab.block}
          </p>
        </div>
      
        {/* Availability Switch */}
        <div className="flex items-center justify-between px-4 pb-4">
          <span
            className={`text-xs font-medium ${
              lab.isAvailable ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {lab.isAvailable ? "Available" : "Unavailable"}
          </span>
          <>
         { lab?.isAvailable ? <MdToggleOn
              size={20}
            onClick={() => toggleAvailability(lab._id)}
            className={`text-2xl cursor-pointer
             text-emerald-500
            `}
            />
            :
            <MdToggleOff
            size={20}

            onClick={() => toggleAvailability(lab._id)}
            className={`w-6 h-6 cursor-pointer text-red-500 `}
            />}
            </>


        </div>
      </div>
      
    )
  }

