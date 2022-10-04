import React, { useState } from "react";
import User from "../../models/userModel";
import dbconnect from "../../utils/mongose";
import Head from "next/head";
import Layout from "../../components/Layout";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PostTab from "../../components/Tab/PostTab";
import ProfileTab from "../../components/Tab/ProfileTab";
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
    "Follwers",
    "Ảnh",
    "Video",
    "Check In",
  ];
  const [active, setActive] = useState(buttonTabs[0]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Layout title={user.name}>
        <div className="flex mt-20 pt-8 mx-auto md:gap-4 max-w-[1024px] min-h-screen flex-col">
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

                  <div className="flex">
                    <button>Chỉnh sửa trang cá nhân</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-x-2">
              {buttonTabs.map((tab, idx) => {
                return (
                  <div key={idx} className="flex">
                    <h1
                      onClick={() => setActive(tab)}
                      className={`font-medium cursor-pointer p-4 rounded-md  ${
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

          {active === "Bài Viết" && <PostTab id={user._id} />}
          {active === "Giới Thiệu" && <ProfileTab id={user._id} />}
          {/* {active === "Follwers" && <PostTab id={user._id} />}
          {active === "Ảnh" && <PostTab id={user._id} />}
          {active === "Video" && <PostTab id={user._id} />}
          {active === "Check In" && <PostTab id={user._id} />} */}
        </div>
      </Layout>
    </div>
  );
};

export default UserPorfile;
