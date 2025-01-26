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
        <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100">All Students</h2>
        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 px-3 rounded-md max-w-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        {/* Student table  */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border dark:border-stone-800">
            <thead className="bg-stone-200 dark:bg-stone-900 text-stone-800 dark:text-stone-100">
              <tr>
                <th className="text-left p-2 min-w-[50px] text-xs font-semibold   ">Avatar</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Name</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Roll</th>
                {/* <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Password</th> */}
                <th className="text-left p-2 min-w-[50px] overflow-x-auto text-xs font-semibold `">Access</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold `">Remove</th>
                {/* <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold `">Update</th> */}
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
