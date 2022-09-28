/* eslint-disable react-hooks/exhaustive-deps */
import FeedDetails from "./FeedDetails";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFeedPosts } from "../redux/postSlice";
import { getSingleUser } from "../redux/userSlice";

const Feed = ({ posts, setText, setModalOpen }) => {
  const dispatch = useDispatch();
  const { feedPosts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getFeedPosts());
  }, []);
  return (
    <div className="py-4">
      {feedPosts.post?.map((post) => {
        return (
          <FeedDetails
            key={post._id}
            setText={setText}
            setModalOpen={setModalOpen}
            {...post}
          />
        );
      })}
    </div>
  );
};

export default Feed;
