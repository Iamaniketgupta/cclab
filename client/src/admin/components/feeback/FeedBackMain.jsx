import React, { useState } from 'react';
import ModalWrapper from '../../../common/ModalWrapper';

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
        
            {/* All  Feedbacks List */}
            <div className='mt-4 '>

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
