/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cameraImage, emoji, videoImage } from "../../asset/image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  createPost,
  getFeedPosts,
  getSinglePost,
  updatePost,
} from "../../redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
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

const EditPostModel = ({ handleClose, setModalOpen }) => {
  const { data: session } = useSession();
  const { singlePost, isLoading, isError, postId } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getSinglePost(postId));
    inputRef.current.focus();
  }, []);
  console.log(singlePost);
  console.log(postId);
  const [editValue, setEditValue] = useState("");
  // useEffect(() => {
  //   dispatch(getSinglePost())
  // },[])
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    await dispatch(updatePost({ id: postId, status: editValue }));
    await dispatch(getFeedPosts());
    setModalOpen(false);
  };

  const handleEditPost = (e) => {
    setEditValue(e.target.value);
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
        <div className="bg-white w-[500px] min-h-[328px] max-h-[80vh] rounded-md relative flex flex-col">
          <div className="text-center p-4 border-b-2">
            <span className="font-bold text-[1.25rem]">Edit Post</span>
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
              placeholder={`What's on your change,${session.user.name} ?`}
              rows="4"
              className="w-full focus:outline-none text-[1.5rem] font-normal"
              onChange={handleEditPost}
            />
            
            <button
              type="submit"
              className=" w-full text-center bg-blue-600 p-2 rounded-lg text-white font-medium"
              onClick={handleUpdatePost}
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};
export default EditPostModel;
