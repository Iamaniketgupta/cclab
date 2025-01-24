import React, { useState } from 'react'
import ModalWrapper from '../../../common/ModalWrapper';
import LabForm from './LabForm';
import LabCards from './LabCards';
import axiosInstance from '../../../utils/axiosInstance';
import {toast} from 'react-toastify';
import { useRecoilState } from 'recoil';
import { userData } from '../../../recoil/states';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
 

export default function LabsMain() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
    const [currUser, setUserData] = useRecoilState(userData);
  const {allLabs , fetchAllLabs}= useFetchDataApi();

  const [data, setData] = useState({
    labName: '',
    labCode: '',
    floor: '',
    capacity: '',
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(data);
     setLoading(true);
    try {
        const res = await axiosInstance.post(`/labs/add`, {
            ...data,block:currUser.block
        })
        console.log(res)
        toast.success(res?.data?.message || 'Success');
        fetchAllLabs();
        setOpenModal(false);
        setData({
            labName: '',
            labCode: '',
            floor: '',
            capacity: '',

        });

    } catch (error) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
        console.log(error);
    } finally {
        setLoading(false);

    }
  }

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const [searchQuery, setSearchQuery] = useState('');
  const filteredLabs = allLabs?.filter(item =>
    item.labName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.labCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const[labAvailable,setLabAvailable] = useState(false);
  const toggleAvailability = (id) => {
    setLabAvailable((prevLabs) => !prevLabs);
  };
  

  return (
    <div className='w-full px-2' >

      <h1 className='text-3xl font-bold text-stone-800 dark:text-gray-100'>Block - ET</h1>
      {/* Add Lab Form */}
      <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
        <LabForm data={data} 
        loading={loading}
        handleSubmit={handleSubmit} onChangeHandler={onChangeHandler} setOpenModal={setOpenModal} />
      </ModalWrapper>
      <div className="flex justify-end mb-4">
        <button onClick={() => setOpenModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Add New Lab
        </button>
      </div>


      {/* Labs cards */}
       <div>
        <h2 className="text-2xl font-semibold text-stone-800 dark:text-gray-100">All Labs</h2>
        {/* Search Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search labs..."
            className="w-full py-2 px-3 rounded-md max-w-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>  
    
        {/* Lab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredLabs?.map((lab) => (
           <LabCards key={lab._id} lab={lab}  toggleAvailability={toggleAvailability}/>
          ))}
        </div>
      </div>




    </div>
  )
}
