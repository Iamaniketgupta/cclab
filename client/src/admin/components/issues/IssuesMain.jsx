import React, { useState } from 'react'
import IssueCard from './IssuesCard';
import ModalWrapper from '../../../common/ModalWrapper';

export default function IssuesMain() {
    const [activeTab, setActiveTab] = useState('All Issues');

    const issues = [
        { id: 1, description: 'Issue with login functionality', status: 'In-Progress' },
        { id: 2, description: 'Page not loading', status: 'Resolved' },
        { id: 3, description: 'UI design issue on dashboard', status: 'In-Progress' },
        { id: 4, description: 'Backend error on API call', status: 'Resolved' },
    ];

    const filteredIssues = activeTab === 'All Issues'
        ? issues
        : issues.filter(issue => issue.status === activeTab);

    const [openModal, setOpenModal] = useState(false);
    const [labs, setLabs] = useState([]);
    const [data, setData] = useState({
        labId: '',
        issueType: '',
        issueDesc: '',
    });

    const onChangeHandler = (value) => {
        setData({ ...data, labId: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Issue Form:', data);
        setOpenModal(false);
    };
    return (
        <div className='w-full mt-4 md:p-4 p-2'>

            {/* Select Lab Filter*/}
  
            {/* Filters tabs All Issues, Resolved, In-Progress */}
            <div className='flex items-center gap-4'>
                {['All Issues', 'Resolved', 'In-Progress'].map((tab, index) => (
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
                {filteredIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
        </div>
    )
}
