/* eslint-disable @next/next/no-img-element */
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import moment from "moment";

type LeftMenuProps = {};

const sideData = [
  {
    image: "https://i.postimg.cc/qq7ZhQ3t/XF4-FQcre-i.png",
    name: "Find Friends",
  },
  {
    image: "https://i.postimg.cc/5twrZXJt/mk4d-H3-FK0j-T.png",
    name: "Groups",
  },
  {
    image: "https://i.postimg.cc/HxzhkFVD/9-BDq-Qfl-Vf-XI.png",
    name: "MarketPlace",
  },
  {
    image: "https://i.postimg.cc/WzfYMrG5/A1-Hl-I2-LVo58.png",
    name: "Watch",
  },
  {
    image: "https://i.postimg.cc/63tPwB6f/AYj2837-Mmg-X.png",
    name: "Memories",
  },
  {
    image: "https://i.postimg.cc/vHNC9RXG/2u-Pl-V4o-ORj-U.png",
    name: "Saved",
  },
  {
    image: "https://i.postimg.cc/J7KfrHkD/i7hep-Q2-Oe-Zg.png",
    name: "Pages",
  },
  {
    image: "https://i.postimg.cc/Zqkg7r1g/XXwl2m1vjq-M.png",
    name: "Events",
  },
  {
    image: "https://i.postimg.cc/DyZt8frC/3d-N1-Qw-OLden.png",
    name: "Most recent",
  },
  {
    image: "https://i.postimg.cc/jSnm48kP/q-R88-GIDM38e.png",
    name: "Ads manger",
  },
];

const LeftMenu: React.FC<LeftMenuProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  /*   const [suggestions, setSuggestions] = useState<any[]>([]);

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
  }, []); */

  return (
    <div className="overflow-scroll bg-[#f7f7f7] dark:bg-[#18191a]  scrollbar-hide w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0 hover:scrollbar-thin hover:scrollbar-thumb-slate-400 hover:scrollbar-default">
      <ul className="p-4">
        <li>
          <div className="flex justify-between cursor-pointer items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-white dark:hover:bg-dark-third mb-4">
            <h1 className="text-2xl font-bold">Home</h1>
            {user && (
              <span className="font-semibold text-blue-500">Create</span>
            )}
          </div>
        </li>
        <li>
          {user ? (
            <div
              onClick={logout}
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third dark:hover:text-white cursor-pointer"
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
              className="animate-pulse flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt"
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
        {user && (
          <>
            {sideData.map((data, index) => (
              <li key={index}>
                <div className="flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                  <img
                    src={data.image}
                    alt="Profile picture"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold">{data.name}</span>
                </div>
              </li>
            ))}

            <li>
              <div className="flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third">
                <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                  <KeyboardArrowDownIcon />
                </span>
                <span className="font-semibold">See more</span>
              </div>
            </li>
            <li className="border-b border-gray-200 dark:border-dark-third mt-6"></li>
          </>
        )}
      </ul>

      {/*   {user && (
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
      )} */}
      <div className="mt-auto p-6 text-sm text-gray-500 dark:text-gray-400">
        <span>Privacy</span>
        <span>.</span>
        <span>Terms</span>
        <span>.</span>
        <span>Advertising</span>
        <span>.</span>
        <span>Cookies</span>
        <span>.</span>
        <span>Ad choices</span>
        <span>.</span>
        <span>More</span>
        <span>.</span>
        <span>Meta © {moment().format("YYYY")}</span>
      </div>
    </div>
  );
};
export default LeftMenu;
