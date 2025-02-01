import React, { useState } from "react";
import * as XLSX from "xlsx";
import axiosInstance from "../../../utils/axiosInstance";
import { useFetchDataApi } from "../../../contexts/FetchDataApi";
import { userData } from "../../../recoil/states";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
// import axios from "axios";

export default function BulkUpload({ setOpenModal }) {
    const [data, setData] = useState([]);
    const [resourceType, setResourceType] = useState("computer");
    const [labId, setLabId] = useState("");
    const [errors, setErrors] = useState([]);
    const [currUser, setCurrUser] = useRecoilState(userData);

    const { allLabs } = useFetchDataApi();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) parseExcel(file);
    };

    const parseExcel = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            validateData(parsedData);
        };
        reader.readAsBinaryString(file);
    };

    const validateData = (parsedData) => {
        const validationErrors = [];
        const validData = parsedData.map((item, index) => {
            if (resourceType === "computer") {
                if (!item.code || !item.brand || !item.ram || !item.hardDisk || !item.processor) {
                    validationErrors.push(`Row ${index + 1} is missing required fields`);
                }
                return {
                    labId,
                    resourceType,
                    code: item.code?.toLowerCase().trim(),
                    brand: item.brand,
                    ram: item.ram,
                    hardDisk: item.hardDisk,
                    processor: item.processor,
                    status: "available",
                };
            } else if (resourceType === "software") {
                if (!item.softwareName || !item.version) {
                    validationErrors.push(`Row ${index + 1} is missing required fields`);
                }
                return {
                    labId,
                    resourceType,
                    softwareName: item.softwareName,
                    version: item.version,
                    softwareStatus: "active",
                    status: "available",
                };
            }
            return null;
        }).filter(Boolean);

        setErrors(validationErrors);
        if (validationErrors.length === 0) {
            setData(validData);
        }
    };

    const handleUpload = async () => {
        if (!labId) {
            alert("Please enter a Lab ID.");
            return;
        }

        if (errors.length > 0) {
            alert("Fix the errors before uploading.");
            return;
        }

        if (data.length === 0) {
            alert("No valid data to upload.");
            return;
        }

        console.log(data)
        try {
            const response = await axiosInstance.post("/bulk/resources", { data });
            toast.success(response.data.message);
            setOpenModal(false);
        } catch (error) {
            // toast.error(error.response?.data?.message || error.message);
            alert("Upload failed: " + error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="p-5 bg-white dark:bg-stone-900 w-full h-full text-white dark:text-gray-100">

            <div className="flex items-center justify-between gap-4">

                <h2 className="text-xl font-bold mb-3">Bulk Upload Resources</h2>

                <button
                onClick={() => setOpenModal(false)}
                 className="bg-red-500 p-2 rounded-md px-4 text-xs text-white hover:bg-red-600">Cancel</button>
            </div>
            <div className="flex flex-col gap-3">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Select Lab */}
                    <div>
                        <label
                            htmlFor="labId"
                            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                            Select Lab*
                        </label>
                        <select
                            id="labId"
                            required
                            name="labId"
                            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                            onChange={(e) => setLabId(e.target.value)}
                            value={labId}
                        >
                            <option value="">Select a Lab</option>
                            {allLabs && allLabs?.filter((lab) => lab.block === currUser?.block)?.map((lab) =>
                                <option key={lab._id} value={lab._id}>{lab.labName} <span className="text-xs">({lab.labCode.toUpperCase()})</span></option>)}

                        </select>
                    </div>

                    {/* Resource Type */}
                    <div>
                        <label
                            htmlFor="resourceType"
                            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                            Resource Type*
                        </label>
                        <select
                            id="resourceType"
                            required
                            name="resourceType"
                            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                            onChange={(e) => {
                                setResourceType(e.target.value);

                            }}
                            value={resourceType}
                        >
                            <option value="">Select Type</option>
                            <option value="computer">Computer</option>
                            <option value="software">Software</option>
                        </select>
                    </div>


                </div>

                {
                    resourceType && labId && <>

                        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="border p-2 rounded" />
                        <button onClick={handleUpload} className="bg-emerald-500 text-white px-4 py-2 rounded font-bold">
                            Upload
                        </button>
                    </>}
            </div>

            {errors.length > 0 && (
                <div className="mt-5 text-red-600">
                    <h3 className="text-lg font-bold">Errors Found:</h3>
                    <ul className="list-disc pl-5">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {data.length > 0 && errors.length === 0 && (
                <div className="mt-5">
                    <h3 className="text-lg font-bold">Valid Data Preview</h3>
                    <table className="border-collapse border text-xs border-gray-300 text-stone-900 dark:text-gray-100 w-full mt-2">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key} className="border p-2 text-stone-900 dark:text-gray-100">{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((val, i) => (
                                        <td key={i} className="border p-2 text-stone-900 dark:text-gray-100">{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
