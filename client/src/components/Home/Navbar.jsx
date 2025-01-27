import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "./constants/index";
import { MdDarkMode, MdLightMode } from "react-icons/md";
// import ModalWrapper from "../../../common/ModalWrapper";
// import Confirmation from "../../Auth/components/confirmation";
import { useDarkMode } from "../../contexts/DarkModeWrapper";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../apis/auth";
import { clearCurrUser } from "../../redux/slices/auths/authSlice";
import { userData } from "../../recoil/states";
import { useRecoilState } from "recoil";
import ModalWrapper from "../../common/ModalWrapper";
import DeleteConfirmation from "../../common/DeleteConfirmation";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { mode, toggleMode } = useDarkMode();
  const currUser = useSelector((state) => state.auth.currUser);
  const dispatch = useDispatch();
  const [currUserData, setUser] = useRecoilState(userData)
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const navigate = useNavigate()

  const handleLogout = () => {
   if(logoutUser()) {
     setUser(null)
     dispatch(clearCurrUser())
    navigate('/login')
   }
      
  }


  return (
    <nav className={`sticky  dark:text-white  top-0 z-[100] py-3   shadow-sm  border-neutral-700/80 ${mobileDrawerOpen ? "max-sm:dark:bg-stone-900 max-sm:bg-white" : ""}`}>
      {/* <ModalWrapper open={isModalOpen} setOpenModal={setModalOpen}>
        <Confirmation handler={hadleLogOut} setOpenModal={setModalOpen} />
      </ModalWrapper> */}


      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <Link to={'/'} className="flex items-center flex-shrink-0">
            <div
              className={`text-2xl md:pl-2 text-blue-600 font-bold ${!open && "hidden"}`}
            >
              <span className='text-gray-700 ml-2 dark:text-gray-100 '>PCTE Computer Labs</span>
            </div>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12">

            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            {!mode ? <MdDarkMode className="text-2xl text-stone-800  dark:text-gray-100 cursor-pointer " onClick={toggleMode} />
              : <MdLightMode className="text-2xl text-stone-800 dark:text-gray-100 cursor-pointer" onClick={toggleMode} />
            }

            {currUser ? (
              <>
                <button
                  onClick={() => {
                    setModalOpen(true)
                    
                  }
                  }
                  className="py-2 px-3 border rounded-md"
                >
                  Log out
                </button>




                <button
                  onClick={() => {

                    navigate('/dashboard')


                  }}
                  className="py-2 px-3 border rounded-md bg-blue-700 text-white font-semibold"
                >
                  Dashboard
                </button>



              </>
            ) : (
              <>
                <Link to={'/login'} className="py-2 px-3 border rounded-md">
                  Log In
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden  md:flex flex-col justify-end">
            <div className="flex space-x-4">

              {!mode ? <MdDarkMode className="text-2xl text-stone-800 dark:text-gray-100  cursor-pointer " onClick={toggleMode} />
                : <MdLightMode className="text-2xl text-stone-800 dark:text-gray-100  cursor-pointer" onClick={toggleMode} />
              }
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 shadow-md z-50 dark:text-white dark:bg-stone-900 bg-white w-full p-12 flex flex-col  lg:hidden">

            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 z-50">
              {currUser ? (
                <>

                  <button
                    onClick={() =>
                      setModalOpen(true)
                    }
                    className="py-2 px-3 border rounded-md"
                  >
                    Log out
                  </button>

                  <button
                    onClick={() => {

                      navigate('/dashboard')


                    }}
                    className="py-2 px-3 border rounded-md bg-blue-700 text-white font-semibold"
                  >
                    Dashboard
                  </button>



                </>
              ) :
                <>
                  <Link
                    to={'/login'}
                    className="py-2 px-3 border text-xs rounded-md"
                  >
                    Log in
                  </Link>
                  
                </>
              }
            </div>
          </div>
        )}
      </div>
      <ModalWrapper open={isModalOpen} setOpenModal={setModalOpen}>
        <DeleteConfirmation handler={handleLogout} setOpenModal={setModalOpen} />
      </ModalWrapper>
    </nav >
  );
};

export default Navbar;
