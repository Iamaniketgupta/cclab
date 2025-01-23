 
export default function ThankyouPopup({setOpenModal ,content }) {
  return (
    <div className="flex bg-white dark:bg-stone-700 text-gray-800 dark:text-gray-100 w-full m-4 h-full rounded-lg items-center justify-center">
    <div>
      <div className="flex flex-col items-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-28 w-28 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-4xl font-bold">Thank You !</h1>
        <p>
          {content}
        </p>

        <button
          onClick={() => setOpenModal(false)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      
      </div>
    </div>
  </div>
  
  )
}
