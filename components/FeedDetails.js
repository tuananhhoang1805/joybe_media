/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { CommentIcon, LikeIcon, UnLikeIcon } from "./Icon";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getFeedPosts,
  getSinglePost,
  likePost,
  setPostId,
  unlikePost,
} from "../redux/postSlice";
import { createComment } from "../redux/commetSlice";
const FeedDetails = (props) => {
  const {
    _id,
    user,
    status,
    images,
    comments,
    likes,
    createdAt,
    setText,
    setModalOpen,
  } = props;
  const textareaRef = useRef();
  const dispatch = useDispatch();

  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [showMoreComemmet, setShowMoreComemmet] = useState(false);
  const [contentComment, setContentComment] = useState({
    postId: _id,
    content: "",
    postUserId: user._id,
    user_id: session.user.id,
  });
  useEffect(() => {
    if (likes?.find((like) => like._id === session?.user.id)) {
      setLiked(true);
    }
  }, [likes]);

  useEffect(() => {
    dispatch(getFeedPosts());
  }, [liked]);
  const handleLike = async () => {
    if (liked) {
      setLiked(false);
      dispatch(unlikePost({ id: _id, user_id: session?.user.id }));
    } else {
      setLiked(true);
      dispatch(likePost({ id: _id, user_id: session?.user.id }));
    }
  };

  const handleDeletePost = async (id) => {
    dispatch(deletePost(id));
    dispatch(getFeedPosts());
  };

  const handleUpdatePost = async (id) => {
    setText("edit");
    setModalOpen(true);
    dispatch(setPostId(id));
  };

  const handleCancelComment = () => {
    setContentComment({
      ...contentComment,
      content: "",
    });
  };
  const handleChangeComment = (e) => {
    setContentComment({
      ...contentComment,
      content: e.target.value,
    });
  };
  const handleComment = async (e) => {
    e.preventDefault();
    await dispatch(createComment(contentComment));
    await dispatch(getFeedPosts());

    textareaRef.current.value = ""
  };
  return (
    <div className="flex flex-col py-4 overflow-hidden relative">
      <div className="p-5 bg-white rounded-2xl shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src={user?.image}
            alt={user?.name}
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="font-medium">
            {user?.name}
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

        <div>
          {likes.length > 1 ? `${likes.length} likes` : `${likes.length} like`}{" "}
        </div>
        <div className="flex items-center">
          <textarea
            ref={textareaRef}
            placeholder="Add a comment..."
            className="flex flex-grow max-h-[80px] resize-none w-full focus:border-none p-2 focus:outline-none whitespace-normal"
            autoComplete="off"
            autoCorrect="off"
            onChange={handleChangeComment}
          ></textarea>

          <h2 className="font-medium cursor-pointer" onClick={handleComment}>
            Post
          </h2>
        </div>

        {showMoreComemmet ? (
          <div>
            {comments?.map((comment) => {
              return (
                <div key={comment._id} className="flex flex-col w-max">
                  <div className="flex gap-x-4 p-[12px] shadow-md bg-slate-50">
                    <p className="font-bold text-[16px]">
                      {comment.user.name} :
                    </p>
                    <span>{comment.content}</span>
                  </div>

                  <div className="flex cursor-pointer gap-x-4">
                    <p>Like</p>
                    {session?.user?.id === comment.user._id && <p>Delete</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : comments.length > 0 ? (
          <div
            onClick={() => setShowMoreComemmet(true)}
            className="cursor-pointer"
          >
            {` More ${comments.length} comments in there...`}
          </div>
        ) : (
          <></>
        )}
      </div>

      {session?.user?.id === user._id ? (
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
