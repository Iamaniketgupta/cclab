import { useState } from 'react';
import * as XLSX from 'xlsx';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const BulkUpload = ({ setBulkOpenModal }) => {
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [errors, setErrors] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Handle file selection
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];

        if (!uploadedFile || !['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'].includes(uploadedFile.type)) {
            alert('Please upload a valid .xlsx or .csv file.');
            return;
        }

        setFile(uploadedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            if (data.length === 0) {
                alert('The uploaded file is empty or invalid. Please upload a valid file.');
                return;
            }

            setPreviewData(data);
        };
        reader.readAsBinaryString(uploadedFile);
    };

    const handleBulkUpload = async () => {
        if (previewData.length === 0) {
            alert('No data to upload.');
            return;
        }

        try {
            setUploading(true);
            setErrors(null);

            const response = await axiosInstance.post('/bulk/students', { students: previewData });

            console.log('Upload successful:', response.data.data);

            if (response.data.errors && response.data.errors.length > 0) {
                setErrors(response.data.errors);
                toast.error(
                    'Error:' + response.data.errors[0].error +
                    '\nRow: ' + response.data.errors[0].row
                );
                setBulkOpenModal(false);
                console.warn('Some records had errors:', response.data.errors);
            } else {
                alert('All records uploaded successfully.');
            }

            setPreviewData([]);
        } catch (error) {
            if (error.response) {
                console.log(error)
                alert(`Upload failed: ${error.response.data.message}`);
                if (error.response.data.errors) {
                    setErrors(error.response.data.errors);
                }
                setBulkOpenModal(false);
            } else {
                alert('An error occurred during the upload.');
            }
        } finally {
            setUploading(false);
            setBulkOpenModal(false)
        }
    };

    return (
        <div className='bg-white p-4 min-w-full h-full m-2  rounded-md text-stone-800 dark:text-gray-100 dark:bg-stone-900'>

            <div className="flex items-center justify-between gap-4">

                <h1 className='text-2xl font-bold'>Bulk Upload</h1>
                <button
                    onClick={() => {
                        setPreviewData([])
                        setBulkOpenModal(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                >
                    Cancel
                </button>

            </div>
            <input
                type="file"
                className='mt-2 p-2 border rounded-md text-xs text-stone-800 dark:text-stone-100 border-stone-300 outline-none dark:bg-stone-900 dark:border-stone-700 focus:ring-1 focus:ring-emerald-800'
                accept=".xlsx, .csv"
                onChange={handleFileUpload}
            />

            {previewData.length > 0 && (
                <div className=''>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">Preview</h2>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mb-6 text-xs">
                        <button
                            onClick={handleBulkUpload}
                            disabled={uploading}
                            className={`px-4 py-2 rounded-lg text-white font-medium ${uploading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {uploading ? "Uploading..." : "Submit"}
                        </button>
                        <button
                            onClick={() => {
                                setPreviewData([])
                                setBulkOpenModal(false);
                            }}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Preview Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-xs border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 border-b border-gray-300">
                                    {Object.keys(previewData[0]).map((key) => (
                                        <th
                                            key={key}
                                            className="px-4 py-2 text-left font-semibold text-gray-600"
                                        >
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            }`}
                                    >
                                        {Object.values(row).map((value, idx) => (
                                            <td
                                                key={idx}
                                                className="px-4 py-2 text-gray-700 border-b border-gray-300"
                                            >
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* Errors Section */}
                    {errors && errors.length > 0 && (
                        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Errors</h3>
                            <ul className="list-disc pl-5">
                                {errors.map((error, idx) => (
                                    <li key={idx} className="text-sm">
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}


        </div >
    );
};

export default BulkUpload;
