 import { useFetchDataApi } from '../../../contexts/FetchDataApi'
import { staticClassesData, staticfacultiesData } from '../../../data/list'

export default function AddRow({handleAddRow, handleInputChange, newSchedule}) {
    console.log(newSchedule)
    const {allLabs}= useFetchDataApi()
    console.log(allLabs)
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-lg font-bold text-gray-800">Add Lab Schedule</h2>

    {/* Date */}
    <form className="space-y-4" onSubmit={handleAddRow}>
      <div className="grid grid-cols-1 pt-4 md:grid-cols-2 gap-3">
        {/* Lab */}
        <div>
          <label className="block text-xs font-medium text-gray-600">
            Select Lab <span className="text-red-500">*</span>
          </label>
          <select
            name="labId"
            value={newSchedule?.labId}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-xs py-2 px-3"
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
          <label className="block text-xs font-medium text-gray-600">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            name="class"
            value={newSchedule?.class}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-xs py-2 px-3"
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
          <label className="block text-xs font-medium text-gray-600">
            Faculty Name <span className="text-red-500">*</span>
          </label>
          <select
            name="facultyName"
            value={newSchedule?.facultyName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-xs py-2 px-3"
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
          <label className="block text-xs font-medium text-gray-600">
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="startTime"
            value={newSchedule?.startTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="endTime"
            value={newSchedule?.endTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-xs py-2 px-3"
            required
          />
        </div>

        {/* Purpose */}
        <div className="c">
          <label className="block text-xs font-medium text-gray-600">
            Purpose <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="purpose"
            value={newSchedule?.purpose}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-xs py-2 px-3"
            placeholder="Enter purpose"
            required
          />
        </div>
      </div>


      {/* Add Row Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 text-xs"
      >
        Add Row
      </button>
    </form>
  </div>
  )
}
