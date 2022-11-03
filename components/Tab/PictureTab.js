import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/userSlice";
import { ImageDetail } from "../ImageDetail";

const PictureTab = ({ id }) => {
  const { posts } = useSelector((state) => state.users);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    const userPost = async () => {
      await dispatch(getUserPost(id));
    };
    userPost();
  }, [id]);

  return (
    <div className="w-full bg-white p-4 shadow-md h-max flex items-center gap-x-4 mt-4">
      {posts?.post?.map((post) => {
        return <ImageDetail key={post._id} {...post} />;
      })}
    </div>
  );
};

export default PictureTab;
