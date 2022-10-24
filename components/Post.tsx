/* eslint-disable @next/next/no-img-element */
import { faker } from "@faker-js/faker";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoopIcon from "@mui/icons-material/Loop";
import { shuffle } from "lodash";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase/firebase";

const reactionImages = [
  "https://i.postimg.cc/wT6gNPFw/pngwing-com-1.png",
  "https://i.postimg.cc/4xW7jWYM/haha.png",
  "https://i.postimg.cc/d1K918vT/Nice-Png-waluigi-face-png-7760819.png",
  "https://i.postimg.cc/9FSg2w4y/pngwing-com-2.png",
];

const seconReactionImage = [
  "https://i.postimg.cc/L89gyc8L/heart.png",
  "https://i.postimg.cc/ZRMKHLRW/vmvngm34iua51.webp",
];

type PostProps = {
  author: any;
  caption: any;
  image: any;
  profileImage: any;
  timestamp: any;
  id: any;
  isClicked?: boolean;
};

const Post: React.FC<PostProps> = ({
  author,
  caption,
  image,
  profileImage,
  timestamp,
  id,
  isClicked,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);
  const [likeName, setLikeName] = useState<any[]>([]);
  const [reactions, setReactions] = useState<any>("");
  const [secondReactions, setSecondReactions] = useState<any>("");

  /*   console.log(
    likes.map((like) => like.data().username),
    "💖💖"
  ); */

  const getLikeName = () => {
    if (hasLikes) {
      setLikeName(likes.map((like) => like.data().username));
    } else return;
  };

  const sendComment = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(firestore, "posts", id, "comments"), {
        comment: comment,
        username: user?.displayName,
        userImage: user?.photoURL,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setComment("");
    setLoading(false);
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(firestore, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [firestore, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(firestore, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [firestore, id]
  );

  useEffect(
    () => setHasLikes(likes.findIndex((like) => like.id === user?.uid) !== -1),
    [likes]
  );

  useEffect(() => {
    getLikeName();
  }, [likes, firestore, hasLikes]);

  useEffect(() => {
    setReactions(shuffle(reactionImages).pop());
    setSecondReactions(shuffle(seconReactionImage).pop());
  }, [likes]);

  const likePost = async () => {
    try {
      if (hasLikes) {
        await deleteDoc(doc(firestore, "posts", id, "likes", user?.uid!));
      } else {
        await setDoc(doc(firestore, "posts", id, "likes", user?.uid!), {
          username: user?.displayName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = () => {
    if (isClicked) {
      router.push({
        pathname: `profile/${id}`,
        query: {
          /*  userId: user?.uid, */
          userName: author.toString(),
        },
      });
    }
  };

  return (
    <div className="shadow bg-white  dark:text-white mt-4 rounded-lg dark:shadow-2xl dark:bg-[#28282B]">
      {/* <!-- POST AUTHOR --> */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <img
              onClick={handleChangePage}
              src={profileImage}
              alt="Profile picture"
              className={
                isClicked
                  ? `w-10 h-10 rounded-full cursor-pointer`
                  : `w-10 h-10 rounded-full`
              }
            />
            <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
          </div>
          <div>
            <div
              className={
                isClicked ? `font-semibold cursor-pointer` : `font-semibold`
              }
              onClick={handleChangePage}
            >
              {author}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {moment(new Date(timestamp?.seconds * 1000)).fromNow()}
            </span>
          </div>
        </div>
        <div className="w-8 h-8 grid place-items-center text-xl text-gray-500 hover:bg-gray-200 dark:text-dark-txt dark:hover:bg-dark-third rounded-full cursor-pointer">
          <i className="bx bx-dots-horizontal-rounded"></i>
        </div>
      </div>
      {/* <!-- END POST AUTHOR --> */}

      {/*  <!-- POST CONTENT --> */}
      {caption && <div className="text-justify px-4 py-2">{caption}</div>}
      {/* <!-- END POST CONTENT --> */}

      {/* <!-- POST IMAGE --> */}
      {image && (
        <div className="flex justify-center py-2 m-auto">
          <img src={image} alt="Post image" />
        </div>
      )}
      {/*  <!-- END POST IMAGE --> */}

      {/* <!-- POST REACT --> */}
      <div className="px-4 py-2">
        <div
          className={
            likes.length >= 1
              ? `flex items-center justify-between`
              : `flex items-center justify-end`
          }
        >
          {likes.length >= 1 && (
            <div className="flex flex-row-reverse items-center">
              {user ? (
                <>
                  {hasLikes ? (
                    <>
                      {likes.length >= 3 ? (
                        <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                          {"You, "}
                          {likeName.slice(0, 1)} {"and"} {likes.length - 2}{" "}
                          {"others"}
                        </span>
                      ) : (
                        <>
                          {likes.length >= 2 ? (
                            <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                              {"You, "}
                              {likeName.slice(0, 1)}
                            </span>
                          ) : (
                            <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                              {likeName.slice(0, 1)}
                            </span>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {likes.length >= 3 ? (
                        <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                          {likeName.slice(0, 1)} {"and"} {likes.length - 1}{" "}
                          {"others"}
                        </span>
                      ) : (
                        <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                          {likes.length}
                        </span>
                      )}
                    </>
                  )}
                </>
              ) : (
                <span className="ml-2 text-gray-500 dark:text-gray-300 text-sm">
                  {likes.length}
                </span>
              )}

              {likes.length >= 3 && (
                <span className="rounded-full grid place-items-center text-2xl -ml-1 text-yellow-600">
                  <img src={reactions} alt="like/button" className="w-5 h-5" />
                </span>
              )}

              {likes.length >= 2 && (
                <span className="rounded-full grid place-items-center text-2xl -ml-1 text-red-500">
                  <img
                    src={secondReactions}
                    alt="like/button"
                    className="w-5 h-5"
                  />
                </span>
              )}

              <span className="rounded-full grid place-items-center text-2xl -ml-1 text-blue-500">
                <img
                  src="https://i.postimg.cc/bNH29ypq/like.png"
                  alt="like/button"
                  className="w-5 h-5"
                />
              </span>
            </div>
          )}

          {comments.length >= 1 && (
            <div className="text-gray-500 dark:text-gray-300">
              <span className="mr-2">{comments.length} comments</span>
              <span>{faker.random.numeric()} Share</span>
            </div>
          )}
        </div>
      </div>
      {/* <!-- END POST REACT --> */}

      {/* <!-- POST ACTION --> */}

      <div className="py-2 px-4">
        {user && (
          <div className="border border-gray-200 dark:border-gray-900 border-l-0 border-r-0 py-1">
            <div className="flex space-x-2">
              {hasLikes ? (
                <motion.div
                  className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800  text-xl py-2 rounded-lg cursor-pointer text-blue-500"
                  onClick={likePost}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                  </svg>

                  <span className="text-sm font-semibold">Like</span>
                </motion.div>
              ) : (
                <motion.div
                  className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300"
                  onClick={likePost}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                  </svg>

                  <span className="text-sm font-semibold">Like</span>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={
                  open
                    ? `w-1/3 flex space-x-2 justify-center items-center bg-gray-100 dark:bg-gray-800  dark:hover:bg-gray-800  text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200`
                    : `w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200`
                }
                onClick={open ? () => setOpen(false) : () => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>

                <span className="text-sm font-semibold">Comment</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                  />
                </svg>

                <span className="text-sm font-semibold">Share</span>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      {/*  <!-- END POST ACTION --> */}

      {/* <!-- LIST COMMENT --> */}
      {open && (
        <>
          {user && (
            <>
              <div className="py-2 px-4  h-36 overflow-y-scroll scrollbar-thin scrollbar-thumb-black">
                {/* <!-- COMMENT --> */}

                {comments.map((data) => (
                  <>
                    <div className="flex space-x-2">
                      <img
                        src={data.data().userImage}
                        alt="Profile picture"
                        className="w-9 h-9 rounded-full"
                      />
                      <div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl text-sm">
                          <span className="font-semibold block">
                            {data.data().username}
                          </span>
                          <span>{data.data().comment}</span>
                        </div>
                        <div className="p-2 text-xs text-gray-500 dark:text-gray-300">
                          {moment(
                            new Date(data.data().timestamp?.seconds * 1000)
                          ).fromNow()}
                        </div>
                        {/*  <!-- COMMENT --> */}
                        {/* <!-- END COMMENT --> */}
                      </div>
                    </div>
                    {/*   <!-- END COMMENT --> */}
                  </>
                ))}
              </div>
              {/* <!-- END LIST COMMENT --> */}
              {/* <!-- COMMENT FORM --> */}
              <div className="py-2 px-4">
                <div className="flex space-x-2">
                  <img
                    src={user?.photoURL as string}
                    alt="Profile picture"
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="flex-1 flex bg-gray-100 dark:bg-gray-600 rounded-full items-center justify-between px-3">
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Write a comment..."
                      className="outline-none bg-transparent flex-1 dark:placeholder:text-gray-300"
                    />
                    {loading ? (
                      <LoopIcon className="animate-spin text-blue-500 dark:text-blue-300 cursor-not-allowed mr-5" />
                    ) : (
                      <button
                        type="submit"
                        disabled={!comment}
                        onClick={sendComment}
                        className="font-semibold text-blue-400 mr-5 dark:text-blue-200"
                      >
                        Post
                      </button>
                    )}

                    <div className="flex space-x-0 items-center justify-center">
                      <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 text-xl">
                        <EmojiEmotionsIcon />
                      </span>
                      <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 text-xl">
                        <CameraAltIcon />
                      </span>
                      <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:bg-gray-800 text-xl">
                        <FavoriteIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* <!-- END COMMENT FORM --> */}
    </div>
  );
};
export default Post;
