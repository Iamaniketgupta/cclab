import React, { useState } from 'react'
import ModalWrapper from './../../../common/ModalWrapper';
import { toast } from 'react-toastify';
import axiosInstance from './../../../utils/axiosInstance';
import Loader from './../../../components/Loaders/Loader';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import IssueCard from "../../../dashboard/issues/IssuesCard";
export default function IssuesMain() {
  const [activeTab, setActiveTab] = useState('Reported');
  const [loading, setLoading] = useState(false);
  const { allMyIssues, allLabs, fetchAllIssuesByUserId, allResources } = useFetchDataApi();
  console.log({ allResources })

  const filteredIssues = activeTab === 'All Issues'
    ? allMyIssues
    : allMyIssues?.filter(issue => issue.status === activeTab.toLowerCase());

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
      fetchAllIssuesByUserId();
      setData({
        labId: '',
        issueType: '',
        resourceId: '',
        issueDesc: '',
      })

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
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
                className='block mb-2 font-medium text-gray-700 dark:text-stone-300'>
                Select a Lab <span className='text-red-500'>*</span>:
              </label>
              <select
                name="labId"
                id="labId"
                className='w-full p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-300'
                value={data.labId}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled>Select a lab *</option>
                {allLabs.map((lab) => (
                  <option key={lab._id} value={lab._id}>{lab.labName}</option>
                ))}
              </select>
            </div>

            {/* Drop down of Resource Type  */}
            <div>
              <label
                htmlFor="labId"
                className='block mb-2 font-medium text-stone-700 dark:text-stone-300'>
                Issue Type <span className='text-red-500'>*</span>:
              </label>
              <select
                name="issueType"
                id="issueType"
                className='w-full p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-300'
                value={data.issueType}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled>Select Issue Type* </option>
                {["hardware", "software", "network", "other"].map((lab, idx) => (
                  <option key={idx} value={lab}>{lab.charAt(0).toUpperCase() + lab.slice(1)}  </option>
                ))}
              </select>
            </div>

            {/* Resource id */}
            <div>
              <label
                htmlFor="resourceId"
                className='block mb-2 font-medium text-stone-700 dark:text-stone-300'>
                Resource ID/Code:
              </label>
              <select
                name="resourceId"
                id="resourceId"
                className='w-full p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-300'
                placeholder="Resource ID"
                value={data.resourceId}
                onChange={(e) => onChangeHandler(e)}
                required
              >
                <option value="" disabled>Select Resource ID</option>
                {allResources?.filter((resource) => resource.labId._id === data.labId)
                .sort((a, b) => a.code.localeCompare(b.code))
                .map((resource) => (
                  <option key={resource._id}
                    value={resource._id}>{resource.code || resource?.softwareName}</option>
                ))}


              </select>
            </div>

            <div>
              <label
                htmlFor="issueDesc"
                className='block mb-2 font-medium text-stone-700 dark:text-stone-300'>
                Description your Issue <span className='text-red-500'>*</span>:
              </label>
              <textarea
                name="issueDesc"
                id="issueDesc"
                className='w-full p-2 rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-gray-800 dark:text-gray-300'
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
        {['All Issues', 'Resolved', 'Reported'].map((tab, index) => (
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
        {
          filteredIssues?.length === 0 ?
            <p className='text-center text-gray-600  w-full dark:text-gray-300 text-sm'>No issues found</p>
            : filteredIssues?.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
      </div>
    </div>
  )
}
