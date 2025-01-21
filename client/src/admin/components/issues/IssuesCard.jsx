export default function IssueCard({ issue }) {
    return (
        <div className='bg-white min-w-[300px] p-4  rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700'>
            <h3 className='font-bold text-gray-800 dark:text-gray-100'>Issue #{issue?._id}</h3>
            <p className='text-gray-600 dark:text-gray-400'>{issue?.description}</p>
            <span className={`text-sm font-bold ${
                issue?.status === 'Resolved' ? 'text-green-500' : issue?.status === 'In-Progress' ? 'text-yellow-500' : 'text-red-500'
            }`}>{issue?.status}</span>
        </div>
    );
}
