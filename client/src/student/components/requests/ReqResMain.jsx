import { useState } from 'react';
import ModalWrapper from './../../../common/ModalWrapper';
import { useFetchDataApi } from "./../../../contexts/FetchDataApi";
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import Loader from '../../../components/Loaders/Loader';
import ThankyouPopup from '../../../common/ThankyouPopup';
import ReqCards from './ReqCards';
 

export default function ReqResMain() {
  const { allLabs ,allMyResRequests , fetchAllResRequests } = useFetchDataApi();
  const [loading, setLoading] = useState(false);
  const [thankyouPopup, setThankyouPopup] = useState(false);

  
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // Filter  
  const filteredRequests = allMyResRequests?.filter((req) => {
    if (activeTab !== 'All' && req.status !== activeTab.toLowerCase()) {
      return false;
    }
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const matchesSearch = req._id?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req?.labId?.labName?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req?.labId?.labCode?.toLowerCase().includes(lowerCaseSearchQuery);
  
    return matchesSearch;
  });
  



 


  const [data, setData] = useState({
    labId: '',
    resourceType: '',
    requestDesc: '',
  })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/request/new', {
        ...data
      }
      );

      toast.success(res?.data?.message || 'Success');
      setLoading(false);
      setOpenModal(false);
      setThankyouPopup(true);

      fetchAllResRequests();
      setData({
        labId: '',
        resourceType: '',
        requestDesc: '',
      })

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setLoading(false);
    }

  };



  return (
    <div className="w-full px-2 py-4 dark:bg-stone-700">
      {/* Create New Request Button */}
      <div className="flex justify-end mb-4">

        {/* Thankyou Poppup */}
        <ModalWrapper open={thankyouPopup} setOpenModal={setThankyouPopup} outsideClickClose={true} >
          <ThankyouPopup  setOpenModal={setThankyouPopup} 
          content={'Your request has been submitted successfully'} />
        </ModalWrapper>


        <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
          <form onSubmit={handleSubmit} className='space-y-4 w-full  shadow-md
                max-w-[500px] mx-auto p-4 bg-white dark:bg-stone-800 rounded-md'>

            {/* Lab Drop Down */}
            <div>
              <label
                htmlFor="labId"
                className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                Select a Lab:
              </label>

              <select
                name="labId"
                id="labId"
                className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                value={data.labId}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled>Select a lab</option>
                {allLabs?.map((lab) => (
                  <option key={lab._id} value={lab._id}>{lab.labName} <span className='text-xs'>({lab.labCode?.toUpperCase()})</span></option>
                ))}
              </select>
            </div>

            {/* Drop down of Resource Type  */}
            <div>
              <label
                htmlFor="labId"
                className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                Resource Type:
              </label>
              <select
                name="resourceType"
                id="resourceType"
                className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                value={data.resourceType}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled>Select a lab</option>
                {["computer", "projector", "peripheral", "software"].map((lab, idx) => (
                  <option key={idx} value={lab}>{lab.charAt(0).toUpperCase() + lab.slice(1)}  </option>
                ))}
              </select>
            </div>



            <div>
              <label
                htmlFor="requestDesc"
                className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                Description:
              </label>
              <textarea
                name="requestDesc"
                id="requestDesc"
                className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                rows="4"
                placeholder="Write your request here..."
                value={data.requestDesc}
                onChange={(e) => onChangeHandler(e)}
                required
              ></textarea>
            </div>
            <div className='flex items-center justify-between gap-4'>

              <button
                type="submit"
                className='px-4 py-2 bg-emerald-500 text-white font-medium rounded-md shadow hover:bg-emerald-600 dark:hover:bg-emerald-400'>
                {loading ? <Loader /> : "Submit Request"}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setOpenModal(false);
                  setData({ labId: '', resourceType: '', requestDesc: '' });
                }}
                disabled={loading}
                className='px-4 py-2   bg-red-700 text-white font-medium rounded-md shadow hover:bg-red-600 dark:hover:bg-red-400'>
                Cancel
              </button>
            </div>

          </form>
        </ModalWrapper>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Request Resource
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search requests..."
          className="w-full px-4 py-2 rounded border dark:bg-stone-600 dark:text-white"
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
              ? 'border-b-2 border-emerald-500 dark:border-white'
              : 'text-gray-500'
              } dark:text-white`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests?.length > 0 ? (
          filteredRequests?.map((req) => (
          <ReqCards key={req._id} req={req} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No requests found.
          </p>
        )}
      </div>
    </div>
  );
}
