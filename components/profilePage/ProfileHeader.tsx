import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { motion } from "framer-motion";

type ProfileHeaderProps = {
  userData: any;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData }) => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="w-full flex justify-center" style={{ height: "348px" }}>
        <div className="flex flex-col">
          <div
            className="md:relative bg-gray-100 md:rounded-bl-lg md:rounded-br-lg
                        bg-gradient-to-b from-gray-100 via-gray-100 to-gray-400"
            style={{ width: "940px", height: "348px" }}
          >
            {/* // cover photo */}
            <div className="">
              {/* profile photo */}
              {userData.profileImage ? (
                <img
                  src={userData.profileImage}
                  className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                  style={{ width: "168px", height: "168px" }}
                />
              ) : (
                <img
                  src={user?.photoURL as string}
                  className="rounded-full md:absolute top-48 inset-x-96 border-4 border-white w-40 h-40"
                  style={{ width: "168px", height: "168px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* // INFOS */}
      <div className="flex justify-center flex-col mt-5 mb-3.5">
        {userData.username ? (
          <h1 className="text-center font-bold text-3xl">
            {userData.username}
          </h1>
        ) : (
          <h1 className="text-center font-bold text-3xl">
            {user?.displayName}
          </h1>
        )}

        <a href="#" className="text-center text-blue-700 font-semibold">
          Add Bio
        </a>
        <hr className="full flex self-center w-2/3 mt-2" />
      </div>
      {/* // END INFOS */}
      {/* // TABS */}
      <div className="w-full flex justify-center">
        <div className="flex justify-between mb-2.5">
          <ul className="flex px-5 py-1.5">
            <li className="px-3 font-semibold text-gray-600 dark:text-gray-100">
              <a href="#">Posts</a>
            </li>

            <li className="px-3 font-semibold text-gray-600 dark:text-gray-100">
              <a href="#">About</a>
            </li>

            <li className="px-3 font-semibold text-gray-600 dark:text-gray-100">
              <a href="#">Friends</a>
            </li>

            <li className="px-3 font-semibold text-gray-600 dark:text-gray-100">
              <a href="#">Photos</a>
            </li>

            <li className="px-3 font-semibold text-gray-600 dark:text-gray-100">
              <a href="#">Story Archive</a>
            </li>

            <li className="px-3 font-semibold text-gray-600 dark:text-gray-100">
              <a href="#">More</a>
            </li>
          </ul>
          {userData.username === user?.displayName && (
            <ul className="flex mb:pl-14">
              <li className="px-2 font-semibold">
                <button className="bg-blue-600 px-4 py-1 rounded-lg text-white font-semibold">
                  <i className="bx bx-plus-circle text-xl mr-2"></i>
                  Add to Story
                </button>
              </li>
              <li className="px-2 font-semibold">
                <button className="bg-gray-200 px-4 py-1 rounded-lg text-black font-semibold">
                  <i className="bx bx-edit-alt mr-2 text-xl"></i>
                  Edit Profile
                </button>
              </li>
              <li className="px-2 font-semibold">
                <button className="bg-gray-200 px-3 py-1 rounded-lg text-black font-semibold">
                  ...
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* // END TABS */}
    </div>
  );
};
export default ProfileHeader;
