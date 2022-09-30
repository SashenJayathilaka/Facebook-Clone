/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import PostModel from "./models/PostModel";

type PostFormProps = {};

const PostForm: React.FC<PostFormProps> = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div className="px-4 mt-4 shadow rounded-lg bg-white dark:bg-[#28282B]">
      <div className="p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4">
        <img
          src={user?.photoURL as string}
          alt="Profile picture"
          className="w-10 h-10 rounded-full"
        />
        <div
          onClick={handleOpen}
          className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-gray-600 dark:text-gray-300 text-gray-500 text-lg"
        >
          <span>What's on your mind, Tuat?</span>
        </div>
      </div>
      <div className="p-2 flex">
        <div
          onClick={handleOpen}
          className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-red-500"
        >
          <VideoCallIcon />
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-white">
            Live video
          </span>
        </div>
        <div
          onClick={handleOpen}
          className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800  text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500"
        >
          <PhotoLibraryIcon />
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-white">
            Photos
          </span>
        </div>
        <div
          onClick={handleOpen}
          className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-yellow-500"
        >
          <InsertEmoticonIcon />
          <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-white">
            Feeling
          </span>
        </div>
      </div>
      <PostModel setOpen={setOpen} open={open} />
    </div>
  );
};
export default PostForm;
