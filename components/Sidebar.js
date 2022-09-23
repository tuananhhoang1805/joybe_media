import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  accountImage,
  earthImage,
  eventImage,
  homeImage,
  messImage,
  notiImage,
  settingImage,
} from "../asset/image";
import SidebarIcon from "./SidebarIcon";

const Sidebar = () => {
  const sidebar = [
    {
      id: 1,
      title: "Feed",
      href: "/",
      src: homeImage,
    },
    {
      id: 2,
      title: "Connections",
      href: "/connections",
      src: accountImage,
    },
    {
      id: 3,
      title: "Latest News",
      href: "/news",
      src: earthImage,
    },
    {
      id: 4,
      title: "Events",
      href: "/event",
      src: eventImage,
    },
    {
      id: 5,
      title: "Groups",
      href: "/groups",
      src: messImage,
    },
    {
      id: 6,
      title: "Notifications",
      href: "/noti",
      src: notiImage,
    },
    {
      id: 7,
      title: "Settings",
      href: "/settings",
      src: settingImage,
    },
  ];
  const { data: session, status } = useSession();
  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <div className="mt-6 md:w-[275px] hidden md:flex bg-white rounded-lg flex-col">
      <div>
        <div className="flex justify-center items-center flex-col relative">
          <div className="relative h-12 bg-gradient-to-r from-sky-500 to-indigo-500 top-0 w-full rounded-t-lg">
            <div className="absolute top-[65%] left-[50%] translate-x-[-50%]">
              <Image
                src={session?.user.image}
                alt=""
                width={60}
                height={60}
                className="rounded-md cursor-pointer z-10 border-4"
              />
            </div>
          </div>

          <div className="mt-16 flex justify-center items-center flex-col">
            <p className="text-md font-bold">{session?.user.name}</p>
            <p className="text-xs">Web Developer at VN</p>

            <span className="text-center mt-4 text-md text-[#a7a5a5] px-4">
              I`d love to change the world, but they won`t give me the source
              code.
            </span>
          </div>

          <div className="flex justify-around items-center w-full p-4">
            <div className="flex flex-col items-center">
              <p className="font-bold text-[16px]">256</p>
              <span className="text-[14px] text-[#999]">Post</span>
            </div>
            <span className="block h-10 w-[1px] bg-[#cac8c8]"></span>
            <div className="flex flex-col items-center">
              <p className="font-bold text-[16px]">2.5K</p>
              <span className="text-[14px] text-[#999]">Follower</span>
            </div>
            <span className="block h-10 w-[1px] bg-[#cac8c8]"></span>
            <div className="flex flex-col items-center">
              <p className="font-bold text-[16px]">365</p>
              <span className="text-[14px] text-[#999]">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y-[1px] border-[#dcd7d7] py-4">
        {sidebar.map((item) => {
          return (
            <SidebarIcon
              key={item.id}
              src={item.src}
              title={item.title}
              href={item.href}
            />
          );
        })}
      </div>
      <div>
        <Link href={`${session?.user?.id}`}>
          <p className="text-center p-2 text-blue-500 cursor-pointer font-medium">
            View Profile
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
