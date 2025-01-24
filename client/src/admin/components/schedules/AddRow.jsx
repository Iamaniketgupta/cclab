 import { useFetchDataApi } from '../../../contexts/FetchDataApi'
import { staticClassesData, staticfacultiesData } from '../../../data/list'

export default function AddRow({handleAddRow, handleInputChange, newSchedule}) {
     const {allLabs}= useFetchDataApi();


   return (
    <div className="bg-white dark:bg-stone-900 dark:text-gray-100 shadow-md rounded-lg p-6">
    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Add Lab Schedule</h2>

    {/* Date */}
    <form className="space-y-4" onSubmit={handleAddRow}>
      <div className="grid grid-cols-1 pt-4 md:grid-cols-2 gap-3 text-gray-800 dark:text-gray-100">
        {/* Lab */}
        <div>
          <label className="block text-xs font-medium  ">
            Select Lab <span className="text-red-500">*</span>
          </label>
          <select
            name="labId"
            value={newSchedule?.labId}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 outline-none border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          >
            <option value="">Choose a Lab</option>
            {allLabs?.map((lab) => (
              <option key={lab._id} value={lab._id}>{lab.labName}</option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-xs font-medium ">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            name="class"
            value={newSchedule?.class}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 outline-none border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          >
            <option value="">Choose a Class</option>
            {staticClassesData.map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-xs font-medium ">
            Faculty Name <span className="text-red-500">*</span>
          </label>
          <select
            name="facultyName"
            value={newSchedule?.facultyName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 outline-none border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          >
            <option value="">Choose a Faculty</option>
            {staticfacultiesData?.map((faculty, idx) => (
              <option key={idx} value={faculty.name}>{faculty}</option>
            ))}
          </select>
        </div>

        {/* Start and End Time */}
        <div>
          <label className="block text-xs font-medium ">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            value={newSchedule?.startTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 outline-none border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium ">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            value={newSchedule?.endTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 outline-none border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          />
        </div>

        {/* Purpose */}
        <div className="c">
          <label className="block text-xs font-medium ">
            Purpose <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="purpose"
            value={newSchedule?.purpose}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 outline-none border-gray-300 shadow-sm text-xs py-2 px-3"
            placeholder="Enter purpose"
            required
          />
        </div>
      </div>


      {/* Add Row Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 text-xs"
      >
        Add Row
      </button>
    </form>
  </div>
  )
}
