/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, getUserPost } from "../../redux/userSlice";

const ProfileTab = ({ id }) => {
  const { singleUser, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // console.log(singleUser);

  useEffect(() => {
    const userPost = async () => {
      await dispatch(getSingleUser(id));
    };
    userPost();
  }, [id]);
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center gap-x-4 mt-4">
      <div className="flex items-center w-full ">
        <div className="flex flex-col">
          <h2 className="font-bold">About Me</h2>

          <div className="flex flex-col gap-y-2">
            <p>
              Họ và tên: <span className="profileText">{singleUser?.users.name}</span>
            </p>
            <p>
              Giới tính: <span className="profileText">{singleUser?.users.gender}</span>
            </p>
            <p>
              Ngày sinh: <span className="profileText">{singleUser?.users.date}</span>
            </p>
            <p>
              Email: <span className="profileText">{singleUser?.users.email}</span>
            </p>
            <p>
              Liên lạc: <span className="profileText">{singleUser?.users.phone}</span>
            </p>
            <p>
              Địa chỉ: <span className="profileText"> {singleUser?.users.address}</span>
            </p>
            <p>
              Liên kết: {" "}
              <span>
                {singleUser?.users.links.map((item) => (
                  <a key={item.name} className="profileText">
                    {item.name}
                  </a>
                ))}
              </span>
            </p>
            <p>
              Sở thích: <span className="profileText">{singleUser?.users.favorate}</span>
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default ProfileTab;
