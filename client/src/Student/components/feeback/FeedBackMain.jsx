import React, { useState } from 'react';
import ModalWrapper from '../../../../common/ModalWrapper';

export default function FeedBackMain() {
    const [selectedLab, setSelectedLab] = useState('');
    const [feedback, setFeedback] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const labs = [
        { id: 'lab1', name: 'ETCC1 Lab' },
        { id: 'lab2', name: 'Physics Lab' },
        { id: 'lab3', name: 'Chemistry Lab' },
        { id: 'lab4', name: 'Biology Lab' },
    ];

    const feedbacks = [
        { labName: 'ETCC1 Lab', feedback: 'Great environment for experiments.' },
        { labName: 'Physics Lab', feedback: 'Needs better equipment maintenance.' },
        { labName: 'Chemistry Lab', feedback: 'Very organized and clean.' },
        { labName: 'Biology Lab', feedback: 'More specimens would be great for study.' },
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected Lab:', selectedLab);
        console.log('Feedback:', feedback);
        setSelectedLab('');
        setFeedback('');
    };



    const [searchQuery, setSearchQuery] = useState('');
    const filteredFeedbacks = feedbacks.filter(item =>
        item.labName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.feedback.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className='w-full px-2' >
            {/* Feedback Form */}
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
                            className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                            value={selectedLab}
                            onChange={(e) => setSelectedLab(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a lab</option>
                            {labs.map((lab) => (
                                <option key={lab.id} value={lab.id}>{lab.name}</option>
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
                            className='w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                            rows="4"
                            placeholder="Write your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className='flex items-center gap-4'>

                        <button
                            type="submit"
                            className='px-4 py-2 bg-emerald-500 text-white font-medium rounded-md shadow hover:bg-emerald-600 dark:hover:bg-emerald-400'>
                            Submit Feedback
                        </button>
                        <button
                            type="reset"
                            onClick={() =>{ setOpenModal(false);
                                setSelectedLab('');
                                setFeedback('');
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

                <h2 className='text-xl font-bold px-4 text-stone-800 dark:text-gray-100'> My Feedbacks</h2>

                {/* Search Feedback */}
                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        className="w-full p-2 mt-2 rounded-md max-w-md   border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {filteredFeedbacks.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-md shadow bg-white dark:bg-stone-800 text-stone-700 dark:text-gray-300"
                        >
                            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.labName}</h3>
                            <p>{item.feedback}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>


    );
}
