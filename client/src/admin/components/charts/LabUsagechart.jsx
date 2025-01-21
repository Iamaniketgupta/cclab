import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", usage: 120 },
  { month: "Feb", usage: 95 },
  { month: "Mar", usage: 100 },
  { month: "Apr", usage: 110 },
  { month: "May", usage: 130 },
  { month: "Jun", usage: 90 },
  { month: "Jul", usage: 115 },
  { month: "Aug", usage: 105 },
  { month: "Sep", usage: 125 },
  { month: "Oct", usage: 140 },
  { month: "Nov", usage: 110 },
  { month: "Dec", usage: 100 },
];

export default function MonthlyUsageGraph() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Monthly Average Usage of Labs hrs
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="usage"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
