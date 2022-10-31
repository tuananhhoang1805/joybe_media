/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CreateIcon,
  HeartIcon,
  HomeIcon,
  LogoIcon,
  MessageIcon,
  SearchIcon,
} from "../components/Icon";
import HeaderIcon from "./HeaderIcon";

import { openCreatePost } from "../redux/modalSlice";
import LogOutModal from "./Modal/LogOutModal";
import { clearUser, getSearchUsers } from "../redux/userSlice";
import SearchUser from "./SearchUser";

const Layout = ({ children, title, description }) => {
  const { data: session, status, error } = useSession();
  const { searchUsers, isError } = useSelector((state) => state.users);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!searchValue.trim()) {
      dispatch(clearUser());
    }
    if (searchValue) dispatch(getSearchUsers(searchValue));
  }, [searchValue]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setOpenTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      // Clean up function
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [tooltipRef]);

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  const handleCreate = () => {
    window.scrollTo(0, 0);
    dispatch(openCreatePost());
  };

  return (
    <div>
      <Head>
        <title>{title ? `${title}` : "Joybe"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <div className="flex justify-center items-center fixed w-full top-0 z-50 bg-white p-2 lg:px-5 shadow-md">
        {/* Left */}
        <div className="flex flex-row justify-center w-[1224px]">
          <div className="flex items-center">
            <Link href="/">
              <a>
                <LogoIcon className="h-16 w-16 cursor-pointer" />
              </a>
            </Link>

            <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 relative">
              <SearchIcon className="h-6 w-6" />
              <input
                type="text"
                placeholder="Search..."
                className="hidden ml-2 items-center bg-transparent outline-none border-none md:flex"
                onChange={(e) => setSearchValue(e.target.value)}
              />

              {searchUsers.length > 0 && (
                <div className="absolute top-[50px] w-full h-max left-0 bg-slate-50 shadow-md p-4">
                  {searchUsers.slice(0,8).map((user) => {
                    return <SearchUser key={user._id} user={user} />;
                  })}
                </div>
              )}
            </div>
          </div>

          {/* center*/}
          <div className="flex items-center justify-center flex-grow">
            <Link href="/">
              <a>
                <HeaderIcon Icon={HomeIcon} className="h-6 w-6" active />
              </a>
            </Link>
            <Link href="/ibox">
              <a>
                <HeaderIcon Icon={MessageIcon} className="h-6 w-6" />
              </a>
            </Link>

            <Link href="/following">
              <a>
                <HeaderIcon Icon={HeartIcon} className="h-6 w-6" />
              </a>
            </Link>
          </div>

          <div className="flex items-center sm:space-x-2 justify-end gap-3">
            <p onClick={handleCreate}>
              <CreateIcon className="h-6 w-6 cursor-pointer border rounded-lg border-black" />
            </p>

            <div className="relative">
              <Image
                src={session?.user.image}
                alt="logo"
                className="rounded-full cursor-pointer"
                width={30}
                height={30}
                layout="fixed"
                onClick={() => setOpenTooltip((prev) => !prev)}
              />

              {openTooltip && (
                <div ref={tooltipRef}>
                  <LogOutModal />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
