import { useState } from 'react';
import ModalWrapper from '../../../common/ModalWrapper';
import ReqCards from '../../../dashboard/requests/ReqCards';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
 import {toast} from "react-toastify"
import Loader from "../../../components/Loaders/Loader"
import axiosInstance from '../../../utils/axiosInstance';
export default function ReqResMain() {

  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outLoading, setOutLoading] = useState(false);

  const { allResRequests, fetchAllResRequests } = useFetchDataApi();


  // Filter  
  const filteredRequests = allResRequests?.filter((req) => {
    if (activeTab !== 'All' && req.status !== activeTab.toLowerCase()) {
      return false;
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = req._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req?.labId?.labName?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req?.labId?.labCode?.toLowerCase().includes(lowerCaseSearchQuery);

    return matchesSearch;
  });


 

 // handle Status
 const handleChangeStatus = async (id, status) => {
  if (!confirm(`Are you sure you want to change ${status}`)) return;
  try {
    setOutLoading(true);
    const res = await axiosInstance.put(`/request/status/${id}`, { status });
    toast.success(res?.data?.message || 'Success');
    fetchAllResRequests();
    setOutLoading(false);
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
    console.log(error);
    setOutLoading(false);
  }
}


  return (
    <div className="w-full px-2 py-">

      <ModalWrapper open={openModal} setOpenModal={setOpenModal}
        outsideClickClose={false}>
        <div className='min-w-full bg-black opacity-20 min-h-full flex items-center justify-between'>
          <Loader />
        </div>
      </ModalWrapper>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search requests..."
          className="w-full px-4 py-2 rounded border outline-none dark:border-stone-700  dark:bg-stone-900 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-4 border-b dark:border-stone-500">
        {['All', 'pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${activeTab === tab
              ? 'border-b-2 border-emerald-700 '
              : 'text-gray-500'
              } dark:text-white`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0)?.toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <ReqCards
             loading={loading} handler={handleChangeStatus} key={req._id} req={req} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No requests found.
          </p>
        )}
      </div>
      {
        outLoading && <ModalWrapper open={outLoading} setOpenModal={setOutLoading} outsideClickClose={false} >
          <Loader />
        </ModalWrapper>}
    </div>
  );
}
