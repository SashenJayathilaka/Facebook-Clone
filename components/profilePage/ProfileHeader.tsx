import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase/firebase";
import DownArrow from "../../icons/downArrow";
import Phone from "../../icons/phone";
import Friend from "../../icons/friend";
import More from "../../icons/more";

type ProfileHeaderProps = {
  userData: any;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="px-44 shadow">
      <div className="relative h-96 rounded-b flex justify-center">
        <img
          src="https://source.unsplash.com/1600x900/?nature,photography,technology"
          className="object-cover w-full h-full rounded-b"
          alt="cover"
        />
        <div className="absolute -bottom-6">
          {userData.profileImage ? (
            <img
              src={userData.profileImage}
              className="object-cover border-4 border-white w-40 h-40 rounded-full"
              alt="cover"
            />
          ) : (
            <img
              src={user?.photoURL as string}
              className="object-cover border-4 border-white w-40 h-40 rounded-full"
              alt="cover"
            />
          )}
        </div>
      </div>
      {userData.username ? (
        <div className="text-center mt-6 text-3xl font-bold text-fBlack">
          {userData.username}
        </div>
      ) : (
        <div className="text-center mt-6 text-3xl font-bold text-fBlack">
          {user?.displayName}
        </div>
      )}

      <div className="border border-fGrey mt-6 border-opacity-10" />
      <div className="flex justify-between px-8">
        <div className="flex items-center">
          <div className="px-4 py-5 text-fBlue border-b-4 border-fBlue cursor-pointer">
            Posts
          </div>
          <div className="px-4 py-5 text-fGrey cursor-pointer">Friends</div>
          <div className="px-4 py-5 text-fGrey cursor-pointer">Photos</div>
          <div className="px-4 py-5 text-fGrey cursor-pointer">Videos</div>
          <div className="px-4 py-5 text-fGrey cursor-pointer">Check-Ins</div>
          <div className="px-4 flex items-center py-5 text-fGrey cursor-pointer">
            More
            <span className="ml-1">
              <DownArrow />
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-12 h-9 bg-fButton rounded flex items-center justify-center focus:outline-none bg-gray-300">
            <Phone />
          </button>
          <button className="w-12 h-9 bg-fButton rounded flex items-center justify-center focus:outline-none bg-gray-300">
            <Friend />
          </button>
          <button className="w-12 h-9 bg-fButton rounded flex items-center justify-center focus:outline-none bg-gray-100">
            <More />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
