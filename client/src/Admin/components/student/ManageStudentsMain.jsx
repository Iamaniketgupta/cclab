import React, { useState } from 'react'
import ModalWrapper from '../../../common/ModalWrapper';
import StudentForm from './StudentForm';
import StudentRows from './StudentRows';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import { useRecoilState } from 'recoil';
import { userData } from '../../../recoil/states';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';

export default function ManageStudentsMain() {
  const [openModal, setOpenModal] = useState(false);
  const [currUser, setUserData] = useRecoilState(userData);
  const[loading, setLoading] = useState(false);
  const { allStudents, setAllStudents, fetchAllStudents } = useFetchDataApi();

  const [data, setData] = useState({
    name: '',
    rollNumber: '',
    password: '',
    role:"student"
  });

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/user/register`, {
        ...data,
        block: currUser.block
      })
      console.log({allStudents})
      toast.success(res?.data?.message || 'Success');
      fetchAllStudents();
      setOpenModal(false);
      setData({
        name: '',
        rollNumber: '',
        password: '',
        role:"student"
      });

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);

    }
  }


  const togglePasswordVisibility = (id) => {
    setAllStudents((prev) =>
      prev.map((faculty) =>
        faculty.id === id
          ? { ...faculty, showPassword: !faculty.showPassword }
          : faculty
      )
    );
  };

  const toggleAccess = (id) => {
    setAllStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, access: !student.access } : student
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setAllStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  };

  const removeStudent = (id) => {
    setAllStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div>
      <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
        <StudentForm
        loading={loading} handleSubmit={handleSubmit}
         data={data} setOpenModal={setOpenModal} onChangeHandler={onChangeHandler} />
      </ModalWrapper>
      <div className="flex justify-end my-4">
        <button onClick={() => setOpenModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Add Student
        </button>
      </div>


      {/* All Faculties */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">All Students</h2>
        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 px-3 rounded-md max-w-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        {/* Student table  */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 dark:bg-stone-800">
              <tr>
                <th className="text-left p-2 min-w-[50px] text-xs font-semibold text-gray-700 dark:text-gray-300">Avatar</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Roll</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Password</th>
                <th className="text-left p-2 min-w-[50px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Access</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Remove</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Update</th>
              </tr>
            </thead>
            <tbody>
              {allStudents?.map((student) => (
                <StudentRows key={student._id}
                  toggleAccess={toggleAccess}
                  togglePasswordVisibility={togglePasswordVisibility}
                  student={student}
                  handleInputChange={handleInputChange}
                  removeStudent={removeStudent}
                />
              ))}
            </tbody>
          </table>
        </div>

      </div>








    </div>
  )
}
