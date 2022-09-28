/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import ReplyIcon from "@mui/icons-material/Reply";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { faker } from "@faker-js/faker";
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
import LoopIcon from "@mui/icons-material/Loop";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

type PostProps = {
  author: any;
  caption: any;
  image: any;
  profileImage: any;
  timestamp: any;
  id: any;
};

const Post: React.FC<PostProps> = ({
  author,
  caption,
  image,
  profileImage,
  timestamp,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState<any[]>([]);
  const [hasLikes, setHasLikes] = useState(false);

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

  return (
    <div className="shadow bg-white dark:bg-dark-second dark:text-dark-txt mt-4 rounded-lg">
      {/* <!-- POST AUTHOR --> */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile picture"
              className="w-10 h-10 rounded-full"
            />
            <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
          </div>
          <div>
            <div className="font-semibold">{author}</div>
            <span className="text-sm text-gray-500">
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
      <div className="text-justify px-4 py-2">{caption}</div>
      {/* <!-- END POST CONTENT --> */}

      {/* <!-- POST IMAGE --> */}
      <div className="flex justify-center py-2 m-auto">
        <img src={image} alt="Post image" />
      </div>
      {/*  <!-- END POST IMAGE --> */}

      {/* <!-- POST REACT --> */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-row-reverse items-center">
            <span className="ml-2 text-gray-500 dark:text-dark-txt">
              {likes.length}
            </span>
            <span className="rounded-full grid place-items-center text-2xl -ml-2 text-yellow-600">
              <EmojiEmotionsIcon />
            </span>
            <span className="rounded-full grid place-items-center text-2xl -ml-2 text-red-500">
              <FavoriteIcon />
            </span>
            <span className="rounded-full grid place-items-center text-2xl -ml-2 text-blue-500">
              <ThumbUpIcon />
            </span>
          </div>
          <div className="text-gray-500 dark:text-dark-txt">
            <span className="mr-2">{comments.length} comments</span>
            <span> {faker.random.numeric()} Share</span>
          </div>
        </div>
      </div>
      {/* <!-- END POST REACT --> */}

      {/* <!-- POST ACTION --> */}
      <div className="py-2 px-4">
        {user && (
          <div className="border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-1">
            <div className="flex space-x-2">
              {hasLikes ? (
                <div
                  className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-blue-500 dark:text-dark-txt"
                  onClick={likePost}
                >
                  <ThumbUpIcon />
                  <span className="text-sm font-semibold">Like</span>
                </div>
              ) : (
                <div
                  className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
                  onClick={likePost}
                >
                  <ThumbUpOutlinedIcon />
                  <span className="text-sm font-semibold">Like</span>
                </div>
              )}

              <div
                className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
                onClick={open ? () => setOpen(false) : () => setOpen(true)}
              >
                <InsertCommentIcon />
                <span className="text-sm font-semibold">Comment</span>
              </div>
              <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                <ReplyIcon />
                <span className="text-sm font-semibold">Share</span>
              </div>
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
                        <div className="bg-gray-100 dark:bg-dark-third p-2 rounded-2xl text-sm">
                          <span className="font-semibold block">
                            {data.data().username}
                          </span>
                          <span>{data.data().comment}</span>
                        </div>
                        <div className="p-2 text-xs text-gray-500 dark:text-dark-txt">
                          {moment(
                            new Date(timestamp?.seconds * 1000)
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
                  <div className="flex-1 flex bg-gray-100 dark:bg-dark-third rounded-full items-center justify-between px-3">
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Write a comment..."
                      className="outline-none bg-transparent flex-1"
                    />
                    {loading ? (
                      <LoopIcon className="animate-spin text-blue-500 cursor-not-allowed mr-5" />
                    ) : (
                      <button
                        type="submit"
                        disabled={!comment}
                        onClick={sendComment}
                        className="font-semibold text-blue-400 mr-5"
                      >
                        Post
                      </button>
                    )}

                    <div className="flex space-x-0 items-center justify-center">
                      <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
                        <EmojiEmotionsIcon />
                      </span>
                      <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
                        <CameraAltIcon />
                      </span>
                      <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-dark-txt dark:hover:bg-dark-second text-xl">
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
