import { useState } from "react";
import CreatePost from "./CreatePost";
// import Feed from "./Feed";

const NewFeed = () => {
  const [handleChange, setHandleChange] = useState(false);

  console.log(handleChange);
  return (
    <div className="mt-6 w-[650px] h-max overflow-y-hiden">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <CreatePost setHandleChange={setHandleChange} />
        {/* <Feed handleChange={handleChange} setHandleChange={setHandleChange}/> */}
      </div>
    </div>
  );
};

export default NewFeed;