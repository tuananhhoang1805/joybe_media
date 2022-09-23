import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  CreateIcon,
  HeartIcon,
  HomeIcon,
  LogoIcon,
  MessageIcon,
  SearchIcon,
} from "../components/Icon";
import HeaderIcon from "./HeaderIcon";

const Layout = ({ children, title, description }) => {
  const { data: session, status, error } = useSession();
  console.log(session);
  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title}` : "Yoybe"}</title>
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

            <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
              <SearchIcon className="h-6 w-6" />
              <input
                type="text"
                placeholder="Search..."
                className="hidden ml-2 items-center bg-transparent outline-none border-none md:flex"
              />
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

            <Link href="/follower">
              <a>
                <HeaderIcon Icon={HeartIcon} className="h-6 w-6" />
              </a>
            </Link>
          </div>

          <div className="flex items-center sm:space-x-2 justify-end gap-3">
            <CreateIcon className="h-6 w-6 cursor-pointer border rounded-lg border-black" />

            <Image
              src={session?.user.image}
              alt="logo"
              className="rounded-full cursor-pointer"
              width={30}
              height={30}
              layout="fixed"
              onClick={() => signOut()}
            />

            <p className="whitespace-nowrap font-semibold hidden md:block ">
              {session?.user.name}
            </p>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
