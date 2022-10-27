import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/userSlice";

const ProfileTab = ({ id }) => {
  const { singleUser, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const userPost = async () => {
      await dispatch(getUserPost(id));
    };
    userPost();
  }, [dispatch, id]);

  console.log(singleUser);
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center gap-x-4">
      <div className="flex items-center w-full ">
        <div className="flex flex-col">
          <h2 className="font-bold">About Me</h2>

          <div>
            <p>
              Họ và tên : <span>{singleUser.name}</span>
            </p>
            <p>
              Họ và tên : <span></span>
            </p>
            <p>
              Họ và tên : <span></span>
            </p>
            <p>
              Họ và tên : <span></span>
            </p>
            <p>
              Họ và tên : <span></span>
            </p>
            <p>
              Họ và tên : <span></span>
            </p>
            <p>
              Họ và tên : <span></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
