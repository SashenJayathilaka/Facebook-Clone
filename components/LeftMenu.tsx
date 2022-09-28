/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";

type LeftMenuProps = {};

const LeftMenu: React.FC<LeftMenuProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(4)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      image: faker.image.image(),
      name: faker.company.bs(),
      city: faker.image.city(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);

  return (
    <div className="overflow-scroll scrollbar-hide w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0">
      <ul className="p-4">
        <li>
          {user ? (
            <div
              onClick={logout}
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third cursor-pointer"
            >
              <img
                src={user?.photoURL as string}
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{user?.displayName}</span>
            </div>
          ) : (
            <div
              className="animate-pulse flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
              onClick={() => router.push("/auth/login")}
            >
              <img
                src="https://th.bing.com/th/id/OIP.Cl56H6WgxJ8npVqyhefTdQHaHa?pid=ImgDet&rs=1"
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">Sign Up</span>
            </div>
          )}
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
          >
            <img
              src="https://i.postimg.cc/4xL89ztR/friends.png"
              alt="Profile picture"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Friends</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
          >
            <img
              src="https://i.postimg.cc/26vTMMtC/page.png"
              alt="Profile picture"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Pages</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
          >
            <img
              src="https://i.postimg.cc/LsGNy2Ny/memory.png"
              alt="Profile picture"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Memories</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
          >
            <img
              src="https://i.postimg.cc/Vv8484yn/group.png"
              alt="Profile picture"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">Groups</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
          >
            <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
              <KeyboardArrowDownIcon />
            </span>
            <span className="font-semibold">See more</span>
          </a>
        </li>
        <li className="border-b border-gray-200 dark:border-dark-third mt-6"></li>
      </ul>
      {user && (
        <>
          <div className="flex justify-between items-center px-4 h-4 group">
            <span className="font-semibold text-gray-500 text-lg dark:text-dark-txt">
              Your shortcuts
            </span>
            <span className="text-blue-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-third p-2 rounded-md group-hover:inline-block">
              Edit
            </span>
          </div>

          <ul className="p-4">
            {suggestions.map((data, index) => (
              <li key={index}>
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-10 h-10 rounded-lg"
                  />
                  <span className="font-semibold">{data.name}</span>
                </div>
              </li>
            ))}

            <li>
              <a
                href="#"
                className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
              >
                <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                  <KeyboardArrowDownIcon />
                </span>
                <span className="font-semibold">See more</span>
              </a>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
export default LeftMenu;
