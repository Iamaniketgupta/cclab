import React from 'react';
import dayjs from 'dayjs';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';

export default function AllSchedules() {
  const { allSchedules } = useFetchDataApi();

  const getDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  return (
    <div>
      {allSchedules?.map((schedule, index) => {
        const scheduleDate = dayjs(schedule?.date, 'DD/MM/YYYY').toDate(); 
        return (
          <div key={index} className="p-4 mb-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">
              {scheduleDate.toDateString()}
            </h2>
            <p className="text-sm text-gray-500">{getDay(scheduleDate)}</p>
          </div>
        );
      })}
    </div>
  );
}
