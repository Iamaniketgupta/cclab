import React, { useState } from 'react'
import IssueCard from './IssuesCard';
import ModalWrapper from '../../../../common/ModalWrapper';
import { useFetchDataApi } from '../../../../contexts/FetchDataApi';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../utils/axiosInstance';
import Loader from '../../../../components/Loaders/Loader';
export default function IssuesMain() {
  const [activeTab, setActiveTab] = useState('All Issues');
  const [loading, setLoading] = useState(false);
  const { allIssues, allLabs, setAllIssues } = useFetchDataApi();

  const filteredIssues = activeTab === 'All Issues'
    ? allIssues
    : allIssues?.filter(issue => issue.status === activeTab.toLowerCase());

  const [openModal, setOpenModal] = useState(false);


  const [data, setData] = useState({
    labId: '',
    issueType: '',
    resourceId: '',
    issueDesc: '',
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  console.log(allIssues)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post('/issues/add', {
        ...data
      }
      );

      toast.success(res?.data?.message || 'Success');
      setLoading(false);
      setOpenModal(false);
      setData({
        labId: '',
        issueType: '',
        resourceId: '',
        issueDesc: '',
      })

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setLoading(false);
    }

  };


  return (
    <div className='w-full mt-4 md:p-4 p-2'>

      {/* Select Lab Filter*/}

      <div className="flex justify-end mb-4">
        <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
          <form onSubmit={handleSubmit} className='space-y-2 text-xs w-full  shadow-md
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
                {allLabs.map((lab) => (
                  <option key={lab._id} value={lab._id}>{lab.labName}</option>
                ))}
              </select>
            </div>

            {/* Drop down of Resource Type  */}
            <div>
              <label
                htmlFor="labId"
                className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                Issue Type:
              </label>
              <select
                name="issueType"
                id="issueType"
                className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                value={data.issueType}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled>Select Issue Type</option>
                {["hardware", "software", "network", "other"].map((lab, idx) => (
                  <option key={idx} value={lab}>{lab.charAt(0).toUpperCase() + lab.slice(1)}  </option>
                ))}
              </select>
            </div>

            {/* Resource id */}
            <div>
              <label
                htmlFor="resourceId"
                className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                Resource ID/Code:
              </label>
              <input
                type="text"
                name="resourceId"
                id="resourceId"
                className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                placeholder="Resource ID"
                value={data.resourceId}
                onChange={(e) => onChangeHandler(e)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="issueDesc"
                className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                Description your Issue:
              </label>
              <textarea
                name="issueDesc"
                id="issueDesc"
                className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                rows="4"
                placeholder="Write your issue in detail here..."
                value={data.requestDesc}
                onChange={(e) => onChangeHandler(e)}
                required
              ></textarea>
            </div>
            <div className='flex items-center gap-4'>

              <button
                type="submit"
                className='px-4 py-2 bg-emerald-500 text-white font-medium rounded-md shadow hover:bg-emerald-600 dark:hover:bg-emerald-400'>
                {loading ? <Loader /> : 'Submit'}
              </button>
              <button
                type="reset"
                onClick={() => {
                  setOpenModal(false);
                  setData({ labId: '', issueType: '', issueDesc: '' });
                }}
                className='px-4 py-2 bg-red-700 text-white font-medium rounded-md shadow hover:bg-red-600 dark:hover:bg-red-400'>
                Cancel
              </button>
            </div>

          </form>
        </ModalWrapper>
        <button
          onClick={() => setOpenModal(true)}
          className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
          Raise Issue
        </button>
      </div>

      {/* Filters tabs All Issues, Resolved, In-Progress */}
      <div className='flex items-center gap-4'>
        {['All Issues', 'Resolved','Reported'].map((tab, index) => (
          <div
            key={index}
            className={`px-3 py-2 text-xs md:text-sm rounded-md shadow-xl cursor-pointer
                             border border-emerald-300  dark:border-zinc-800 border-opacity-30 ${activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-emerald-900 text-gray-800 dark:text-gray-300'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Issue Cards */}
      <div className='flex flex-wrap gap-4 my-4'>
        {filteredIssues?.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
