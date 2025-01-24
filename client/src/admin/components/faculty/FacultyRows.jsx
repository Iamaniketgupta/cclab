import React from 'react'
import { FaEye, FaEyeSlash, FaTrash, FaToggleOn, FaToggleOff, FaPen } from "react-icons/fa";

export default function FacultyRows({faculty,handleInputChange,togglePasswordVisibility,toggleAccess,removeFaculty}) {
  return (
    <tr
    key={faculty.id}
    className="border-b border-stone-300 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-100"
  >
    {/* Avatar */}
    <td className="p-2">
      <img
        src={faculty.avatar || "https://cdn-icons-png.flaticon.com/512/3541/3541871.png"}
        alt={faculty.name}
        className="w-8 h-8 rounded-full"
      />
    </td>

    {/* Name */}
    <td className="p-2">{faculty.name}</td>

    {/* Email (editable) */}
    <td className="p-2">
      <input
        type="text"
        value={faculty.email}
        onChange={(e) =>
          handleInputChange(faculty.id, "email", e.target.value)
        }
        className="w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800"
      />
    </td>

    {/* Password (editable with toggle visibility) */}
    <td className="p-2 flex items-center space-x-2">
      <input
        type={faculty.showPassword ? "text" : "password"}
        value={faculty.password}
        onChange={(e) =>
          handleInputChange(faculty.id, "password", e.target.value)
        }
        className="w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800"
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility(faculty.id)}
      >
        {faculty.showPassword ? (
          <FaEye className="text-stone-500 dark:text-stone-100" />
        ) : (
          <FaEyeSlash className="text-stone-500 dark:text-stone-100" />
        )}
      </button>
    </td>

    {/* Access Toggle */}
    <td className="p-2">
      <button
        type="button"
        onClick={() => toggleAccess(faculty.id)}
        className="focus:outline-none"
      >
        {faculty.access ? (
          <FaToggleOn className="text-emerald-500 text-xl" />
        ) : (
          <FaToggleOff className="text-red-500 text-xl" />
        )}
      </button>
    </td>

    {/* Remove */}
    <td className="p-2">
      <button
        type="button"
        onClick={() => removeFaculty(faculty.id)}
        className="text-red-500 hover:text-red-600 focus:outline-none"
      >
        <FaTrash />
      </button>
    </td>

    {/* update */}
    <td className="p-2">
      <button
        type="button"
        onClick={() => removeFaculty(faculty.id)}
        className="text-emerald-500 hover:text-emerald-600 focus:outline-none"
      >
        <FaPen />
      </button>
    </td>

  </tr>
  )
}
