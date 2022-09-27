/* eslint-disable react-hooks/exhaustive-deps */
import FeedDetails from "./FeedDetails";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFeedPosts } from "../redux/postSlice";

const Feed = ({ posts, setText, setModalOpen }) => {
  const [useSSRposts, setUseSSRposts] = useState(true);
  const dispatch = useDispatch();
  const { feedPosts, isChange } = useSelector((state) => state.posts);
  // console.log(feedPosts);
  useEffect(() => {
    dispatch(getFeedPosts());
    setUseSSRposts(false);
  }, []);

  return (
    <div className="py-4">
      {useSSRposts
        ? posts?.map((post) => {
            return (
              <FeedDetails
                key={post._id}
                setText={setText}
                setModalOpen={setModalOpen}
                {...post}
              />
            );
          })
        : feedPosts.post?.map((post) => {
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
