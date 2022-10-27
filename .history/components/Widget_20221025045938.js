import React, { useState } from "react";
import UserFollow from "./UserFollow";
import { useSession } from "next-auth/react";
const Wigdet = ({ users }) => {
  const { data: session } = useSession();
  const [index, setIndex] = useState(2);
  const filterUser = users.filter((user) => user.id !== session?.user?.id);
  return (
    <div className="mt-6 md:w-[275px] hidden md:flex bg-white rounded-lg flex-col overflow-y-scroll h-[320px] ">
      <h1 className="font-medium text-center p-2">Who to follow</h1>

      {users.slice(0, index).map((user) => {
        return (
          <UserFollow
            key={user._id}
            id={user._id}
            name={user.name}
            image={user.image}
          />
        );
      })}

      <h1
        className="font-medium text-center p-2 text-blue-500 cursor-pointer "
        onClick={() => setIndex((index) => index + 4)}
      >
        View More
      </h1>
    </div>
  );
};

export default Wigdet;
