import React, { useState } from "react";
import { useFetchDataApi } from "../../../contexts/FetchDataApi";
import AddRow from "./AddRow";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from 'react-toastify';
import Loader from "../../../components/Loaders/Loader";
import AllSchedules from "../../../dashboard/AllSchedules";
import { useRecoilState } from "recoil";
import { userData } from "../../../recoil/states";
 
export default function LabSchedulesMain() {

  const { allSchedules, allLabs ,fetchAllSchedules} = useFetchDataApi();
  const [isLoading, setIsLoading] = useState(false);
  const [currUser, setCurrUser] = useRecoilState(userData);

  const [tab, setTab] = useState("AllSchedules");
  const [currentDate, setCurrentDate] = useState(
    localStorage.getItem("currentDate") || ""
  );
  const [rows, setRows] = useState(
    JSON.parse(localStorage.getItem("schedules")) || []
  );

  const [newSchedule, setNewSchedule] = useState({
    labId: "",
    class: "",
    facultyName: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    if(newSchedule.startTime > newSchedule.endTime){
      alert("Start time should be less than end time");
      return;
    }
    if (rows.length > 0 && newDate !== currentDate) {
      const confirmChange = window.confirm(
        `You already have data for ${currentDate}. Changing the date will erase all entries for this date. Do you want to proceed?`
      );

      if (!confirmChange) {
        return;
      }
      localStorage.removeItem("schedules");
      setRows([]);
    }

    setCurrentDate(newDate);
    localStorage.setItem("currentDate", newDate);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleAddRow = (e) => {
    e.preventDefault();

    if (
      currentDate &&
      newSchedule.labId &&
      newSchedule.class &&
      newSchedule.facultyName &&
      newSchedule.startTime &&
      newSchedule.endTime &&
      newSchedule.purpose
    ) {
      const newRows = [...rows, { ...newSchedule, date: currentDate }];
      setRows(newRows);
      localStorage.setItem("schedules", JSON.stringify(newRows));
      setNewSchedule({
        labId: "",
        class: "",
        facultyName: "",
        startTime: "",
        endTime: "",
        purpose: "",
      });
    } else {
      alert("Please fill all the fields!");
    }
  };

  const handleSaveSchedule = async () => {
    if (!rows.length) {
      alert("No schedules to save!");
      return;
    }
    if(!confirm("Are you sure you want to save this schedule?")){
      return;
    }
    const scheduleData = {
      date: currentDate,
      details: rows.map((row) => ({
        labId: row.labId,
        class: row.class,
        facultyName: row.facultyName,
        startTime: new Date(`${currentDate}T${row.startTime}`),
        endTime: new Date(`${currentDate}T${row.endTime}`),
        purpose: row.purpose,
      })),

    };

    
    
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/schedule/add", scheduleData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Schedule saved successfully!");
        setRows([]);
        setCurrentDate("");
        localStorage.removeItem("schedules");
        localStorage.removeItem("currentDate");
        fetchAllSchedules();
      } else {
        throw new Error("Failed to save schedule");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
      setIsLoading(false);
      toast.error("Error saving schedule. Please try again.");
    }
  };


  console.log(allSchedules)

  return (


    <div className="p-4 space-y-6">

      {/* Tabs All Schedules, New Schedule  */}
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "AllSchedules" ? "bg-emerald-500 text-white" : "bg-white border shadow-sm dark:border-stone-700 dark:bg-stone-900 dark:text-gray-100  text-gray-600"
            }`}
          onClick={() => setTab("AllSchedules")}
        >
          All Schedules
        </button>
     {  currUser.role === "faculty" && <button
          className={`px-4 py-2 rounded-md text-sm font-medium ${tab === "NewSchedule" ? "bg-emerald-500 text-white" : "bg-white border dark:border-stone-700 dark:bg-stone-900 shadow-sm dark:text-gray-100 outline-none text-gray-600"
            }`}
          onClick={() => setTab("NewSchedule")}
        >
          Create
        </button>}







      </div>


      {/* All Schedules */}
      {tab === "AllSchedules" && <div>
        {
          allSchedules?.length > 0 ? (
            <AllSchedules
            />
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-gray-600">No schedules found.</p>
            </div>
          )
        }
      </div>
      }
      {/* Schedule Form */}
      {tab === "NewSchedule" && <>

        {/* Date Selector */}
        <div>
          <label className="block text-md px-2 font-medium text-gray-600 dark:text-gray-100">
            Select Date
          </label>
          <input
            type="date"
            name="date"
            min={new Date().toLocaleDateString("en-CA")}
            value={currentDate}
            onChange={handleDateChange}
            className="mt-1 block w-full h-10 px-4 dark:bg-stone-900 border dark:border-stone-700 dark:text-gray-100 rounded-md border-gray-300 shadow-sm text-xs"
            required
          />
        </div>

        {/* Add Schedule Row */}
        <AddRow
          handleAddRow={handleAddRow}
          handleInputChange={handleInputChange}
          newSchedule={newSchedule}

          allLabs={allLabs}
        />

        {/* Display Added Rows */}
        {rows.length > 0 && (
          <div className="bg-white shadow-md dark:text-gray-100 dark:bg-stone-900 border dark:border-stone-700 rounded-lg p-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-4">
              Added Schedules (Draft)
            </h2>
            <table className="min-w-full border-collapse border dark:text-gray-100 border-gray-300 ">
              <thead>
                <tr className="bg-gray-100 dark:bg-stone-800 border  dark:border-stone-700 text-xs dark:text-gray-100 text-gray-700 uppercase">
                  <th className="border border-gray-300 px-4 py-2 ">Class</th>
                  <th className="border border-gray-300 px-4 py-2 ">Lab</th>
                  <th className="border border-gray-300 px-4 py-2 ">Faculty</th>
                  <th className="border border-gray-300 px-4 py-2">Start Time</th>
                  <th className="border border-gray-300 px-4 py-2">End Time</th>
                  <th className="border border-gray-300 px-4 py-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className="text-xs text-gray-800 dark:text-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {row.class || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {allLabs?.find((lab) => lab._id === row.labId)?.labName ||
                        "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.facultyName || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.startTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.endTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {row.purpose || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                disabled={isLoading}
                onClick={handleSaveSchedule}
                className="bg-green-800 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 text-xs"
              >
                {isLoading ? <Loader /> : "Save Schedule"}
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset?")) {
                    localStorage.removeItem("schedules");
                    localStorage.removeItem("currentDate");
                    setRows([]);
                    setCurrentDate("");
                  }
                }}
                className="bg-gray-300 text-gray-800 dark:text-gray-100 dark:bg-stone-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 text-xs"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </>
      }

    </div>
  );
}
