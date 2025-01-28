import React from 'react'
import { FaEye, FaEyeSlash, FaTrash, FaToggleOn, FaToggleOff, FaPen } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

export default function FacultyRows({ faculty, handleInputChange,
  isEditing, handleSave, handleEdit, editFacultyId,handleCancel,
  togglePasswordVisibility, handleToggleAccess, handleRemove,
  data
}) {
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
      <td className="p-2">
        <input type="text"
          disabled={!isEditing || faculty._id !== editFacultyId}
          className='w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800'
          name="name" id=""
          onChange={(e) => handleInputChange(e)}
           value={ isEditing && faculty._id === editFacultyId ? data.name : faculty.name}

           
           />
      </td>

      {/* Email (editable) */}
      <td className="p-2">
        <input
          type="email"
          name="email"
          disabled={!isEditing || faculty._id !== editFacultyId}
          value={ isEditing && faculty._id === editFacultyId ? data.email : faculty.email}
          // defaultValue={faculty.email}
          onChange={(e) =>
            handleInputChange(e)
          }
          className="w-full p-1 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800"
        />
      </td>



      {/* Access Toggle */}
      <td className="p-2">

        {faculty?.access ? (
          <FaToggleOn onClick={() => handleToggleAccess(faculty._id)} className="text-emerald-500 cursor-pointer text-xl" />
        ) : (
          <FaToggleOff onClick={() => handleToggleAccess(faculty._id)} className="text-red-500 cursor-pointer text-xl" />
        )}
      </td>

      {/* Remove */}
      <td className="p-2">
        <button
          type="button"
          onClick={() => handleRemove(faculty._id)}
          className="text-red-500 cursor-pointer hover:text-red-600 focus:outline-none"
        >
          <FaTrash />
        </button>
      </td>

      {/* update */}
      <td className="p-2 ">
      
          {!isEditing || editFacultyId !== faculty._id ? <FaPen title='Edit'
            onClick={() => handleEdit(faculty)}
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
