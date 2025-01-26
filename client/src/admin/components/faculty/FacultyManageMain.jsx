import { useState } from 'react'
import ModalWrapper from '../../../common/ModalWrapper'
import FacultyForm from './FacultyForm';
import FacultyRows from './FacultyRows';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import { userData } from '../../../recoil/states';
import { useRecoilState } from 'recoil';
import Loader from '../../../components/Loaders/Loader';

export default function FacultyManageMain() {
  const [openModal, setOpenModal] = useState(false);
  const [currUser, setUserData] = useRecoilState(userData);
  const { allFaculties, setAllFaculties, fetchAllFaculties } = useFetchDataApi();
  const [loading, setLoading] = useState(false);
  const [outLoading, setOutLoading] = useState(false);
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
      console.log({ allFaculties })
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


  const handleToggleAccess = async (id) => {
    if(!confirm("Are you sure you want to toggle access for this faculty?")) return;
    try {
      setOutLoading(true);
      const res = await axiosInstance.put(`/user/toggle-access/${id}`);
      // console.log(res);
      toast.success(res?.data?.message || 'Success');
      setOutLoading(false);
      fetchAllFaculties();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setOutLoading(false);
    }
  }

  // handle remove
  const handleRemove = async (id) => {
    if(!confirm("Are you sure you want to remove this faculty?")) return;
    try {
      setOutLoading(true);
      const res = await axiosInstance.delete(`/user/${id}`);
      // console.log(res);
      toast.success(res?.data?.message || 'Success');
      fetchAllFaculties();
      setOutLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setOutLoading(false);
    }
  }



  // console.log(allFaculties)
  return (
    <div>

      <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
        <FacultyForm loading={loading} data={data} setOpenModal={setOpenModal} handleSubmit={handleSubmit} onChangeHandler={onChangeHandler} />
      </ModalWrapper>
      <div className="flex justify-end my-4">
        <button

          onClick={() => setOpenModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow
          hover:bg-emerald-600">
          Add Faculty
        </button>
      </div>


      {/* All Faculties */}
      <div>
        <h2 className="text-2xl font-semibold text-stone-800 dark:text-stone-100">All Faculties</h2>
        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 px-3 rounded-md max-w-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>


        {/* Faculties table  */}
        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-stone-300 dark:border-stone-700">
            <thead className="bg-stone-100 dark:bg-stone-900">
              <tr>
                <th className="text-left p-2 min-w-[50px] text-xs font-semibold text-stone-700 dark:text-stone-300">Avatar</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-stone-700 dark:text-stone-100">Name</th>
                <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-stone-700 dark:text-stone-100">Email</th>
                {/* <th className="text-left p-2 min-w-[100px] overflow-x-auto text-xs font-semibold text-stone-700 dark:text-stone-100">Password</th> */}
                <th className="text-left p-2 min-w-[50px] overflow-x-auto text-xs font-semibold text-stone-700 dark:text-stone-100">Access</th>
                <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold text-stone-700 dark:text-stone-100">Remove</th>
                {/* <th className="text-left p-2  min-w-[50px] overflow-x-auto text-xs font-semibold text-stone-700 dark:text-stone-100">Update</th> */}
              </tr>
            </thead>
            <tbody>
              {allFaculties?.map((faculty) => (
                <FacultyRows key={faculty._id}
                  // toggleAccess={toggleAccess}
                  handleToggleAccess={handleToggleAccess}
                  faculty={faculty}
                  // handleInputChange={handleInputChange}
                  handleRemove={handleRemove}
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
