/* eslint-disable react-hooks/exhaustive-deps */
import FeedDetails from "./FeedDetails";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFeedPosts } from "../redux/postSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { feedPosts } = useSelector((state) => state.posts);
  const [limitPost, setLimitPost] = useState(5);

  useEffect(() => {
    const loadmore = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.scrollingElement.scrollHeight
      ) {
        setLimitPost((prev) => prev + 5);
      }
    };

    window.addEventListener("scroll", loadmore);

    return () => window.removeEventListener("scroll", loadmore);
  }, [limitPost]);
  useEffect(() => {
    dispatch(getFeedPosts());
  }, []);
  return (
    <div className="py-4">
      {feedPosts.post?.slice(0, limitPost).map((post) => {
        return <FeedDetails key={post._id} {...post} />;
      })}
    </div>
  );
};

export default Feed;
