/* eslint-disable jsx-a11y/alt-text */
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cameraImage, emoji, videoImage } from "../asset/image";
import axios from "axios";
import { useRef, useState } from "react";
const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.05,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose }) => {
  const { data: session } = useSession();
  const [imagePost, setImagePost] = useState();
  const inputRef = useRef();
  const imageRef = useRef()
  const handleaddPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    try {
      await axios({
        method: "POST",
        url: "/api/post",
        data: {
          name: session.user.name,
          status: inputRef.current.value,
          email: session.user.email,
          image: session.user.image,
          postImage: imagePost,
          createAt: new Date().toString(),
        },
      });
    } catch (error) {
      console.log(error);
    }

    inputRef.current.value = "";
    removeImage();
    setModalOpen(false)
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      file.preview = URL.createObjectURL(file);

      setImagePost(file);
    }
  };
  const removeImage = () => {
    setImagePost(null);
  };
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="bg-white w-[500px] min-h-[428px] max-h-[80vh] rounded-md relative flex flex-col">
          <div className="text-center p-4 border-b-2">
            <span className="font-bold text-[1.25rem]">Create Post</span>
          </div>
          <div className="p-4">
            <div className="flex gap-2 mb-4">
              <Image
                alt={session?.user.name}
                width={40}
                height={40}
                className="rounded-full"
                src={session?.user.image}
                layout="fixed"
              />
              <p className="font-medium">{session?.user.name}</p>
            </div>
            <textarea
              ref={inputRef}
              placeholder={`What's on your mind ,${session.user.name} ?`}
              rows="4"
              className="w-full focus:outline-none text-[1.5rem] font-normal"
            ></textarea>
            <div className="flex">
              {imagePost && (
                <div className="flex flex-col filter items-center hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer p-6">
                  <Image
                    className="object-contain"
                    src={imagePost.preview}
                    alt=""
                    height={120}
                    width={200}
                    layout="fixed"
                  />
                  <p
                    className="text-xs text-red-500 text-center"
                    onClick={removeImage}
                  >
                    Remove
                  </p>
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                  <Image src={videoImage} width={30} height={30} />
                  <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div className="inputIcon" onClick={() => imageRef.current.click(0)}>
                  <Image src={cameraImage} width={30} height={30} />
                  <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                  <input type="file" hidden onChange={uploadFile} ref={imageRef}/>
                </div>
                <div className="inputIcon">
                  <Image src={emoji} width={30} height={30} />
                  <p className="text-xs sm:text-sm xl:text-base">
                    Feeling/Activity
                  </p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className=" w-full text-center bg-blue-600 p-2 rounded-lg text-white font-medium"
              onClick={handleaddPost}
            >
              Post
            </button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
