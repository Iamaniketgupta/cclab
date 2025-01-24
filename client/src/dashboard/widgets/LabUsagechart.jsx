import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/axiosInstance";
import { useFetchDataApi } from "../../contexts/FetchDataApi";
import dayjs from "dayjs";

export default function MonthlyUsageGraph() {
  const [monthlyUsageData, setMonthlyUsageData] = useState([]);
  const [labId, setLabId] = useState("");
  const { allLabs } = useFetchDataApi();

  useEffect(() => {
    const fetchMonthlyUsage = async () => {
      try {
        const url = !labId ? `/stats/lab/usage` : `/stats/lab/usage/${labId}`;
        const response = await axiosInstance.get(url);
        const usageData = response.data;
        console.log(usageData);

        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedData = allLabs?.map((lab) => {
          const labUsageData = monthNames.map((month, index) => {
            const labUsage = usageData.find(
              (entry) => entry.labId === lab._id && entry.month === index + 1
            );

            const usageInMinutes = labUsage ? Math.max(0, labUsage.avgUsage / 60000) : 0;

            return {
              month: month,  
              usage: usageInMinutes,  
            };
          });

          return { labName: lab.labName, data: labUsageData };
        });

        const allData = [];
        formattedData.forEach((lab) => {
          lab.data.forEach((monthData) => {
            const existingMonthData = allData.find(
              (entry) => entry.month === monthData.month
            );

            if (existingMonthData) {
              existingMonthData[lab.labName] = monthData.usage;
            } else {
              allData.push({
                month: monthData.month,
                [lab.labName]: monthData.usage,
              });
            }
          });
        });

        setMonthlyUsageData(allData);
      } catch (error) {
        console.error("Error fetching lab usage data:", error);
      }
    };

    fetchMonthlyUsage();
  }, [labId, allLabs]);

  return (
    <div className="min-w-[300px]  bg-white dark:bg-stone-900 dark:text-gray-100 rounded-lg shadow-lg border border-gray-200 dark:border-stone-700 ">
      <div className="flex justify-between gap-2 flex-wrap p-4">
        <h2 className="md:text-lg text-sm font-semibold dark:text-white text-gray-700 mb-4">
          Monthly Average Usage of Labs (in hrs)
        </h2>

        <div>
          <select
            value={labId}
            onChange={(e) => setLabId(e.target.value)}
            className="px-4 text-xs font-semibold py-2 border max-sm:mb-2  dark:bg-stone-800 dark:text-gray-100 dark:border-gray-600 border-gray-300 rounded-md"
          >
            <option value="">All Labs</option>
            {allLabs?.map((lab) => (
              <option key={lab._id} value={lab._id}>
                {lab.labName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={monthlyUsageData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          {allLabs?.map((lab) => (
            <Line
              key={lab._id}
              type="monotone"
              dataKey={lab.labName}
              stroke="#4F46E5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
