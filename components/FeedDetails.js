/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { CommentIcon, LikeIcon } from "./Icon";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getFeedPosts,
  likePost,
  setPostId,
} from "../redux/postSlice";
const FeedDetails = (props) => {
  const {
    _id,
    user,
    status,
    images,
    comment,
    like,
    createdAt,
    setText,
    setModalOpen,
  } = props;

  const textareaRef = useRef();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (like?.find((like) => like._id === session.user.id)) {
      setLiked(true);
    }
  }, [like, session.user.id]);
  const handleLike = async () => {
    console.log(_id);
    if (like) {
      setLiked(false);
    } else {
      setLiked(true);
      await dispatch(likePost({ id: _id, user_id: session.user.id }));
      await dispatch(getFeedPosts());
    }
  };

  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    await dispatch(getFeedPosts());
  };

  const handleUpdatePost = async (id) => {
    setText("edit");
    setModalOpen(true);
    dispatch(setPostId(id));
  };
  return (
    <div className="flex flex-col py-4 overflow-hidden relative">
      <div className="p-5 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            src={session.user.image}
            alt={session.user.name}
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="font-medium">
            {session.user.name}
            <p className="text-xs text-gray-500 opacity-80">
              <TimeAgo datetime={createdAt} locale="vi" />
            </p>
          </div>
        </div>
        <p className="py-4">{status}</p>

        {images?.map((image) => {
          return (
            <div className="relative bg-white" key={image.public_id}>
              <img
                src={image.url}
                width={image.width}
                height={image.height}
                className="object-cover"
                alt=""
              />
            </div>
          );
        })}

        <div className="flex items-center space-x-2 mt-2">
          <span onClick={handleLike} className="active:scale-75 duration-200">
            <LikeIcon
              className="h-8 w-8"
              fill={liked ? "red" : "none"}
              stroke={liked ? "red" : "currentColor"}
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

      {session?.user?.id === user ? (
        <div className="absolute top-10 right-2 cursor-pointer">
          <p onClick={() => handleUpdatePost(_id)}>Edit Post</p>
          <p onClick={() => handleDeletePost(_id)}>Detele Post</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FeedDetails;
