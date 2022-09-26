import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { CommentIcon, LikeIcon } from "./Icon";
import TimeAgo from 'timeago-react';
const FeedDetails = (props) => {
  const { id, name, image, status, email, createAt, postImage, setHandleChange } = props;
  const [like, setLike] = useState(false);
  const textareaRef = useRef();

  const { data: session } = useSession();
  const handleLike = () => {
    setLike((prev) => !prev);
  };

  const deletePost = async () => {
    await axios.delete(`/api/post/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    setHandleChange(prev => !prev)
  };

  return (
    <div className="flex flex-col py-4 overflow-hidden relative">
      <div className="p-5 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <Image
            src={image}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="font-medium">
            {name} <p className="text-xs text-gray-500 opacity-80">
              <TimeAgo datetime={createAt} locale="vi"/>
            </p>
          </div>
        </div>
        <p className="py-4">{status}</p>

        {postImage && (
          <div className="relative bg-white ">
            <Image
              src={postImage.secure_url}
              width={postImage.width}
              height={postImage.height}
              className="object-cover"
              alt=""
            />
          </div>
        )}

        <div className="flex items-center space-x-2 mt-2">
          <span onClick={handleLike} className="active:scale-75 duration-200">
            <LikeIcon
              className="h-8 w-8"
              fill={like ? "red" : "none"}
              stroke={like ? "red" : "currentColor"}
            />
          </span>
          <span
            className="hover:opacity-40"
            onClick={() => textareaRef.current.focus()}
          >
            <CommentIcon className="h-8 w-8" />
          </span>
        </div>

        <div className="flex items-center">
          <textarea
            ref={textareaRef}
            placeholder="Add a comment..."
            className="flex flex-grow max-h-[80px] resize-none w-full focus:border-none p-2 focus:outline-none whitespace-normal"
            autoComplete="off"
            autoCorrect="off"
          ></textarea>

          <h2 className="font-medium cursor-pointer">Post</h2>
        </div>
      </div>

      {session?.user?.email === email ? (
        <div className="absolute top-10 right-2 cursor-pointer">
          <p onClick={deletePost}>Detele Post</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedDetails;