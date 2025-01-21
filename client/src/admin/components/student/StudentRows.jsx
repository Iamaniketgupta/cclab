 import { FaEye, FaEyeSlash, FaTrash, FaToggleOn, FaToggleOff, FaPen } from "react-icons/fa";

export default function StudentRows({student,handleInputChange,
    togglePasswordVisibility,toggleAccess,removeStudent}) {
  return (
    <tr
    key={student._id}
    className="border-b border-gray-300 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300"
  >
    {/* Avatar */}
    <td className="p-2">
      <img
        src={student.avatar || "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"}
        alt={student.name}
        className="w-8 h-8 rounded-full"
      />
    </td>

    {/* Name */}
    <td className="p-2">{student.name}</td>

    {/* Roll (editable) */}
    <td className="p-2">
      <input
        type="text"
        value={student.rollNumber}
        minLength={10}
        maxLength={10}
        onChange={(e) =>
          handleInputChange(student.id, "rollNumber", e.target.value)
        }
        className="w-full p-1 border rounded-md text-xs text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
      />
    </td>

    {/* Password (editable with toggle visibility) */}
    <td className="p-2 flex items-center space-x-2">
      <input
        type={student.showPassword ? "text" : "password"}
        value={student.password}
        onChange={(e) =>
          handleInputChange(student.id, "password", e.target.value)
        }
        className="w-full p-1 border rounded-md text-xs text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-emerald-500"
      />
      <button
        type="button"
        onClick={() => togglePasswordVisibility(student.id)}
      >
        {student.showPassword ? (
          <FaEye className="text-gray-500 dark:text-gray-300" />
        ) : (
          <FaEyeSlash className="text-gray-500 dark:text-gray-300" />
        )}
      </button>
    </td>

    {/* Access Toggle */}
    <td className="p-2">
      <button
        type="button"
        onClick={() => toggleAccess(student.id)}
        className="focus:outline-none"
      >
        {student.access ? (
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
        onClick={() => removeFaculty(student.id)}
        className="text-red-500 hover:text-red-600 focus:outline-none"
      >
        <FaTrash />
      </button>
    </td>

    {/* update */}
    <td className="p-2">
      <button
        type="button"
        onClick={() => removeFaculty(student.id)}
        className="text-emerald-500 hover:text-emerald-600 focus:outline-none"
      >
        <FaPen />
      </button>
    </td>

  </tr>
  )
}
