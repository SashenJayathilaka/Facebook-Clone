import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoopIcon from "@mui/icons-material/Loop";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PublicIcon from "@mui/icons-material/Public";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/firebase";
import useSelectFile from "../../hooks/useSelectFile";
import PhotoModel from "./PhotoModel";
import { motion } from "framer-motion";

type Props = {
  setOpen: any;
  open: any;
};

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function PostModel({ setOpen, open }: Props) {
  const [user] = useAuthState(auth);
  const handleClose = () => setOpen(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const { selectedFile, setSelectedFile, onSelectedFile } = useSelectFile();
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCommunity = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        userId: user?.uid,
        username: user?.displayName,
        caption: caption,
        profileImage: user?.photoURL,
        company: user?.email,
        timestamp: serverTimestamp() as Timestamp,
      });

      if (selectedFile) {
        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile as string, "data_url").then(
          async (snapshot) => {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "posts", docRef.id), {
              image: downloadUrl,
            });
          }
        );
      } else {
        console.log("No Image");
      }
    } catch (error) {
      console.log(error);
    }
    setSelectedFile("");
    setCaption("");
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md dark:bg-[#18191a]">
          <div className="flex justify-between">
            <button
              className="text-sm font-medium text-blue-500 dark:text-blue-300"
              onClick={handleClose}
            >
              Cancel
            </button>

            <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-300">
              Create Post
            </h1>
            <IconButton>
              <MoreHorizIcon className="dark:text-gray-300" />
            </IconButton>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>

          <div className="m-5">
            <div className="flex justify-start text-center">
              <Avatar
                alt={user?.displayName as string}
                src={user?.photoURL as string}
              />
              <h1 className="ml-2 text-center text-black font-bold dark:text-gray-200">
                {user?.displayName}
              </h1>
              <div className="absolute top-24 left-20 mt-2 mb-2">
                <button className="rounded-md flex font-semibold border border-gray-500 px-4 text-sm">
                  <PublicIcon style={{ fontSize: "20px" }} /> Anyone
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 mb-3"></div>

          <Typography className="flex justify-center m-5 ">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={6}
              cols={60}
              placeholder="What's on your mind?"
              className="outline-none placeholder:text-xl dark:bg-[#18191a]"
            />
          </Typography>

          <div className="flex justify-between border border-gray-600 rounded-md">
            <div className="text-start mt-auto mb-auto ml-5 font-semibold text-xl">
              <h1>Add to yor post</h1>
            </div>
            <motion.div className="m-3 flex">
              <motion.nav
                animate={secondOpen ? true : false}
                variants={variants}
              >
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 1.5 }}
                >
                  <IconButton onClick={() => setSecondOpen(true)}>
                    <AddPhotoAlternateIcon className="text-green-500  text-3xl hover:bg-green-200 dark:hover:bg-gray-800 rounded-full" />
                  </IconButton>
                </motion.div>
              </motion.nav>

              <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 1.5 }}>
                <IconButton onClick={() => setSecondOpen(true)}>
                  <VideoCallIcon className="text-purple-500 text-3xl hover:bg-green-200 dark:hover:bg-gray-800 rounded-full" />
                </IconButton>
              </motion.div>

              <IconButton>
                <PersonAddIcon className="text-blue-500  text-3xl hover:bg-red-200 dark:hover:bg-gray-800 rounded-full" />
              </IconButton>
              <IconButton>
                <SentimentVerySatisfiedIcon className="text-yellow-600 text-3xl hover:bg-red-200 dark:hover:bg-gray-800 rounded-full" />
              </IconButton>
              <IconButton>
                <LocationOnIcon className="text-red-500  text-3xl hover:bg-red-200 dark:hover:bg-gray-800 rounded-full" />
              </IconButton>
              <IconButton>
                <MoreHorizIcon className="text-gray-500 text-2xl hover:bg-red-200 dark:hover:bg-gray-800 dark:text-gray-200 rounded-full" />
              </IconButton>
            </motion.div>
          </div>
          <div className="flex justify-end mt-5 cursor-pointer">
            {loading ? (
              <button className="bg-blue-500 font-semibold animate-pulse cursor-not-allowed text-white rounded-xl text-md border border-blue-500 px-8 hover:bg-blue-300">
                <LoopIcon className="animate-spin" />
              </button>
            ) : (
              <button
                className={
                  selectedFile || caption
                    ? `bg-blue-500 font-semibold cursor-pointer text-white rounded-xl text-md border border-blue-500 px-8 hover:bg-blue-300`
                    : `bg-blue-500 font-semibold cursor-not-allowed text-white rounded-xl text-md border border-blue-500 px-8 hover:bg-blue-300`
                }
                onClick={handleCreateCommunity}
              >
                POST
              </button>
            )}
          </div>
        </Box>
      </Modal>
      <PhotoModel
        secondOpen={secondOpen}
        setSecondOpen={setSecondOpen}
        onSelectedFile={onSelectedFile}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </div>
  );
}
