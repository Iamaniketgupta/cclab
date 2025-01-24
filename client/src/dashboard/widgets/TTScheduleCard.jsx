import React, { useEffect, useState } from 'react';
import { useFetchDataApi } from '../../contexts/FetchDataApi';
import TimeTableViewer from '../../common/TimeTableViewer';
import ModalWrapper from '../../common/ModalWrapper';
import dayjs from 'dayjs';
import { FaCalendar, FaClock } from 'react-icons/fa6';
import { SlCalender } from 'react-icons/sl';
export default function TTScheduleCard() {
  const { allSchedules } = useFetchDataApi();
  const [todaySchedule, setTodaySchedule] = useState(null);
  const [viewTT, setViewTT] = useState(false);

   useEffect(() => {
    if (!allSchedules) return;

   
    setTodaySchedule(
      allSchedules.find((schedule) => {
        const today = new Date();
        const scheduleDate = new Date(schedule.date);
        return (
          scheduleDate.toDateString() === today.toDateString()
        );
      })
    );
  }, [allSchedules]);

  return (
    <div>
      <h2 className='text-lg mt-2 font-bold flex
      dark:text-gray-100
       items-center gap-2'>Today's Lab Schedule  <FaClock /></h2>
      {todaySchedule ? (
        <div className='p-2 mt-2'>
          <div
            onClick={() => {
              setViewTT(true);

            }}
            className="p-4 mb-4 border rounded min-w-[150px] shadow-md dark:text-gray-100
             bg-gradient-to-tr from-white dark:from-stone-900 via-zinc-50 hover:bg-gradient hover:from-zinc-100 hover:via-white
              to-zinc-50 dark:bg-stone-800 cursor-pointer "
          >
            <div className="text-sm font-semibold">
            <p className='flex items-center gap-2'>
              <SlCalender/>
              {dayjs(todaySchedule?.date).format('DD/MM/YYYY')}
              </p> 
           
              {dayjs(todaySchedule?.date).format('dddd')
              }
            </div>


          </div>

          <ModalWrapper open={viewTT} setOpenModal={setViewTT} outsideClickClose={true}>
            <TimeTableViewer

              schedule={todaySchedule} setOpenTT={setViewTT} />
          </ModalWrapper>
        </div>
      ) : (
        <p className='text-center text-xs w-full'>No schedule for today.</p>
      )}
    </div>
  );
}
