/* eslint-disable @next/next/no-img-element */
import React from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { singOut } from "../../asset/image";

const LogOutModal = () => {
  const { data: session } = useSession();
  return (
    <motion.div
      className="absolute bottom-[-400%] w-max h-max right-2 bg-slate-50 shadow-md"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", duration: 1 }}
    >
      <div className="flex p-4 border-b-2 gap-x-2">
        <Image
          src={session?.user.image}
          alt={session?.user.name}
          className="rounded-full"
          width={40}
          height={40}
        />

        <p className="whitespace-nowrap font-semibold hidden md:block ">
          {session?.user.name}
        </p>
      </div>

      <div className="p-2 cursor-pointer flex items-center gap-x-4" onClick={() => signOut()}>
        <p>Sign Out</p>
        <Image src={singOut} alt="" width={30} height={30} layout="fixed"/>
      </div>
    </motion.div>
  );
};

export default LogOutModal;
