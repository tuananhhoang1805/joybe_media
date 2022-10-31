import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import User from "../../models/userModel";
import dbconnect from "../../utils/mongose";

import Layout from "../../components/Layout";
import PostTab from "../../components/Tab/PostTab";
import ProfileTab from "../../components/Tab/ProfileTab";
import ConnetionTab from "../../components/Tab/ConnetionTab";
import { closeEditProfile, openEditProfile } from "../../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "../../components/Modal/EditProfileModal";

export async function getServerSideProps({ params }) {
  const { id } = params;

  await dbconnect();

  const user = await User.findById(id).populate("followers following");

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
const UserPorfile = ({ user }) => {
  const buttonTabs = [
    "Bài Viết",
    "Giới Thiệu",
    "Connection",
    "Ảnh",
    "Video",
    "Check In",
  ];
  const [active, setActive] = useState(buttonTabs[0]);
  const dispatch = useDispatch();
  const { openModalProfile } = useSelector((state) => state.modal);

  const { data: session } = useSession();

  useEffect(() => {
    openModalProfile
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [openModalProfile]);

  const openEdit = () => {
    window.scrollTo(0, 0);
    dispatch(openEditProfile())
  }
  return (
    <div className="bg-slate-100 min-h-screen">
      <Layout title={`${user.name} - Joybe`}>
        <div className="flex mt-20 py-8 mx-auto md:gap-4 w-[80%]">
          <div className="flex min-h-screen flex-col w-[100%] md:w-[60%]">
            <div className="relative bg-white h-[600px] flex flex-col rounded-md shadow-md">
              <div className=" relative bg-gradient-to-r from-sky-500 to-indigo-500 h-1/2 rounded-t-md"></div>
              <div className="relative flex justify-center pb-8 border-b-2 p-8">
                <div className="relative max-w-[1024px] px-4">
                  <div className="flex flex-col justify-center items-center">
                    <div className="mt-[-84px]">
                      <Image
                        src={user.image}
                        width={168}
                        height={168}
                        alt={user.name}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex px-4 pb-4 flex-col justify-center items-center">
                      <div>
                        <h1 className="font-bold text-[2rem]">{user.name}</h1>
                      </div>
                      <div>
                        <h1 className="font-medium text-[14px] text-[#666]">
                          {user.followers.length} followers
                        </h1>
                      </div>
                    </div>

                    {user._id === session?.user?.id && (
                      <div className="flex">
                        <button onClick={openEdit}>
                          Chỉnh sửa trang cá nhân
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-x-2">
                {buttonTabs.map((tab, idx) => {
                  return (
                    <div key={idx} className="flex">
                      <h1
                        onClick={() => setActive(tab)}
                        className={`font-medium cursor-pointer p-1 sm:p-2 md:p-4 smrounded-md  ${
                          active === tab
                            ? "border-b-4 border-blue-700"
                            : "hover:bg-slate-400 "
                        }`}
                      >
                        {tab}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>

            {active === "Bài Viết" && <PostTab id={user._id} user={user} />}
            {active === "Giới Thiệu" && (
              <ProfileTab id={user._id} user={user} />
            )}
            {active === "Connection" && (
              <ConnetionTab id={user._id} user={user} />
            )}
            {/* {active === "Ảnh" && <PostTab id={user._id} />}
          {active === "Video" && <PostTab id={user._id} />}
          {active === "Check In" && <PostTab id={user._id} />} */}
          </div>
          <div className="min-h-screen bg-white w-[40%] flex-col hidden md:flex"></div>
        </div>

        {openModalProfile && <EditProfileModal handleClose={() => dispatch(closeEditProfile())}/>}
      </Layout>
    </div>
  );
};

export default UserPorfile;
