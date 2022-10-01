/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { faker } from "@faker-js/faker";

type RoomProps = {};

const Room: React.FC<RoomProps> = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(9)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.name.firstName(),
      avatar: faker.image.avatar(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);
  return (
    <div className="p-4 mt-4 shadow rounded-lg bg-white dark:bg-[#28282B] overflow-hidden">
      <div className="flex space-x-4 relative">
        <div className="w-1/2 lg:w-3/12 flex space-x-2 items-center justify-center border-2 border-blue-200 dark:border-blue-700 rounded-full cursor-pointer">
          <VideoCallIcon className="text-2xl text-purple-500" />
          <span className="text-sm font-semibold text-blue-500">
            Create Room
          </span>
        </div>
        {suggestions.map((data, index) => (
          <div className="relative cursor-pointer" key={index}>
            <img
              src={data.avatar}
              alt="Profile picture"
              className="rounded-full w-8 h-8"
            />
            <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-2/4 border-white border-2"></span>
          </div>
        ))}

        <div className="w-12 h-12 rounded-full hidden lg:grid place-items-center text-2xl text-gray-500 bg-white absolute right-0 top-1/2 transform -translate-y-1/2 border border-gray-200 cursor-pointer hover:bg-gray-100 shadow dark:bg-gray-700 dark:border-0 dark:text-gray-200 dark:hover:bg-gray-800">
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};
export default Room;
