import dayjs from "dayjs";
import { exportToPDF } from "../utils/exporters";


export default function TimeTableViewer({ schedule, setOpenTT }) {

  return (

    <div className="bg-white dark:bg-stone-800 dark:text-gray-100 shadow-md min-w-full min-h-full overflow-auto  rounded-lg p-6">
      <div className="flex justify-between flex-warp gap-4">

        <h2 className="text-sm  font-bold   mb-4">
          Time Table  | <span className='text-xs font-semibold'>{dayjs(schedule?.date).format("DD/MM/YYYY")} </span>
        </h2>
        <div className="flex items-center text-xs gap-2 ">

          <button className="bg-emerald-700 hover:bg-emerald-800
         text-white font-bold py-2 px-4 rounded"
            onClick={()=>exportToPDF(schedule)}
          >Export</button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenTT(false)
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Close</button>
        </div>
      </div>

      <table className="min-w-full mt-5 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-black dark:bg-stone-700 text-xs text-white dark:text-gray-100 uppercase">
            <th className="border border-gray-300 px-4 py-2">Class</th>
            <th className="border border-gray-300 px-4 py-2">Lab</th>
            <th className="border border-gray-300 px-4 py-2">Lab Code</th>
            <th className="border border-gray-300 px-4 py-2">Faculty</th>
            <th className="border border-gray-300 px-4 py-2">Start Time</th>
            <th className="border border-gray-300 px-4 py-2">End Time</th>
            <th className="border border-gray-300 px-4 py-2">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {schedule?.details?.map((row) => (
            <tr key={row._id} className="text-xs dark:text-gray-100 text-gray-800">
              <td className="border border-gray-300  px-4 py-2">
                {row.class || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.labInfo?.labName ||
                  "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.labInfo?.labCode?.toUpperCase() ||
                  "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.facultyName || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {dayjs(row.startTime).format("hh:mm A")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {dayjs(row.endTime).format("hh:mm A")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.purpose || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


    </div>
  )

}
