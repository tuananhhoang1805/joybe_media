/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "./Backdrop";
import { getFeedPosts, getSinglePost, updatePost } from "../../redux/postSlice";
import { closeEditProfile, closePost } from "../../redux/modalSlice";
import toast from "react-hot-toast";
import { getSingleUser, updateUser } from "../../redux/userSlice";

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
  const { singleUser, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const initial = {
    gender: "",
    birthday: "",
    mobile: "",
    address: "",
    favorate: "",
    links: [],
  };

  const [value, setValue] = useState(initial);
  console.log(value);
  useEffect(() => {
    const userPost = async () => {
      await dispatch(getSingleUser(session?.user?.id));
    };
    userPost();
  }, [session?.user?.id]);

  useEffect(() => {
    setValue(singleUser?.users);
  }, []);
  const handleEditProfile = async (e) => {
    e.preventDefault();

    await dispatch(updateUser({ id: session?.user?.id, data: value }));

    await dispatch(closeEditProfile());

    setValue({
      gender: "",
      birthday: "",
      mobile: "",
      address: "",
      favorate: "",
      links: [],
    });
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
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
            <span className="font-bold text-[1.25rem]">
              Chỉnh sửa thông tin
            </span>

            <div className="absolute top-[10px] right-[10px]">
              <p
                onClick={() => dispatch(closeEditProfile())}
                className="cursor-pointer"
              >
                X
              </p>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center">
              <label>Giới tính : </label>
              <input
                type="text"
                className="inputEditProfile"
                placeholder=""
                value={value.gender}
                onChange={(e) => setValue({ ...value, gender: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <label>Ngày sinh : </label>
              <input
                type="date"
                className="inputEditProfile"
                placeholder=""
                value={value.birthday}
                onChange={(e) =>
                  setValue({ ...value, birthday: e.target.value })
                }
              />
            </div>
            <div className="flex items-center">
              <label>Liên lạc : </label>
              <input
                type="text"
                className="inputEditProfile"
                placeholder=""
                value={value.mobile}
                onChange={(e) => setValue({ ...value, mobile: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex items-center">
              <label>Địa chỉ </label>
              <input
                type="text"
                className="inputEditProfile"
                placeholder=""
                value={value.address}
                onChange={(e) =>
                  setValue({ ...value, address: e.target.value })
                }
              />
            </div>
            <div className="flex items-center">
              <label>Link : </label>
              <input
                type="text"
                className="inputEditProfile"
                placeholder=""
                value={value.links}
                onChange={(e) => setValue({ ...value, links: e.target.value })}
              />
            </div>
            <div className="flex items-center">
              <label>Sở thích : </label>
              <input
                type="text"
                className="inputEditProfile"
                placeholder=""
                value={value.favorate}
                onChange={(e) =>
                  setValue({ ...value, favorate: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className=" w-full text-center bg-blue-600 p-2 text-white font-medium"
            onClick={handleEditProfile}
          >
            <div>Lưu</div>
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
};
export default EditProfileModal;
