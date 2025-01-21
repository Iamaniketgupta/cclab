import React from 'react'

export default function Stats({text, value}) {
    return (
        <div className='bg-white dark:bg-stone-800 border border-zinc-300 dark:border-zinc-800 border-opacity-30
        shadow-xl rounded-md flex items-center p-4 justify-between'>
            {text}
            <span className='text-2xl font-bold'>{value}</span>
        </div>
    )
}
