import React, { useEffect, useState } from 'react';
import ModalWrapper from './../../../common/ModalWrapper';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosInstance';
import ThankyouPopup from '../../../common/ThankyouPopup';
import Loader from '../../../components/Loaders/Loader';
import FeedBackCard from '../../../dashboard/feedback/FeedBackCard';
  
export default function FeedBackMain() {
    const { allMyFeedbacks, allLabs, fetchAllFeedbacksByUserId } = useFetchDataApi();
    const [loading, setLoading] = useState(false);
    const [thankyouPopup, setThankyouPopup] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [data, setData] = useState({
        labId: '',
        feedback: '',
    })

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post('/feedback/send', {
                ...data
            }
            );

            toast.success(res?.data?.message || 'Success');
            setLoading(false);
            setOpenModal(false);
            setThankyouPopup(true);

            fetchAllFeedbacksByUserId();
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

    // get all feedbacks



    const [filteredByLabs, setFilteredByLabs] = useState("");

    const [searchQuery, setSearchQuery] = useState('');
    const filteredFeedbacks = allMyFeedbacks?.filter((item) => {
         const matchesSearch =
            item.labId?.labName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.feedback?.toLowerCase().includes(searchQuery.toLowerCase());
    
         const matchesLab = !filteredByLabs || item.labId?._id === filteredByLabs;
    
         return matchesSearch && matchesLab;
    });

 



    return (
        <div className='w-full px-2' >
            {/* Feedback Form */}
            {/* Thankyou Poppup */}
            <ModalWrapper open={thankyouPopup} setOpenModal={setThankyouPopup} outsideClickClose={true} >
                <ThankyouPopup setOpenModal={setThankyouPopup}
                    content={'Thankyou for your feedback.'} />
            </ModalWrapper>

            <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false} >
                <form onSubmit={handleSubmit} className='space-y-4 w-full  shadow-md
                max-w-[500px] mx-auto p-4 bg-white dark:bg-stone-800 rounded-md'>
                    <div>
                        <label
                            htmlFor="labId"
                            className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                            Select a Lab:
                        </label>
                        <select
                            name="labId"
                            id="labId"
                            className='w-full p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300'
                            value={data?.labId}
                            onChange={(e) => onChangeHandler(e)}
                            required
                        >
                            <option value="" disabled>Select a lab</option>
                            {allLabs?.map((lab) => (
                                <option key={lab._id} value={lab._id}>{lab.labName} <span className='text-xs'>({lab.labCode?.toUpperCase()})</span></option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="feedback"
                            className='block mb-2 font-medium text-gray-700 dark:text-gray-300'>
                            Feedback:
                        </label>
                        <textarea
                            name="feedback"
                            id="feedback"
                            className='w-full p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300'
                            rows="4"
                            placeholder="Write your feedback here..."
                            value={data?.feedback}
                            onChange={(e) => onChangeHandler(e)}
                            required
                        ></textarea>
                    </div>
                    <div className='flex items-center gap-4'>

                        <button
                            type="submit"
                            className='px-4 py-2 bg-emerald-800 text-white font-medium rounded-md shadow hover:bg-emerald-600 dark:hover:bg-emerald-400'>
                            {loading ? <Loader /> : "Submit Feedback"}
                        </button>
                        <button
                            type="reset"
                            onClick={() => {
                                setOpenModal(false);
                                setData({
                                    labId: '',
                                    feedback: '',
                                });
                            }}
                            className='px-4 py-2 bg-red-700 text-white font-medium rounded-md shadow hover:bg-red-600 dark:hover:bg-red-400'>
                            Cancel
                        </button>
                    </div>

                </form>
            </ModalWrapper>
            <div className="flex justify-end mb-4">
                <button onClick={() => setOpenModal(true)} className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600">
                    Give Feedback
                </button>
            </div>

            {/* All Mine Feedbacks List */}
            <div className='mt-4 '>
                {/* Search Input */}

                <h2 className='text-xl font-bold px-2 text-stone-800 dark:text-gray-100'> My Feedbacks</h2>


                <div className='my-6 text-xs flex flex-wrap gap-4 items-center'>

                    {/* Search Feedback */}
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            className="w-full p-2 min-w-[300px] rounded-md max-w-md 
                              border border-gray-300 dark:border-stone-800
                               bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />


                    </div>
                    {/*  filter by Lab */}
                    <div className="">
                        <select
                            name="labId"
                            id="labId"
                            className='w-full p-2  rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300'
                            value={filteredByLabs}
                            onChange={(e) => setFilteredByLabs(e.target.value)}
                            required
                        >
                            <option value="" >All labs</option>
                            {allLabs?.map((lab) => (
                                <option key={lab._id} value={lab._id}>{lab.labName} <span className='text-xs'>({lab.labCode?.toUpperCase()})</span></option>
                            ))}
                        </select>
                    </div>
                </div>



                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {filteredFeedbacks.map((item) => (
                        <FeedBackCard key={item._id} item={item} />
                    ))}
                </div>

            </div>
        </div>


    );
}
