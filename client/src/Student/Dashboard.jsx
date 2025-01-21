import React, { useState } from 'react'
import Sidebar from './components/sidebar'
import { FaBars } from 'react-icons/fa6'
import { useRecoilState } from 'recoil';
import { openSideBar, userData } from '../../recoil/states';
import Content from './components/dashboard/Content';
import IssuesMain from './components/issues/IssuesMain';
import FeedBackMain from './components/feeback/FeedBackMain';
import ReqResMain from './components/requests/ReqResMain';
import { MdDarkMode } from 'react-icons/md';
import ProfileIcon from './components/profile/ProfileIcon';
import {useFetchDataApi} from '../../contexts/FetchDataApi';

// Student Dashboard
export default function Dashboard() {
  const [open, setOpen] = useRecoilState(openSideBar);
  const [sideTab, setSideTab] = useState('Dashboard');
  const [currentUserData, setUserData] = useRecoilState(userData);

  return (
    <div className='flex  w-full  min-h-screen max-h-screen '
      style={{ scrollbarWidth: "none" }}>
      <div
      className={`max-md:z-50 absolute min-h-full ${
        open ? "translate-x-0 flex-1 min-w-[270px] z-50" : "max-md:-translate-x-[130%] transition-all  w-[60px] "
      } bg-white md:sticky top-0 dark:bg-stone-900 border border-zinc-300 dark:border-zinc-800 border-opacity-30
           max-w-[300px] rounded-xl m-2 shadow-xl 
          py-4 px-2 transition-transform duration-300 ease-in-out`}
    >
      
      <Sidebar tab={sideTab} setTab={setSideTab} setOpen={setOpen} />
    </div>
      {/* Dashboard Content */}
      <div className='flex-1 my-2 relative mr-2 overflow-y-auto ' style={{ scrollbarWidth: "none" }}>

        {/* Topbar */}
        <div className='flex sticky top-0 z-30   h-14 items-center
        shadow-xl  bg-white
        rounded-md
        px-4
         dark:bg-stone-900 border border-zinc-300
          dark:border-zinc-800 border-opacity-30
         justify-between'>


          <div className='flex items-center gap-3'>
            <FaBars
              onClick={() => setOpen((prev) => !prev)}
              className='dark:text-gray-100 hover:text-slate-500 cursor-pointer' />
            <h1 className='text-xl dark:text-gray-100 font-bold'>{sideTab}</h1>
          </div>

          <div className='flex items-center gap-3 md:mr-5'>
            <MdDarkMode size={25} className='dark:text-gray-100 hover:text-slate-500 cursor-pointer' />
            
            {/* Profile */}
            <ProfileIcon  />
          </div>
        </div>


        <div className='w-full   bg-slate-50 mt-6 px-4' >

          {/* Content */}

          {sideTab === 'Dashboard' && <Content />}
          {sideTab === 'Issues' && <IssuesMain />}
          {sideTab === 'Feedbacks' && <FeedBackMain />}
          {sideTab === 'Requests' && <ReqResMain />}


        </div>

        <div>

        </div>

      </div>

    </div>
  )
}
