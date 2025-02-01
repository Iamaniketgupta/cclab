import React, { useState } from 'react'
import { MdDashboard } from 'react-icons/md'
import { MdSendTimeExtension } from "react-icons/md";
import { GrLogout, GrResources } from "react-icons/gr";
import { MdFeedback } from "react-icons/md";
import { FaBars, FaLaptopCode } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { openSideBar, userData } from '../../recoil/states';
import { MdTimer } from "react-icons/md";
import { PiChalkboardTeacherFill, PiStudent } from "react-icons/pi";
import { MdOutlineInventory } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../apis/apiCalls';
import DeleteConfirmation from '../../common/DeleteConfirmation';
import ModalWrapper from '../../common/ModalWrapper';

const listData = [
    {
        name: "Dashboard",
        icon: <MdDashboard size={20} />,
    },

    {
        name: "Labs",
        icon: <FaLaptopCode size={20} />,
    },
    {
        name: "Faculty",
        icon: <PiChalkboardTeacherFill size={20} />,
    },
    {
        name: "Students", // This tab will be conditionally rendered
        icon: <PiStudent size={20} />,
    },
    {
        name: "Inventory",
        icon: <MdOutlineInventory size={20} />,
    },
    {
        name: "Schedules",
        icon: <MdTimer size={20} />,
    },
    {
        name: "Issues",
        icon: <MdSendTimeExtension size={20} />,
    },
    {
        name: "Requests",
        icon: <GrResources size={20} />,
    },
    {
        name: "Feedbacks",
        icon: <MdFeedback size={20} />,
    },
];

export default function Sidebar({ setTab, tab, setOpen }) {
    const [open] = useRecoilState(openSideBar);
    const [currUser, setCurrUser] = useRecoilState(userData);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const logoutHandler = () => {
        if (logoutUser()) {
            setCurrUser(null);
            setOpenModal(false);
            // console.log("first")
        }
        navigate("/login");
    }


    const filteredListData = listData.filter(item => {
        if (currUser?.role === "admin" && item.name === "Students" ) {
            return false;
        }

        if (currUser?.role === "faculty" && !["Dashboard", "Students", "Schedules", "Issues"].includes(item.name)) {
            return false;
        }

        if (currUser?.role === "super-admin" && item.name!=="Dashboard" ){
            return false;
        }

        return true;
        });

    return (
        <div className='relative min-h-full text-stone-700 dark:text-gray-100'>
            <div className='text-2xl font-bold border-b border-zinc-700 border-opacity-30 py-4 flex relative gap-4 items-center'>
                <FaBars
                    size={20}
                    onClick={() => setOpen((prev) => !prev)}
                    className='dark:text-gray-100 sticky md:hidden bottom-2 hover:text-slate-500 cursor-pointer'
                />
                <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0chhs7PCMWtuhOLg8yYBynOz2qsPmX_ydmCJwci-rkpfXh47lW_2YRRgT7skeD8INGrA&usqp=CAU"}
                    alt="pcte"
                    className='w-8 h-8 rounded- object-cover'
                />
                {open && "CampusFlow"}
            </div>

            <div className='flex flex-col mt-5 gap-2'>
                {filteredListData.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setTab(item.name)}
                        className={` 
                            ${item.name === tab && "bg-gradient-to-r from-emerald-900 to-zinc-700 text-white"}
                            rounded-md
                            p-2 
                            transition-all
                            cursor-pointer
                            hover:bg-gradient-to-r hover:from-emerald-800 hover:to-zinc-700
                            hover:text-white
                            font-semibold flex items-center gap-3
                            ${!open ? 'w-fit' : 'w-full'}
                        `}
                    >
                        {item.icon}
                        {open && item.name}
                    </div>
                ))}
            </div>

            <div
                title='logout'
                onClick={() => setOpenModal(true)}
                className={`lg:absolute lg:bottom-3 ${!open ? 'w-fit' : 'w-[80%]'} 
                    font-medium flex items-center gap-4
                    cursor-pointer
                    py-3 px-2 rounded-md 
                    hover:text-white
                    hover:bg-gradient-to-r hover:from-stone-900 hover:to-zinc-700
                `}
            >
                <GrLogout size={20} className='text-red-700' />
                {open && "Log Out"}
            </div>

            <ModalWrapper open={openModal} setOpen={setOpenModal}>
                <DeleteConfirmation handler={logoutHandler} setOpenModal={setOpenModal} />
            </ModalWrapper>
        </div>
    );
}
