import React from 'react'
import Loader from '../../../components/Loaders/Loader'
import { useRecoilState } from 'recoil'
import { userData } from '../../../recoil/states'
export default function LabForm({ loading, handleSubmit, onChangeHandler, setOpenModal, data }) {
  const [currUser, setUserData] = useRecoilState(userData);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 m-2 w-full max-w-lg mx-auto shadow-lg rounded-lg bg-white dark:bg-stone-800 p-6"
    >
      {/* Title */}
      <h2 className="md:text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Add Lab Details
      </h2>

      {/* Lab Name and Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="labName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Lab Name
          </label>
          <input
            type="text"
            id="labName"
            name='labName'
            className="w-full  p-2 rounded-md border border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={data?.labName}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <div>
          <label
            htmlFor="labCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Lab Code
          </label>
          <input
            type="text"
            name='labCode'
            id="labCode"
            className="w-full  p-2 rounded-md border border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={data?.labCode}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
      </div>

      {/* Floor and Capacity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="floor"
            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Floor
          </label>
          <input
            type="number"
            name='floor'
            id="floor"
            min={0}
            className="w-full  p-2 rounded-md border border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={data?.floor}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <div>
          <label
            htmlFor="capacity"

            className="block text-sm font-medium text-gray-700 dark:text-gray-100"
          >
            Capacity
          </label>
          <input
            type="number"
            name='capacity'
            id="capacity"
            min={0}
            className="w-full  p-2 rounded-md border border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={data.capacity}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
      </div>

      {/* Block */}
      <div>
        <label
          htmlFor="block"

          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
        >
          Block
        </label>
        <select name="block" onChange={(e) => onChangeHandler(e)}
          className='w-full  p-2 rounded-md border border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-500' id="">
          {["ET", "MT", "HM", "PH"].map((block) => (
            <option key={block} value={block}>{block}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-2 bg-emerald-800 text-white font-medium rounded-md shadow hover:bg-emerald-600 dark:hover:bg-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {loading ? <Loader /> : "Add Lab"}
        </button>
        <button
          type="reset"
          onClick={() => setOpenModal(false)}
          className="w-full md:w-auto px-6 py-2 bg-red-700 text-white font-medium rounded-md shadow hover:bg-red-600 dark:hover:bg-red-400 focus:outline-none focus:ring-1 focus:ring-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
