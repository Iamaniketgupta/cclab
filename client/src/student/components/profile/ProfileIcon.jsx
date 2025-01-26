import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from './../../../recoil/states';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { MdEditSquare } from "react-icons/md";
import Loader from '../../../components/Loaders/Loader';
export default function ProfileIcon() {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const [currentUserData, setUserData] = useRecoilState(userData);
  const [loading, setLoading] = useState(false);
  const toggleInfo = () => {
    setInfoVisible((prev) => !prev);
  };

  // update Avatar
  const updateAvatar = async (data) => {
    console.log(data)
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", data);  
  
      const res = await axiosInstance.put(`/user/update/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res?.data?.message || "Profile Pic updated successfully");
      setUserData((prev) => ({ ...prev, avatar: res?.data?.user?.avatar }));
      setLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error updating avatar");
      setLoading(false);
    }
  }
  
  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        className="w-10 h-10 relative rounded-full bg-stone-200  border overflow-hidden border-zinc-300 cursor-pointer"
        onClick={toggleInfo}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={currentUserData?.avatar ||
            "https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png"}

          alt="Profile"
        />

      </div>

      {/* Info Section */}
      {isInfoVisible && (
        <div className="absolute top-12 right-0 w-64 p-4 bg-white dark:bg-stone-900 rounded-lg shadow-lg border border-gray-200
        dark:text-gray-100 text-stone-800 dark:border-stone-800 z-10">
          <div className='relative '>
            {
              loading ? <Loader /> : <img src={currentUserData?.avatar
                || "https://static-00.iconduck.com/assets.00/avatar-default-icon-1975x2048-2mpk4u9k.png"
              } alt="" className='w-28 h-28 rounded-full mx-auto mt-2' />
            }
            <label htmlFor="avatarchange">
              <MdEditSquare className="absolute bottom-0 -right-0 w-6 h-6 cursor-pointer text-emerald-700 hover:text-emerald-600" />
              <input type="file" accept="image/*" name="" id="avatarchange" hidden onChange={(e) => updateAvatar(e.target.files[0])} />
            </label>
          </div>

          <div className="text-lg font-bold">{currentUserData?.name || '-login please'}</div>
          <div className="text-sm  text-emerald-800 dark:text-emerald-400">{currentUserData?.role}</div>
          {currentUserData?.role === "student" && <div className="text-sm  mt-1">ID: {currentUserData?.rollNumber}</div>}
          {currentUserData?.role !== "student" && <div className="text-sm  mt-1">{currentUserData?.email}</div>}
          {/* <div className="text-sm   mt-1">Block - {currentUserData?.block}</div> */}
        </div>
      )}
    </div>
  );
}
