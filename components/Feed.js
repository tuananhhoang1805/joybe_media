/* eslint-disable react-hooks/exhaustive-deps */
import FeedDetails from "./FeedDetails";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFeedPosts } from "../redux/postSlice";

const Feed = ({setText, setModalOpen, posts }) => {
  const dispatch = useDispatch();
  const { feedPosts } = useSelector((state) => state.posts);


  useEffect(() => {
    dispatch(getFeedPosts())
  },[])

  console.log(posts);
  console.log(feedPosts);
  return (
    <div className="py-4">
      {posts?.map((post) => {
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
