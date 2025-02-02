import React, { useState } from 'react';
import ModalWrapper from '../../../common/ModalWrapper';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import FeedBackCard from '../../../dashboard/feedback/FeedBackCard';
import { useRecoilState } from 'recoil';
import { userData } from '../../../recoil/states';

export default function FeedBackMain() {


    const { allFeedbacks, allLabs } = useFetchDataApi();

    const[curruser,setCurrUser] =useRecoilState(userData)
    const [filteredByLabs, setFilteredByLabs] = useState("");

    const [searchQuery, setSearchQuery] = useState('');
    const filteredFeedbacks = allFeedbacks?.filter((item)=>item.labId.block === curruser.block).filter((item) => {
        const matchesSearch =
            item.labId?.labName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.feedback?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLab = !filteredByLabs || item.labId?._id === filteredByLabs;

        return matchesSearch && matchesLab;
    });



    return (
        <div className='w-full px-2' >

            {/* All  Feedbacks List */}
            <div className='mt-4 '>

                <div className='my-6 text-xs flex flex-wrap gap-4 items-center'>

                    {/* Search Feedback */}
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            className="w-full p-2 min-w-[300px] rounded-md max-w-md 
          border border-gray-300 dark:border-stone-700 outline-none
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
                            className='w-full p-2  rounded-md border   outline-none
                             border-gray-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300'
                            value={filteredByLabs}
                            onChange={(e) => setFilteredByLabs(e.target.value)}
                            required
                        >
                            <option value="" >All labs</option>
                            {allLabs?.filter((lab) => lab.block === curruser.block)?.map((lab) => (
                                <option key={lab._id} value={lab._id}>{lab.labName} <span className='text-xs'>({lab.labCode?.toUpperCase()})</span></option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {filteredFeedbacks?.map((item) => (
                        <FeedBackCard key={item._id} item={item} />
                    ))}
                </div>

            </div>
        </div>


    );
}
