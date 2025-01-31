import React, { useState } from "react";
import { useFetchDataApi } from "../../../contexts/FetchDataApi";
import Loader from "../../../components/Loaders/Loader";
import { userData } from "../../../recoil/states";
import { useRecoilState } from "recoil";
export default function ResourceForm({
  loading,
  handleSubmit,
  onChangeHandler,
  setOpenModal,
  data,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [resourceType, setResourceType] = useState("");
  const { allLabs } = useFetchDataApi();
const [currUser,setCurrUser] = useRecoilState(userData);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 w-full max-w-lg mx-auto text-sm shadow-lg rounded-lg bg-white dark:bg-stone-800 p-6"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center">
        Add Resource Details
      </h2>


      {/* Name and Resource Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
          onChange={(e) => onChangeHandler(e)}
          value={data?.labId}
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
            Resource Type
          </label>
          <select
            id="resourceType"
            required
            name="resourceType"
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            onChange={(e) => {
              setResourceType(e.target.value);
              onChangeHandler(e);
            }}
            value={data?.resourceType}
          >
            <option value="">Select Type</option>
            <option value="computer">Computer</option>
            <option value="software">Software</option>
          </select>
        </div>


      </div>

      {/* Conditional Fields */}
      {resourceType !== "software" && resourceType && (
        <>
          {/* For hardware resources */}
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
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
            value={data?.code}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

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
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                value={data?.brand}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div>
              <label
                htmlFor="model"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Ram Size in GB*
              </label>
              <input
                type="text"
                id="ram"
                name="ram"
                required
                placeholder="ram size"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                value={data?.ram}
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
                Processor*
              </label>
              <input
                type="text"
                id="processor"
                name="processor"
                placeholder="e.g. INTEL i5 11th Gen"
                required
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                value={data?.processor}
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div>
              <label
                htmlFor="hardDisk"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                HardDisk Size in GB
              </label>
              <input
                type="text"
                id="hardDisk"
                name="hardDisk"
                placeholder="HardDisk Size in GB"
                required
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                value={data?.hardDisk}
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
                Software Name
              </label>
              <input
                type="text"
                id="softwareName"
                name="softwareName"
                placeholder="Software Name"
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                value={data?.softwareName}
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
                className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                value={data?.version}
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
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-800 text-gray-100"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="px-4 py-2 rounded-md bg-emerald-800 text-white"
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
