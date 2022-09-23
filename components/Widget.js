import axios from "axios";
import React, { useEffect, useState } from "react";
import UserFollow from "./UserFollow";

const Wigdet = ({ users }) => {

    console.log(users);
//   const [user, setUser] = useState([]);
  const [index, setIndex] = useState(2);
//   useEffect(() => {
//     const fetchUser = async () => {
//       const data = await axios.get("/api/user", {
//         headers: { "Content-Type": "application/json" },
//       });

//       setUser(data.data);
//     };

//     fetchUser();
//   }, []);


  return (
    <div
      className="mt-6 md:w-[275px] hidden md:flex bg-white rounded-lg flex-col overflow-y-scroll h-[320px]"
    >
      <h1 className="font-medium text-center p-2">Who to follow</h1>

      {users.slice(0,index ).map((user) => {
        return (
          <UserFollow
            key={user._id}
            id={user._id}
            name={user.name}
            image={user.image}
          />
        );
      })}


      <h1 className="font-medium text-center p-2 text-blue-500 cursor-pointer " onClick={() => setIndex(index => index + 4)}>View More</h1>
    </div>
  );
};

export default Wigdet;
