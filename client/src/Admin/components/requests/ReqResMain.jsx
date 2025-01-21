import { useState } from 'react';
import ModalWrapper from '../../../common/ModalWrapper';
const labs = [
  { id: 'lab1', name: 'ETCC1 Lab' },
  { id: 'lab2', name: 'Physics Lab' },
  { id: 'lab3', name: 'Chemistry Lab' },
  { id: 'lab4', name: 'Biology Lab' },
];

export default function ReqResMain() {
  // Demo Data
  const demoRequests = [
    { id: 1, title: 'Request 1', status: 'pending', description: 'This is a pending request.' },
    { id: 2, title: 'Request 2', status: 'approved', description: 'This request has been approved.' },
    { id: 3, title: 'Request 3', status: 'rejected', description: 'This request was rejected.' },
    { id: 4, title: 'Request 4', status: 'pending', description: 'This is another pending request.' },
  ];

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);

  // Filter  
  const filteredRequests = demoRequests.filter((req) => {
    const matchesTab = activeTab === 'All' || req.status === activeTab.toLowerCase();
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Onchange Form Handle

  const [data, setData] = useState({
    labId: '',
    resourceType: '',
    requestDesc: '',
  })

  const onChangeHandler = (value) => {
    setData({ ...data, labId: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Lab:', data);

  };

  return (
    <div className="w-full px-2 py-4 dark:bg-stone-700">
      {/* Create New Request Button */}
   

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
            {tab}
          </button>
        ))}
      </div>

      {/* Requests Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="p-4 bg-white rounded shadow dark:bg-stone-600 dark:text-white"
            >
              <h3 className="font-semibold text-lg">{req.title}</h3>
              <p className="text-sm">{req.description}</p>
              <p className={`mt-2 text-sm ${req.status === 'approved'
                ? 'text-green-500'
                : req.status === 'rejected'
                  ? 'text-red-500'
                  : 'text-yellow-500'
                } capitalize`}>
                {req.status}
              </p>
            </div>
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
