/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/userSlice";
const color = [
  "blue",
  "gray",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "amber",
];
const randomColor = Math.floor(Math.random() * color.length);
const ProfileTab = ({ id, user }) => {
  const { singleUser, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  console.log(color[randomColor]);
  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center gap-x-4">
      <div className="flex items-center w-full ">
        <div className="flex flex-col ">
          <h2 className="font-bold">About Me</h2>

          <div>
            <p>
              Họ và tên :{" "}
              <span className={`font-medium text-teal-500`}>
                {user?.name}
              </span>
            </p>
            <p>
              Giới tính :
              <span className={`font-medium text-teal-500`}>
                {user?.gender}
              </span>
            </p>
            <p>
              Ngày sinh :
              <span className={`font-medium text-teal-500`}>
                {user?.date}
              </span>
            </p>
            <p>
              Email:{" "}
              <span className={`font-medium text-teal-500`}>
                {user?.email}
              </span>
            </p>
            <p>
              Liên lạc :{" "}
              <span className={`font-medium text-teal-500`}>
                {user?.phone}
              </span>
            </p>
            <p>
              Địa chỉ :{" "}
              <span className={`font-medium text-teal-500`}>
                {" "}
                {user?.address}
              </span>
            </p>
            <p>
              Liên kết :{" "}
              <span>
                {user?.links.map((item) => (
                  <span
                    key={item.name}
                    className={`font-medium text-teal-500`}
                  >
                    {item.name}
                  </span>
                ))}
              </span>
            </p>
            <p>
              Sở thích :{" "}
              <span className={`font-medium text-teal-500`}>
                {user?.favorate}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
