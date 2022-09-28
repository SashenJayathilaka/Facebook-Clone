/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

type RightMenuProps = {};

const RightMenu: React.FC<RightMenuProps> = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(10)].map((_, i) => ({
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
        <div className="p-2">
          <div className="flex justify-center items-center space-x-4 p-2">
            <img
              src="https://images.ctfassets.net/az3stxsro5h5/73c5bmLHkMz26vb2eTT7o2/e20d81770761ac029d2abde9bdfbbab3/Jan4-How_to_Use_Facebook_Ads_Manager-Shareimages-Feature-lv"
              alt="Profile picture"
              className="w-auto h-auto rounded-md"
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
              <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third dark:text-dark-txt rounded-lg cursor-pointer">
                <div className="relative">
                  <img
                    src={data.avatar}
                    alt="Friends profile picture"
                    className="rounded-full w-8 h-8"
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
