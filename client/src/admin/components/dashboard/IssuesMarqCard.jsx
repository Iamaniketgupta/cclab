import React from "react";
import { useFetchDataApi } from "../../../contexts/FetchDataApi";

export default function IssuesMarqCard() {
    const {allIssues} = useFetchDataApi();

    return (
        <div className="p-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4 flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Unresolved Issues
            </h2>
            <div className="overflow-auto relative">
                {/* Marquee Container */}
                <div className=" flex gap-3 flex-col flex-wrap wspace-x-8">
                    {allIssues?.filter((issue) => issue.status !== "resolved").map((issue) => (
                        <div
                            key={issue._id}
                            className="text-sm bg-white dark:bg-stone-900 border dark:border-stone-800 dark:text-gray-100 text-stone-600 rounded-md px-4 py-2 shadow-sm"
                        >
                            {issue?.issueDesc?.slice(0, 50) + '...'}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
