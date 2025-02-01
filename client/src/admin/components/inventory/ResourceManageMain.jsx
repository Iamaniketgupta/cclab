import React, { useState } from 'react';
import ModalWrapper from '../../../common/ModalWrapper';
import ResourceForm from './ResourceForm';
import { useFetchDataApi } from '../../../contexts/FetchDataApi';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { RiDeleteBin7Fill } from "react-icons/ri";
import { userData } from '../../../recoil/states';
import { useRecoilState } from 'recoil';
import BulkUpload from './BulkUpload';

export default function ResourceManageMain() {
  const [openModal, setOpenModal] = useState(false);
  const [openBulkModal, setOpenBulkModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [outLoading, setOutLoading] = useState(false);
  const { allResources, setAllResources, allLabs, fetchAllResources } = useFetchDataApi();
  const [curruser, setCurrUser] = useRecoilState(userData)


  const [data, setData] = useState({
    labId: '',
    resourceType: '',
    code: '',
    status: 'available',
    brand: '',
    ram: '',
    processor: '',
    hardDisk: '',
    softwareName: '',
    version: ''
   });


  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    lab: '',
    resourceType: '',
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/resource/add`, { ...data });
      console.log(res);
      toast.success(res?.data?.message || 'Success');
      fetchAllResources();
      setOpenModal(false);
      setData({
        labId: '',
        resourceType: '',
        resourceName: '',
        code: '',
        status: 'available',
        brand: '',
        model: '',
        serialNumber: '',
        purchaseDate: '',
        licenseKey: '',
        version: '',
        expiryDate: '',
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  // console.log(allResources)
  const filteredResources = allResources?.filter((item) => item.labId.block === curruser.block).filter((resource) => {
    const matchesSearch =
      resource.code.toLowerCase().includes(search.toLowerCase())
     const matchesLab = filter.lab ? resource.labId._id === filter.lab : true;
    const matchesType = filter.resourceType
      ? resource.resourceType === filter.resourceType
      : true;
    return matchesSearch && matchesLab && matchesType;
  });

  // handle Remove resource
  const handleRemove = async (id) => {
    if (!confirm("Are you sure you want to remove this resource?")) return;
    try {
      setOutLoading(true);
      const res = await axiosInstance.delete(`/resource/delete/${id}`);
      // console.log(res);
      toast.success(res?.data?.message || 'Success');
      fetchAllResources();
      setOutLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setOutLoading(false);
    }
  }

  // handle change Status
  const handleChangeStatus = async (id, status) => {
    if (!confirm("Are you sure you want to change status?")) return;
    try {
      setOutLoading(true);
      const res = await axiosInstance.put(`/resource/status/${id}`, { status });
      toast.success(res?.data?.message || 'Success');
      fetchAllResources();
      setOutLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
      setOutLoading(false);
    }
  }
  return (
    <div>
      <ModalWrapper open={openModal} setOpenModal={setOpenModal} outsideClickClose={false}>
        <ResourceForm
          loading={loading} handleSubmit={handleSubmit}
          data={data} setOpenModal={setOpenModal} onChangeHandler={onChangeHandler} />
      </ModalWrapper>
      <ModalWrapper open={openBulkModal} setOpenModal={setOpenBulkModal} outsideClickClose={false}>
         <BulkUpload  setOpenModal={setOpenBulkModal} />
      </ModalWrapper>

      <div className="flex justify-end my-4 gap-4 flex-wrap">
        <button
          onClick={() => setOpenBulkModal(true)}
          className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600"
        >
          Bulk Upload
        </button>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-emerald-700 text-white px-4 py-2 rounded shadow hover:bg-emerald-600"
        >
          Add Resource
        </button>
      </div>

      <div className="my-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by Code or Name"
          className="px-4 py-2 border dark:border-stone-900 dark:bg-stone-900 dark:text-gray-100 outline-none rounded text-sm"
          value={search}
          onChange={handleSearch}
        />

        <div className="flex gap-2">
          <select
            name="lab"
            value={filter.lab}
            onChange={handleFilterChange}
            className="px-4 text-xs py-2 border  dark:border-stone-900 dark:bg-stone-900 dark:text-gray-100 outline-none rounded"
          >
            <option value="">All Labs</option>
            {allLabs?.filter((lab) => lab.block === curruser?.block)?.map((lab) => (
              <option key={lab._id} value={lab._id}>
                {lab.labName} <span>({lab.labCode?.toUpperCase()})</span>
              </option>
            ))}


          </select>

          {/* <select
            name="resourceType"
            value={filter.resourceType}
            onChange={handleFilterChange}
            className="px-4 text-xs py-2 border dark:border-stone-900 dark:bg-stone-900 dark:text-gray-100 outline-none rounded"
          >
            <option value="">All Resources</option>
            <option value="computer">Computer</option>
            <option value="projector">Projector</option>
            <option value="peripheral">Peripheral</option>
            <option value="software">Software</option>
          </select> */}
        </div>
      </div>

      <div className='overflow-x-auto'>

        <table className="min-w-full table-auto text-sm  border-stone-900">
          <thead>
            <tr className="bg-emerald-700">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-100">Code</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-100">Lab</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-100">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-100">Details</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-100">Status</th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredResources?.length === 0 ? <tr><td className='text-sm text-center py-4 dark:text-white' colSpan={5}>No resources found</td></tr> :

                filteredResources?.map((resource, index) => (
                  <tr key={index} className="hover:bg-gray-50 bg-white dark:bg-stone-900
       outline-none border-b dark:border-stone-900 transition-colors dark:text-gray-100">
                    <td className="px-4 py-2 text-xs ">{resource?.code || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs ">{resource?.labId?.labName || 'N/A'}</td>
                    <td className="px-4 py-2 text-xs ">{resource.resourceType}</td>
                    <td className="px-4 py-2 text-xs ">
                      {resource.resourceType === 'computer' ? (
                        <div className='flex flex-wrap gap-4'>
                          <div className='font-bold'>Brand: {resource?.brand}</div>
                          <div>Processor: {resource?.processor}</div>
                          <div>Ram: {resource?.ram}</div>
                          <div>Hard Disk: {resource?.hardDisk}</div>
                        </div>
                      ) : resource.resourceType === 'software' ? (
                        <>
                          <div className='font-bold'>  {resource?.softwareName || 'N/A'}</div>
                          <div>Version: {resource?.version || 'N/A'}</div>
                          <div>Expiry: {resource?.expiryDate ? resource?.expiryDate : 'N/A'}</div>
                        </>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-4 py-2 text-xs flex items-center text-gray-800">
                      <span
                        className={`inline-block  h-4 w-4 px-2 py-1 text-xs font-semibold rounded-full ${resource.status === 'available'
                          ? 'bg-green-500 text-white animate-pulse'
                          : resource.status === 'in-use'
                            ? 'bg-blue-500 text-white'
                            : resource.status === 'under-maintenance'
                              ? 'bg-yellow-500 text-white'
                              : resource.status === 'damaged'
                                ? 'bg-red-500 text-white'
                                : resource.status === 'reserved'
                                  ? 'bg-orange-500 text-white'
                                  : ''
                          }`}
                        title={resource.status}
                      >

                      </span>

                      <select name="status"
                        value={resource.status}
                        onChange={(e) => handleChangeStatus(resource._id, e.target.value)}
                        id="" className='w-4'>
                        <option value="available" className='text-green-500 font-semibold'>Available</option>
                        <option value="in-use" className='text-blue-500 font-semibold'>In Use</option>
                        <option value="under-maintenance" className='text-yellow-500 font-semibold'>Under Maintenance</option>
                        <option value="damaged" className='text-red-500 font-semibold'>Damaged</option>
                        <option value="reserved" className='text-orange-500 font-semibold'>Reserved</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRemove(resource._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Resource"
                      >
                        <RiDeleteBin7Fill size={15} />
                      </button>
                    </td>
                  </tr>
                ))


            }
          </tbody>
        </table>
      </div>



    </div>
  );
}
