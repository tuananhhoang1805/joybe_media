/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import CreatePost from "./CreatePost";
import Feed from "./Feed";

const NewFeed = ({ posts, setModalOpen , setText }) => {
  return (
    <div className="mt-6 w-[650px] h-max overflow-y-hiden">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <CreatePost setModalOpen={setModalOpen} setText={setText}/>
        <Feed
          posts={posts}
          setText={setText}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default NewFeed;
