import { faker } from "@faker-js/faker";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostForm from "../PostForm";
import ProfileFeed from "./ProfileFeed";
import ProfileHeader from "./ProfileHeader";
import { auth } from "../../firebase/firebase";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const { userName } = router.query;
  const [user] = useAuthState(auth);

  const filterUserData = () => {
    try {
      userDetails.map((data) => {
        if (data.data().username === userName) {
          setUserData(data.data());

          if (data.data().username === user?.displayName) {
            setIsShow(true);
          }
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    filterUserData();
  }, [userDetails]);

  useEffect(() => {
    const suggestions = [...Array(6)].map((_, i) => ({
      avatar: faker.image.avatar(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  /* console.log(userData); */

  return (
    <div className="h-screen">
      <div className="mt-14 shadow bg-white h-screen dark:bg-[#18191a]">
        {/* PROFILE HEADER */}
        <ProfileHeader userData={userData} />
        {/* END PROFILE HEADER */}

        {/* // CONTENT */}
        <div>
          <div className="bg-gray-100 dark:bg-[#18191a]">
            <div className="flex justify-center h-auto">
              {/* LEFT */}
              <div>
                {/* // INTRO */}
                <div className="mr-12 mt-4">
                  <div
                    className="p-4 shadow rounded-lg bg-white w-80 dark:bg-gray-800"
                    id="intro"
                  >
                    <h1 className="font-bold text-xl">Intro</h1>
                  </div>
                </div>
                {/* // END INTRO */}

                {/* // PHOTOS */}
                <div className="mr-12 mt-4">
                  <div
                    className="p-4 shadow rounded-lg bg-white w-80 dark:bg-gray-800"
                    id="intro"
                  >
                    <div className="flex justify-between">
                      <h1 className="font-bold text-xl">Photos</h1>
                      <a
                        href="#"
                        className="text-lg text-blue-700 dark:text-blue-400"
                      >
                        See All Photos
                      </a>
                    </div>
                  </div>
                </div>
                {/* // END PHOTOS */}

                {/* // FRIENDS */}
                <div className="mr-12 mt-4">
                  <div
                    className="p-4 shadow rounded-lg bg-white w-80 dark:bg-gray-800"
                    id="intro"
                  >
                    {/* Header */}
                    <div className="flex justify-between">
                      <h1 className="font-bold text-xl">Friends</h1>
                    </div>
                    {/* List */}
                    <div className="">
                      <p className="text-base text-gray-400">
                        {faker.datatype.number({
                          min: 500,
                          max: 3000,
                        })}
                      </p>
                      <div className="grid grid-cols-3 gap-1">
                        {suggestions.map((data, index) => (
                          <div className="bg-white p-0.5" key={index}>
                            <img
                              src={data.avatar}
                              className="w-24 h-24 rounded-md mt-2 cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* // END FRIENDS */}
              </div>
              {/* END LEFT */}

              {/* // POST LIST */}
              <div className="w-2/5">
                {/* CREATE POST */}
                {/*  <CreatePost /> */}
                {isShow && <PostForm isShow={false} userData={userData} />}

                {/* END CREATE POST */}

                {/* POST */}
                {/* <Post /> */}
                <ProfileFeed
                  setUserDetails={setUserDetails}
                  userName={userName}
                />
                {/* END POST */}
              </div>
              {/* // END POST LIST */}
            </div>
          </div>
        </div>
        {/* // END CONTENT */}
      </div>
    </div>
  );
};
export default Profile;
