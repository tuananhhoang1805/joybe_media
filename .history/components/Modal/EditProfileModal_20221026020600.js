/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "./Backdrop";
import { getFeedPosts, getSinglePost, updatePost } from "../../redux/postSlice";
import { closePost } from "../../redux/modalSlice";
import toast from "react-hot-toast";

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

const EditProfileModal = ({ handleClose }) => {
  const { data: session } = useSession();
//   const { isLoading, postId, message } = useSelector((state) => state.posts);


  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    dispatch(getSinglePost(postId));
    inputRef.current.focus();
  }, []);
  const [editValue, setEditValue] = useState("");
  const handleUpdatePost = async (e) => {
    e.preventDefault();

    await dispatch(updatePost({ id: postId, status: editValue }));
    toast.success("Chỉnh sửa bài viết thành công", { position: "bottom-right" });
    await dispatch(getFeedPosts());
    await dispatch(closePost());
  };

  const handleEditPost = (e) => {
    setEditValue(e.target.value);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
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
            <span className="font-bold text-[1.25rem]">Chỉnh sửa thông tin</span>
          </div>
          {/* <div className="p-4">
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
              Lưu
            </button>
          </div> */}
        </div>
      </motion.div>
    </Backdrop>
  );
};
export default EditProfileModal;
