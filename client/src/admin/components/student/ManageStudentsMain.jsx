import React, { useState } from 'react'
import ModalWrapper from '../../../common/ModalWrapper';
import StudentForm from './StudentForm';
import StudentRows from './StudentRows';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import { useRecoilState } from 'recoil';
import { userData } from '../../../recoil/states';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import Loader from '../../../components/Loaders/Loader';
import BulkUpload from '../../../dashboard/bulkupload/BulkUpload';

export default function ManageStudentsMain() {
  const [openModal, setOpenModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [currUser, setUserData] = useRecoilState(userData);
  const [loading, setLoading] = useState(false);
  const [outLoading, setOutLoading] = useState(false);
  const { allStudents, setAllStudents, fetchAllStudents } = useFetchDataApi();
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState('');
  const [data, setData] = useState({
    name: '',
    rollNumber: '',
    password: '',
    email: '',
    batch: '',
    role: "student"
  });

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const [searchQuery, setSearchQuery] = useState('');
  const filteredStudents = allStudents?.filter((student) => {
    return student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      if (isEditing) {
        if (!confirm("Are you sure you want to update this student?")) return;
        setOutLoading(true);
        if (data.email === '' || data.name === '' || data.rollNumber === '' || data.batch === '') return toast.error('Kindly fill all the fields');
        const res = await axiosInstance.put(`/user/update/${editStudentId}`, {
          name: data.name,
          email: data.email,
          batch: data.batch,
          rollNumber: data.rollNumber
        })
        // console.log(res)
        toast.success(res?.data?.message || 'Updated Successfully');
        setIsEditing(false);
        setEditStudentId('');
      }
      else {
        setLoading(true);
        const res = await axiosInstance.post(`/user/register`, {
          ...data,
          block: currUser.block
        })
        toast.success(res?.data?.message || 'Successfully Added');

      }

      fetchAllStudents();
      setOpenModal(false);
      setData({
        name: '',
        rollNumber: '',
        password: '',
        email: '',
        role: "student"
      });

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
      setOutLoading(false);


    }
  }


  const handleToggleAccess = async (id) => {
    if (!confirm("Are you sure you want to toggle access for this faculty?")) return;
    try {
      setOutLoading(true);
      const res = await axiosInstance.put(`/user/toggle-access/${id}`);
      // console.log(res);
      toast.success(res?.data?.message || 'Success');
      setOutLoading(false);
      fetchAllStudents();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setOutLoading(false);
    }
  }

  // handle remove
  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to remove this Student?")) return;
    try {
      setOutLoading(true);
      const res = await axiosInstance.delete(`/user/${id}`);
      // console.log(res);
      toast.success(res?.data?.message || 'Success');
      fetchAllStudents();
      setOutLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setOutLoading(false);
    }
  }



  // Edit
  const handleEdit = (student) => {
    setData({
      name: student.name,
      email: student.email,
      batch: student.batch,
      rollNumber: student.rollNumber
      // password: '',
    });
    setEditStudentId(student._id);
    setIsEditing(true);
    // setOpenModal(true);


  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditStudentId('');
    setData({
      name: '',
      email: '',
      password: '',
      rollNumber: '',
      batch: '',
      role: "student"
    });
  }

  return (
    <div>
      <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
        <StudentForm
          loading={loading} handleSubmit={handleSubmit}
          data={data} setOpenModal={setOpenModal} onChangeHandler={onChangeHandler} />
      </ModalWrapper>

      <ModalWrapper open={openBulkModal} setOpenModal={setOpenBulkModal} outsideClickClose={false} >
        <BulkUpload setBulkOpenModal={setOpenBulkModal} />
      </ModalWrapper>

      <div className="flex justify-end gap-4 flex-wrap text-xs my-4">
        <button onClick={() => setOpenBulkModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Bulk Upload
        </button>

        <button onClick={() => setOpenModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Add Student
        </button>
      </div>


      {/* All students */}
      <div>
        <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100">All Students</h2>
        {/* Search Input */}

        <div className=' '>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-1 px-3 rounded-md max-w-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>




        </div>

        {/* Student table  */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border dark:border-stone-800">
            <thead className="bg-stone-200 dark:bg-stone-900 text-stone-800 dark:text-stone-100">
              <tr>
                <th className="text-left p-2 min-w-[50px] text-xs font-semibold   ">Avatar</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Name</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Roll</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Batch</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold `">Email</th>
                <th className="text-left p-2 min-w-[50px] overflow-x-auto text-xs font-semibold `">Access</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold `">Remove</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold `">Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents?.filter((student) => student.block === currUser.block)?.map((student) => (
                <StudentRows key={student._id}
                  toggleAccess={handleToggleAccess}
                  student={student}
                  handleInputChange={onChangeHandler}
                  isEditing={isEditing}
                  handleEdit={handleEdit}
                  editStudentId={editStudentId}
                  handleSave={handleSubmit}
                  data={data}
                  handleCancel={handleCancel}
                  removeStudent={handleRemove}
                />
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {
        outLoading && <ModalWrapper open={outLoading} setOpenModal={setOutLoading} outsideClickClose={false} >
          <Loader />
        </ModalWrapper>}


    </div>
  )
}
