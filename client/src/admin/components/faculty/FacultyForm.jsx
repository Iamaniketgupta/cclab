import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../../components/Loaders/Loader";
export default function FacultyForm({
  handleSubmit,
  loading,
  onChangeHandler,
  setOpenModal,
  data,
}) {

  const [showPassword, setShowPassword] = useState(false);
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto shadow-lg rounded-lg bg-white dark:bg-stone-800 p-6"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-stone-800 dark:text-stone-100 text-center">
        Add Faculty Details
      </h2>

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700 dark:text-stone-100"
          >
            Faculty Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            className="w-full mt-1 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            value={data?.name}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700 dark:text-stone-100"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Organization Email"
            className="w-full mt-1 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            value={data?.email}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-stone-700 dark:text-stone-100"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Temporary Password"
          className="w-full mt-1 p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          value={data?.password}
          onChange={(e) => onChangeHandler(e)}
        />
        {/* Toggle Password Visibility Icon */}
        <button
          type="button"
          className="absolute inset-y-0 top-5 right-3 flex items-center text-stone-500 dark:text-stone-100 focus:outline-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
       


      {/* Buttons */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-emerald-800 text-white font-medium rounded-md shadow hover:bg-emerald-600 dark:hover:bg-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-800"
        >
          { loading ? <Loader/> : "Add Faculty"}
        </button>
        <button
          type="reset"
          onClick={() => setOpenModal(false)}
          className="w-full md:w-auto px-6 py-2 bg-red-700 text-white font-medium rounded-md shadow hover:bg-red-600 dark:hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
