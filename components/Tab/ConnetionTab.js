/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../redux/userSlice";

const ConnetionTab = ({ id }) => {
  const { singleUser, isLoading } = useSelector((state) => state.users);
  const [loadMore, setLoadMore] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    const userPost = async () => {
      await dispatch(getSingleUser(id));
    };
    userPost();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-full bg-white p-4 shadow-md h-max">
      <div className="flex flex-col">
        <h1 className="pb-4 ">Connections</h1>
        <div>
          {singleUser?.users?.followers.slice(0, loadMore).map((user) => {
            return (
              <div key={user._id} className="flex items-center justify-between">
                <div className="flex gap-x-2">
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <p className="font-bold">{user.name}</p>
                </div>

                <div className="flex gap-x-2">
                  <button>Unfollow</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-4">
          {singleUser?.users?.followers.length > 5 ? (
            <button
              className="w-full bg-blue-900 hover:bg-blue-400 p-2 text-blue-200 hover:text-white font-medium"
              onClick={() => setLoadMore((prev) => prev + 5)}
            >
              Load more
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnetionTab;
