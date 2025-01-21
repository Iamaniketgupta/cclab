import { useState } from 'react'
import ModalWrapper from '../../../common/ModalWrapper'
import FacultyForm from './FacultyForm';
import FacultyRows from './FacultyRows';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import { userData } from '../../../recoil/states';
import { useRecoilState } from 'recoil';

export default function FacultyManageMain() {
  const [openModal, setOpenModal] = useState(false);
  const [currUser, setUserData] = useRecoilState(userData);
  const { allFaculties, setAllFaculties, fetchAllFaculties } = useFetchDataApi();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'faculty',
  });

  const onChangeHandler = (e) => {
    // console.log(e.target.value);
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
      console.log({allFaculties})
      toast.success(res?.data?.message || 'Success');
      fetchAllFaculties();
      setOpenModal(false);
      setData({
        name: '',
        email: '',
        password: '',
      });

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);

    }
  }

   

  const togglePasswordVisibility = (id) => {
    setAllFaculties((prev) =>
      prev.map((faculty) =>
        faculty.id === id
          ? { ...faculty, showPassword: !faculty.showPassword }
          : faculty
      )
    );
  };

  const toggleAccess = (id) => {
    // setFaculties((prev) =>
    //   prev.map((faculty) =>
    //     faculty.id === id ? { ...faculty, access: !faculty.access } : faculty
    //   )
    // );
  };

  const handleInputChange = (id, field, value) => {
    // setFaculties((prev) =>
    //   prev.map((faculty) =>
    //     faculty.id === id ? { ...faculty, [field]: value } : faculty
    //   )
    // );
  };

  const removeFaculty = (id) => {
    // setFaculties((prev) => prev.filter((faculty) => faculty.id !== id));
  };
  console.log(allFaculties)
  return (
    <div>

      <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
        <FacultyForm  loading={loading} data={data} setOpenModal={setOpenModal} handleSubmit={handleSubmit} onChangeHandler={onChangeHandler} />
      </ModalWrapper>
      <div className="flex justify-end my-4">
        <button
       
         onClick={() => setOpenModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Add Faculty
        </button>
      </div>


      {/* All Faculties */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">All Faculties</h2>
        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search labs..."
            className="w-full py-1 px-3 rounded-md max-w-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        {/* Faculties table  */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 dark:bg-stone-800">
              <tr>
                <th className="text-left p-2 min-w-[50px] text-xs font-semibold text-gray-700 dark:text-gray-300">Avatar</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Password</th>
                <th className="text-left p-2 min-w-[50px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Access</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Remove</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold text-gray-700 dark:text-gray-300">Update</th>
              </tr>
            </thead>
            <tbody>
              {allFaculties?.map((faculty) => (
                <FacultyRows key={faculty._id}
                  toggleAccess={toggleAccess}
                  togglePasswordVisibility={togglePasswordVisibility}
                  faculty={faculty}
                  handleInputChange={handleInputChange}
                  removeFaculty={removeFaculty}
                />
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}
