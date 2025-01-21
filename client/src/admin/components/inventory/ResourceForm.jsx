import React, { useState } from "react";
import { useFetchDataApi } from "../../../contexts/FetchDataApi";
import Loader from "../../../components/Loaders/Loader";
export default function ResourceForm({
  loading,
  handleSubmit,
  onChangeHandler,
  setOpenModal,
  data,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [resourceType, setResourceType] = useState("");
    const { allLabs}= useFetchDataApi();
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 w-full max-w-lg mx-auto text-sm shadow-lg rounded-lg bg-white dark:bg-stone-800 p-6"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Add Resource Details
      </h2>

      {/* Select Lab */}
      <div>
        <label
          htmlFor="labId"
          className="block text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          Select Lab
        </label>
        <select
          id="labId"
          required
          name="labId"
          className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          onChange={(e) => onChangeHandler(e)}
          value={data?.labId}
        >
          <option value="">Select a Lab</option>
          {allLabs && allLabs.map((lab) => 
          <option key={lab._id} value={lab._id}>{lab.labName} <span className="text-xs">({lab.labCode.toUpperCase()})</span></option>)}
          
        </select>
      </div>

      <div>
          <label
            htmlFor="resourceName"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            Resource Id
          </label>
          <input
            type="text"
            id="code"
            required
            name="code"
            placeholder="Resource Id  e.g. PC-01"
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={data?.code}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>
      {/* Name and Resource Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Resource Name */}
        <div>
          <label
            htmlFor="resourceName"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            Resource Name
          </label>
          <input
            type="text"
            id="resourceName"
            required
            name="resourceName"
            placeholder=" Name"
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={data?.resourceName}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        {/* Resource Type */}
        <div>
          <label
            htmlFor="resourceType"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300"
          >
            Resource Type
          </label>
          <select
            id="resourceType"
            required
            name="resourceType"
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => {
              setResourceType(e.target.value);
              onChangeHandler(e);
            }}
            value={data?.resourceType}
          >
            <option value="">Select Type</option>
            <option value="computer">Computer</option>
            <option value="projector">Projector</option>
            <option value="peripheral">Peripheral</option>
            <option value="software">Software</option>
          </select>
        </div>
      </div>

      {/* Conditional Fields */}
      {resourceType !== "software" && resourceType && (
        <>
          {/* For hardware resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="brand"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                required
                placeholder="Brand"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.brand}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Model*
              </label>
              <input
                type="text"
                id="model"
                name="model"
                required
                placeholder="Model"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.model}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="serialNumber"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Serial Number*
              </label>
              <input
                type="text"
                id="serialNumber"
                name="serialNumber"
                placeholder="Serial Number"
                required
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.serialNumber}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div>
              <label
                htmlFor="purchaseDate"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Purchase Date
              </label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.purchaseDate}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
          </div>
        </>
      )}

      {resourceType === "software" && (
        <>
          {/* For software resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="licenseKey"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                License Key
              </label>
              <input
                type="text"
                id="licenseKey"
                name="licenseKey"
                placeholder="License Key"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.licenseKey}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div>
              <label
                htmlFor="version"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Version *
              </label>
              <input
                type="text"
                id="version"
                name="version"
                required
                placeholder="Version"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.version}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data?.expiryDate}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
       
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
        <button
        disabled={loading}
          type="submit"
          className="px-4 py-2 rounded-md bg-emerald-600 text-white"
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
