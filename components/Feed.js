import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedDetails from "./FeedDetails";

const Feed = ({ handleChange, setHandleChange, posts }) => {
  const [realtimePost, setRealtimePost] = useState([]);
  const [useSSRposts, setUseSSRposts] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/post", {
        headers: { "Content-Type": "application/json" },
      });
      setRealtimePost(data.data);
      setUseSSRposts(false);
    };
    fetchData();

    return () => {
      console.log("This will be logged on unmount");
    };
  }, [handleChange]);
  return (
    <div className="py-4">
      {useSSRposts
        ? posts.map((post) => {
            return (
              <FeedDetails
                key={post._id}
                id={post._id}
                name={post.name}
                image={post.image}
                status={post.status}
                email={post.email}
                createAt={post.createAt}
                postImage={post.postImage}
                setHandleChange={setHandleChange}
              />
            );
          })
        : realtimePost.map((post) => {
            return (
              <FeedDetails
                key={post._id}
                id={post._id}
                name={post.name}
                image={post.image}
                status={post.status}
                email={post.email}
                createAt={post.createAt}
                postImage={post.postImage}
                setHandleChange={setHandleChange}
              />
            );
          })}
    </div>
  );
};

export default Feed;
