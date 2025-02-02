import dayjs from 'dayjs';
import { useFetchDataApi } from '../contexts/FetchDataApi';
import TimeTableViewer from './../common/TimeTableViewer';
import ModalWrapper from './../common/ModalWrapper';
import { useState } from 'react';
import { SlCalender } from "react-icons/sl";
import { MdDelete } from 'react-icons/md';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../components/Loaders/Loader';
import { useRecoilState } from 'recoil';
import { userData } from '../recoil/states';
 

export default function AllSchedules({ handleRemove }) {
  const { allSchedules } = useFetchDataApi();
  const [viewTT, setViewTT] = useState(false);
  const [currentUser] = useRecoilState(userData);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const getDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const getRelativeDate = (scheduleDate) => {
    const today = dayjs();
    const dayOfSchedule = dayjs(scheduleDate);

    const fullDate = dayOfSchedule.format('DD/MM/YYYY');
    const dayName = dayOfSchedule.format('dddd');

    if (dayOfSchedule.isSame(today, 'day')) {
      return <span>Today,  <p className='flex items-center gap-2'> <SlCalender /> <span className="text-xs">{fullDate} </span></p></span>;
    } else if (dayOfSchedule.isSame(today.subtract(1, 'day'), 'day')) {
      return <span>Yesterday, <p className='flex items-center gap-2'> <SlCalender /> <span className="text-xs">{fullDate}</span></p></span>;
    } else if (dayOfSchedule.isSame(today.add(1, 'day'), 'day')) {
      return <span>Tomorrow, <p className='flex items-center gap-2'> <SlCalender /> <span className="text-xs">{fullDate}</span> </p></span>;
    } else {
      return <span>{dayName}, <p className='flex items-center gap-2'> <SlCalender /> <span className="text-xs">{fullDate}</span> </p></span>;
    }
  };

  // handle delete

  return (
    <div className='flex items-center gap-4 '>
      {allSchedules?.map((schedule) => {
        const scheduleDate = dayjs(schedule?.date, 'DD/MM/YYYY').toDate();

        return (
          <div
            key={schedule._id}
            onClick={() => {
              setViewTT(true);
              setSelectedSchedule(schedule);
            }}
            className="p-4 mb-4 relative border rounded min-w-[300px] shadow-md dark:text-gray-100
             bg-gradient-to-tr from-white dark:from-stone-900 via-zinc-50 hover:bg-gradient hover:from-zinc-100 hover:via-white
              to-zinc-50 dark:bg-stone-800 cursor-pointer "
          >
            {currentUser?.role === 'faculty' &&
              <MdDelete size={20} onClick={(e) => {
                e.stopPropagation();
                handleRemove(schedule._id)
              }
              }
                className='absolute top-2 cursor-pointer right-2 text-red-500 hover:text-red-700' />
            }
            <h2 className="text-lg font-semibold">
              {getRelativeDate(scheduleDate)}
            </h2>
            <p className="text-sm text-gray-800 dark:text-gray-100">{getDay(scheduleDate)}</p>


          </div>
        );
      })}


      {viewTT && selectedSchedule && (
        <ModalWrapper open={viewTT} setOpenModal={setViewTT} outsideClickClose={true}>
          <TimeTableViewer

            schedule={selectedSchedule} setOpenTT={setViewTT} />
        </ModalWrapper>
      )}



    </div>
  );
}
