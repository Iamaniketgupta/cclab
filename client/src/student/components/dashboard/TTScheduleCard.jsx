import React, { useEffect, useState } from 'react';
import { useFetchDataApi } from './../../../contexts/FetchDataApi';

export default function TTScheduleCard() {
  const { allSchedules } = useFetchDataApi();
  const [todaySchedule, setTodaySchedule] = useState(null);
console.log(allSchedules)
  useEffect(() => {
    if (!allSchedules) return;

    // Find today's schedule
    setTodaySchedule(
      allSchedules.find((schedule) => {
        const today = new Date();
        const scheduleDate = new Date(schedule.date); // Convert schedule.date to a Date object
        return (
          scheduleDate.toDateString() === today.toDateString()
        );
      })
    );
  }, [allSchedules]);

  return (
    <div>
      <h2>Today's Schedule</h2>
      {todaySchedule ? (
        <div>
          <p>{new Date(todaySchedule.date).toDateString()}</p>
        </div>
      ) : (
        <p>No schedule for today.</p>
      )}
    </div>
  );
}
