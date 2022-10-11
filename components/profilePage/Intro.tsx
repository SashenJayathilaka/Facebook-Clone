import React from "react";
import { faker } from "@faker-js/faker";

import SuitCase from "../../icons/suitCase";
import Hat from "../../icons/hat";
import HomeAlt from "../../icons/homeAlt";
import Pin from "../../icons/pin";
import RSS from "../../icons/rss";

type IntroProps = {};

const Intro: React.FC<IntroProps> = () => {
  return (
    <div className="p-4 shadow rounded-lg bg-white w-80 dark:bg-gray-800">
      <div className="text-xl font-bold text-fBlack">Intro</div>
      <div className="mt-4 flex items-center">
        <SuitCase />
        <span className="ml-2">{faker.company.bs()}</span>
      </div>
      <div className="mt-4 flex items-center">
        <Hat />
        <span className="ml-2">{faker.company.suffixes()}</span>
      </div>
      {/*       <div className="mt-4 flex items-center">
        <Hat />
        <span className="ml-2">{faker.company.companySuffix()}</span>
      </div> */}
      <div className="mt-4 flex items-center">
        <HomeAlt />
        <span className="ml-2">
          Lives in <b>{faker.address.city()}</b>{" "}
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <Pin />
        <span className="ml-2">
          From <b>{faker.address.country()}</b>{" "}
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <RSS />
        <span className="ml-2">
          Followed by <b>{faker.random.numeric()} people</b>{" "}
        </span>
      </div>
    </div>
  );
};
export default Intro;
