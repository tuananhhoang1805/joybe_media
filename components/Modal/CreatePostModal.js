/* eslint-disable jsx-a11y/alt-text */
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";

import Backdrop from "./Backdrop";
import { cameraImage, emoji, videoImage } from "../../asset/image";

import { createPost, getFeedPosts } from "../../redux/postSlice";
import { closePost } from "../../redux/modalSlice";
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

const CreatePostModal = ({ handleClose }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [imagePost, setImagePost] = useState([]);
  const [postItems, setPostItems] = useState({
    status: "",
    images: [],
    user: {},
  });

  const imageRef = useRef();

  const handleaddPost = async (e) => {
    e.preventDefault();
    toast.loading("Loading...", { position: "bottom-right" });
    await dispatch(createPost(postItems));
    toast.dismiss();
    toast.success("Tạo bài viết thành công", { position: "bottom-right" });
    dispatch(closePost());
    await dispatch(getFeedPosts());
    await dispatch(getFeedPosts());
  };

  const handlechangePost = (e) => {
    setPostItems({
      ...postItems,
      status: e.target.value,
      user_id: session.user.id,
    });
  };
  const uploadFile = async (e) => {
    setPostItems({ ...postItems, images: [] });
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePost((prev) => [...prev, reader.result]);
          setPostItems({
            ...postItems,
            images: [...postItems.images, reader.result],
          });
        }
      };
      reader.readAsDataURL(file);
    });
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
        <div className="bg-white w-[528px] min-h-[428px] max-h-[80vh] rounded-md relative flex flex-col">
          <div className="text-center p-4 border-b-2">
            <span className="font-bold text-[1.25rem]">Tạo bài viết</span>
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
              placeholder={`What's on your mind ,${session.user.name} ?`}
              rows="4"
              className="w-full focus:outline-none text-[1.5rem] font-normal"
              onChange={handlechangePost}
            />
            <div className="flex flex-wrap">
              {imagePost.map((image, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col filter items-center hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer p-6"
                  >
                    <Image
                      className="object-contain"
                      src={image}
                      alt=""
                      height={120}
                      width={200}
                      layout="fixed"
                    />
                    <p
                      className="text-xs text-red-500 text-center"
                      onClick={() =>
                        setImagePost(imagePost.filter((_, i) => i !== idx))
                      }
                    >
                      Remove
                    </p>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                  <Image src={videoImage} width={30} height={30} />
                  <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div
                  className="inputIcon"
                  onClick={() => imageRef.current.click(0)}
                >
                  <Image src={cameraImage} width={30} height={30} />
                  <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                  <input
                    type="file"
                    multiple
                    maxLength={4}
                    hidden
                    onChange={uploadFile}
                    ref={imageRef}
                  />
                </div>
                <div className="inputIcon">
                  <Image src={emoji} width={30} height={30} />
                  <p className="text-xs sm:text-sm xl:text-base">
                    Feeling/Activity
                  </p>
                </div>
              </div>
            </div>
            {postItems.status && (
              <button
                type="submit"
                className=" w-full text-center bg-blue-600 p-2 rounded-lg text-white font-medium"
                onClick={handleaddPost}
              >
                <div>Tạo</div>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};
export default CreatePostModal;
