/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../../redux/userSlice";
import FeedDetails from "../FeedDetails";

const PostTab = ({ id }) => {
  const { posts } = useSelector((state) => state.users);
  console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const userPost = async () => {
      await dispatch(getUserPost(id));
    };
    userPost();
  }, [id]);

  if( posts?.post?.length < 1){
    return <div>Create New Post</div>
  }
  return (
    <div>
        
      {posts?.post?.map((post) => {
        return <FeedDetails key={post._id} {...post} />;
      })}
    </div>
  );
};

export default PostTab;
