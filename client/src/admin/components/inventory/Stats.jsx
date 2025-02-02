import { FaDesktop, FaTools, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const StatsWidgets = ({ filteredResources }) => {
  const totalPCs = filteredResources?.filter(item => item.resourceType === "computer")?.length || 0;
  const totalSoftwares = filteredResources?.filter(item => item.resourceType === "software")?.length || 0;
  const availablePCs = filteredResources?.filter(item => item.resourceType === "computer" && item.status === "available")?.length || 0;
  const damagedPCs = filteredResources?.filter(item => item.resourceType === "computer" && item.status === "damaged")?.length || 0;

  const stats = [
    { title: "Total PCs", value: totalPCs, icon: <FaDesktop className="text-blue-500" />, bg: "bg-blue-100 text-blue-700" },
    { title: "Total Softwares", value: totalSoftwares, icon: <FaTools className="text-purple-500" />, bg: "bg-purple-100 text-purple-700" },
    { title: "Available PCs", value: availablePCs, icon: <FaCheckCircle className="text-green-500" />, bg: "bg-green-100 text-green-700" },
    { title: "Damaged PCs", value: damagedPCs, icon: <FaExclamationTriangle className="text-red-500" />, bg: "bg-red-100 text-red-700" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      {stats.map((stat, index) => (
        <div key={index} className={`flex items-center p-4 rounded-lg shadow-md ${stat.bg}`}>
          <div className="text-2xl">{stat.icon}</div>
          <div className="ml-3">
            <p className="text-sm font-medium">{stat.title}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsWidgets;
