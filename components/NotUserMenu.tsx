/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

type RightMenuProps = {};

const RightMenu: React.FC<RightMenuProps> = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      company: faker.company.bs(),
      id: i,
    }));
    setSuggestions(suggestions);
    //console.log(suggestions);
  }, []);

  return (
    <div className="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0 overflow-scroll scrollbar-hide">
      <div className="h-full">
        <div className="flex justify-between items-center px-0 pt-4">
          <span className="font-semibold text-gray-500 text-lg dark:text-gray-300 mb-5">
            Sponsored
          </span>
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-4  dark:hover:bg-dark-third rounded-lg transition-all cursor-pointer">
            <img
              src="https://www.pngmart.com/files/22/Tesla-Logo-PNG-Isolated-File.png"
              alt="Profile picture"
              className="w-8 h-8 rounded-full"
            />
            <div className="dark:text-dark-txt">
              <span className="font-semibold">Tesla</span>
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="flex-1 space-x-2 mt-2">
            <p>
              Exclusive: Tesla to keep output at upgraded Shanghai plant below
              maximum -sources
            </p>
          </div>
          <div className="mb-8">
            <img
              className="rounded-xl"
              src="https://firebasestorage.googleapis.com/v0/b/reddit-clone-47914.appspot.com/o/posts%2FTP1vDzItHzIVvcNAbveT%2Fimage?alt=media&token=4a5525ef-d2a9-42c2-b61b-4f3bb6f98760"
            />
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-dark-third mt-6"></div>

        {/*         <div className="flex justify-between items-center px-4 pt-4 text-gray-500 dark:text-dark-txt">
          <span className="font-semibold text-lg">Contacts</span>
          <div className="flex space-x-1">
            <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-dark-third rounded-full cursor-pointer">
              <SearchIcon />
            </div>
            <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-dark-third rounded-full cursor-pointer">
              <MoreHorizIcon />
            </div>
          </div>
        </div> */}
        <ul className="p-2">
          {suggestions.map((data, index) => (
            <li key={index}>
              <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                <div className="relative">
                  <img
                    src={data.avatar}
                    alt="Friends profile picture"
                    className="rounded-full w-10 h-10 border-2 px-1 py-1 border-blue-500"
                  />
                  <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                </div>
                <div>
                  <span className="font-semibold">{data.username}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default RightMenu;
