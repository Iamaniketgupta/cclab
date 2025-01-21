import React from "react";

export default function IssuesMarqCard() {
    // Demo issues
    const issues = [
        "Lab 1: Air conditioning not working.",
        "Lab 2: Projector calibration needed.",
        "Lab 3: Insufficient chairs.",
        "Lab 4: Network issues detected.",
        "Lab 5: Printer out of ink.",
        "Lab 6: System crashes frequently.",
        "Lab 7: Lighting needs repair.",
    ];

    return (
        <div className="p-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Unresolved Issues
            </h2>
            <div className="overflow-auto relative">
                {/* Marquee Container */}
                <div className=" flex gap-3 flex-col flex-wrap wspace-x-8">
                    {issues.slice(0, 3).map((issue, index) => (
                        <div
                            key={index}
                            className="text-sm bg-white border  text-stone-600 rounded-md px-4 py-2 shadow-sm"
                        >
                            {issue.slice(0, 20) + '...'}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
