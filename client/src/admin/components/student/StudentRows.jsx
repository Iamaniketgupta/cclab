import { FaEye, FaEyeSlash, FaTrash, FaToggleOn, FaToggleOff, FaPen } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

export default function StudentRows({ student, handleInputChange,
  isEditing, handleSave, handleEdit, editStudentId, data,
  handleCancel, toggleAccess, removeStudent }) {
  return (
    <tr
      key={student._id}
      className="border-b border-stone-300 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-100"
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
      <td className="p-2">
        <input type="text"
          disabled={!isEditing || student._id !== editStudentId}
          className='w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800'
          name="name" id=""
          onChange={(e) => handleInputChange(e)}
          value={isEditing && student._id === editStudentId ? data.name : student.name}

        />
      </td>

      {/* Roll   */}
      <td className="p-2">
        <input
          disabled={!isEditing || student._id !== editStudentId}
          value={isEditing && student._id === editStudentId ? data.rollNumber : student.rollNumber}
          type="text"
          minLength={6}
          name="rollNumber"
          required
          maxLength={10}
          onChange={(e) =>
            handleInputChange(e)
          }
          className="w-full p-1 border rounded-md text-xs dark:bg-stone-900 text-stone-800 dark:text-stone-100 border-stone-300 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800"
        />
      </td>


      {/* Batch */}
      <td className="p-2">
        <input type="text"
          disabled={!isEditing || student._id !== editStudentId}
          className='w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800'
          name="batch" id=""
          onChange={(e) => handleInputChange(e)}
          value={isEditing && student._id === editStudentId ? data.batch : student?.batch}

        />
      </td>

      {/* Email (editable) */}
      <td className="p-2">
        <input
          type="email"
          name="email"
          disabled={!isEditing || student._id !== editStudentId}
          value={isEditing && student._id === editStudentId ? data.email : student.email}
           onChange={(e) =>
            handleInputChange(e)
          }
          className="w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800"
        />
      </td>


      {/* Access Toggle */}
      <td className="p-2">

        {student?.access ? (
          <FaToggleOn onClick={() => toggleAccess(student._id)} className="text-emerald-500 cursor-pointer text-xl" />
        ) : (
          <FaToggleOff onClick={() => toggleAccess(student._id)} className="text-red-500 cursor-pointer text-xl" />
        )}
      </td>

      {/* Remove */}
      <td className="p-2">
        <button
          type="button"
          onClick={() => removeStudent(student._id)}
          className="text-red-500 hover:text-red-600 cursor-pointer focus:outline-none"
        >
          <FaTrash />
        </button>
      </td>


      {/* update */}
      <td className="p-2 ">

        {!isEditing || editStudentId !== student._id ? <FaPen title='Edit'
          onClick={() => handleEdit(student)}
        />
          :
          <div className='flex gap-4 items-center' >
            <IoCheckmarkDoneCircle title='Save'
              className='text-green-600 hover:text-green-700 cursor-pointer'
              onClick={handleSave} size={20} />
            <MdCancel title='Cancel' className='text-red-600 cursor-pointer' onClick={handleCancel} size={20} />
          </div>

        }
      </td>



    </tr>
  )
}
