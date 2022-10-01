import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

type Props = {
  secondOpen: any;
  setSecondOpen: any;
  onSelectedFile: any;
  selectedFile: any;
  setSelectedFile: any;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function PhotoModel({
  secondOpen,
  setSecondOpen,
  onSelectedFile,
  selectedFile,
  setSelectedFile,
}: Props) {
  const handleOpen = () => setSecondOpen(true);
  const handleClose = () => setSecondOpen(false);
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Modal
        open={secondOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-md dark:bg-[#18191a]">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="flex justify-center text-xl"
          >
            Edit your photo
          </Typography>
          {selectedFile ? (
            <>
              <div className="flex justify-center mr-auto ml-auto mt-5">
                <img src={selectedFile} alt="" className="max-w-xs max-h-60" />
              </div>
              <div className="flex justify-center mr-auto ml-auto mt-2 mb-2">
                <button
                  className="bg-transparent  rounded-xl text-md border border-red-500 px-5 hover:bg-red-300 dark:hover:bg-red-800"
                  onClick={() => setSelectedFile("")}
                >
                  Remove
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center mr-auto ml-auto mt-8 mb-6">
              <button
                className="bg-transparent font-semibold rounded-xl text-md border border-blue-500 px-5 hover:bg-blue-300 dark:hover:bg-blue-800"
                onClick={() => selectedFileRef.current?.click()}
              >
                Select images to share
              </button>
              <input
                ref={selectedFileRef}
                type="file"
                hidden
                onChange={onSelectedFile}
              />
            </div>
          )}
          <hr />
          <div className="flex justify-end mt-4 gap-5">
            {selectedFile ? (
              <button
                onClick={handleClose}
                className="bg-blue-500 font-semibold text-white rounded-xl text-md border border-blue-500 px-8 hover:bg-blue-300 dark:hover:bg-blue-800"
              >
                Done
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="bg-transparent font-semibold rounded-xl text-md border border-blue-500 px-5 hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                back to post
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
