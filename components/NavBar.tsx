/* eslint-disable @next/next/no-img-element */
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MenuIcon from "@mui/icons-material/Menu";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-dark-second h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-dark-third">
        <div className="flex items-center justify-between w-full md:w-max px-4 py-2">
          {user ? (
            <>
              <div className="mr-2 hidden md:inline-block cursor-pointer">
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
                  alt="Facebook logo"
                  className="w-24 h-auto rounded-full"
                />
              </div>
              <div className="inline-block md:hidden cursor-pointer">
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
                  alt=""
                  className="w-32 h-auto"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mr-2 hidden md:inline-block cursor-pointer">
                <img
                  src="https://logos-world.net/wp-content/uploads/2020/04/Facebook-Logo.png"
                  alt="Facebook logo"
                  className="w-24 h-auto rounded-full"
                />
              </div>
              <div className="inline-block md:hidden cursor-pointer">
                <img
                  src="https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png"
                  alt=""
                  className="w-32 h-auto"
                />
              </div>
            </>
          )}

          {user && (
            <div className="flex items-center justify-between space-x-1">
              <div className="relative bg-gray-100 dark:bg-dark-third px-2 py-2 w-10 h-10 sm:w-11 sm:h-11 lg:h-10 lg:w-10 xl:w-max xl:pl-3 xl:pr-8 rounded-full flex items-center justify-center cursor-pointer">
                <i className="bx bx-search-alt-2 text-xl xl:mr-2 dark:text-dark-txt"></i>
                <input
                  type="text"
                  placeholder="Search Facebook"
                  className="outline-none bg-transparent hidden xl:inline-block"
                />
              </div>
              <div className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-dark-third rounded-full w-10 h-10 cursor-pointer hover:bg-gray-300 dark:text-dark-txt">
                <HomeIcon className="text-black" />
              </div>
              <div
                className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-dark-third rounded-full w-10 h-10 cursor-pointer hover:bg-gray-300 dark:text-dark-txt"
                id="dark-mode-toggle-mb"
              >
                <MenuIcon className="" />
              </div>
            </div>
          )}
        </div>

        <ul className="flex w-full lg:w-max items-center justify-center">
          <li className="w-1/5 md:w-max text-center">
            <div className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block text-blue-500 border-b-4 border-blue-500">
              <HomeIcon className="" />
            </div>
          </li>
          {user && (
            <>
              <li className="w-1/5 md:w-max text-center">
                <div className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative">
                  <LiveTvIcon />
                  <span className="text-xs absolute top-2 right-1/4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
                    9+
                  </span>
                </div>
              </li>
              <li className="w-1/5 md:w-max text-center">
                <div className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative">
                  <StoreIcon />
                </div>
              </li>
              <li className="w-1/5 md:w-max text-center">
                <div className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative">
                  <PeopleIcon />
                </div>
              </li>
              <li className="w-1/5 md:w-max text-center hidden md:inline-block">
                <div className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative">
                  <ViewComfyIcon />
                  <span className="text-xs absolute top-2 right-1/4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
                    9+
                  </span>
                </div>
              </li>
              <li className="w-1/5 md:w-max text-center inline-block md:hidden">
                <div className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative">
                  <ViewComfyIcon />
                </div>
              </li>
            </>
          )}
        </ul>

        <ul className="hidden md:flex mx-4 items-center justify-center">
          <li className="h-full hidden xl:flex">
            {user ? (
              <div className="cursor-pointer inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-third mx-1">
                <span className="mx-2 font-semibold dark:text-dark-txt">
                  Find Friends
                </span>
              </div>
            ) : (
              <div
                onClick={() => router.push("/auth/login")}
                className="animate-pulse cursor-pointer inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-third mx-1"
              >
                <img
                  src="https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?pid=ImgDet&rs=1"
                  alt="Profile picture"
                  className="rounded-full h-10 w-10"
                />
                <span className="mx-2 font-semibold dark:text-dark-txt">
                  Sign Up
                </span>
              </div>
            )}
          </li>
          {user && (
            <>
              <li>
                <div className="text-xl hidden xl:grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                  <AddIcon />
                </div>
              </li>
              <li>
                <div className="text-xl hidden xl:grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                  <MessageIcon />
                </div>
              </li>
              <li>
                <div className="text-xl grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
                  <NotificationsIcon />
                  <span className="animate-ping text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
                    9
                  </span>
                </div>
              </li>
              <li>
                <div
                  onClick={logout}
                  className="text-xl grid place-items-center  dark:bg-dark-third dark:text-dark-txt rounded-full p-3 cursor-pointer  relative"
                  id="dark-mode-toggle"
                >
                  <img
                    src={user?.photoURL as string}
                    alt="Profile picture"
                    className="rounded-full h-10 w-10"
                  />
                </div>
              </li>
              {/*               <li>
                <div
                  className="text-xl grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative"
                  id="dark-mode-toggle"
                >
                  <DarkModeIcon />
                </div>
              </li> */}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
