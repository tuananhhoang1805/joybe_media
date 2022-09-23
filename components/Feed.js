import axios from "axios";
import React, { useEffect, useState } from "react";
import FeedDetails from "./FeedDetails";

const Feed = ({ handleChange, setHandleChange }) => {
  const [realtimePost, setRealtimePost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/post", {
        headers: { "Content-Type": "application/json" },
      });
      setRealtimePost(data.data);
    };
    fetchData();

    return () => {
      console.log("This will be logged on unmount");
    };
  }, [handleChange]);
  return (
    <div className="py-4">
      {realtimePost.map((post) => {
        console.log(post);
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