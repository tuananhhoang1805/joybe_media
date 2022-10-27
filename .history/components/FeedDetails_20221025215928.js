/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

import { CommentIcon, LikeIcon } from "./Icon";

import {
  deletePost,
  getFeedPosts,
  likePost,
  setPostId,
  unlikePost,
} from "../redux/postSlice";
import { createComment } from "../redux/commetSlice";
import { openEditPost } from "../redux/modalSlice";

import CommentDetails from "./CommentDetails";
import { dost } from "../asset/image";
import Image from "next/image";
import { followUser, unFollowUser } from "../redux/userSlice";

const server = "http://localhost:3000";
const FeedDetails = (props) => {
  const { _id, user, status, images, comments, likes, createdAt, updatedAt } =
    props;
  const textareaRef = useRef();
  const dispatch = useDispatch();
  const { message, isError } = useSelector((state) => state.posts);
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreComemmet, setShowMoreComemmet] = useState(false);
  const [showTab, setShowTab] = useState(false);
  const [contentComment, setContentComment] = useState({
    postId: _id,
    content: "",
    postUserId: user?._id,
    user_id: session?.user?.id,
  });
  const [flUser, setFlUser] = useState(false);

  useEffect(() => {
    if (user?.followers.find((user) => user === session?.user.id)) {
      setFlUser(true);
    }
  }, []);
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
      if (isError) {
        toast.error(message, { position: "bottom-right" });
      } else {
        toast.success("Unlike bài viết", { position: "bottom-right" });
      }
    } else {
      setLiked(true);
      dispatch(likePost({ id: _id, user_id: session?.user.id }));
      if (isError) {
        toast.error(message, { position: "bottom-right" });
      } else {
        toast.success("Like bài viết", { position: "bottom-right" });
      }
    }
  };

  const handleDeletePost = async (id) => {
    setIsLoading(true);
    await dispatch(deletePost(id));

    if (isError) {
      toast.error(message, { position: "bottom-right" });
    } else {
      toast.success("Xóa bài viết thành công", { position: "bottom-right" });
    }
    setIsLoading(false);
    dispatch(getFeedPosts());
  };

  const handleUpdatePost = async (id) => {
    dispatch(openEditPost());
    dispatch(setPostId(id));
  };

  const handleCancelComment = () => {
    setContentComment({
      ...contentComment,
      content: "",
    });
    textareaRef.current.value = "";
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
    if (isError) {
      toast.error(message, { position: "bottom-right" });
    } else {
      toast.success("Comment thành công", { position: "bottom-right" });
      await dispatch(getFeedPosts());
    }
    handleCancelComment();
    textareaRef.current.value = "";
  };

  const handleFollow = async () => {

    await dispatch(followUser({ id: user._id, user_id: session?.user.id }));
    setFlUser(true)
    dispatch(getFeedPosts());
    if (isError) {
      toast.error(message, { position: "bottom-right" });
    } else {
      toast.success("Theo dõi người dùng thành công", { position: "bottom-right" });
    }
  };

  const handleUnfollow = async () => {
    await dispatch(unFollowUser({ id: user._id, user_id: session?.user.id }));
    setFlUser(false)
    dispatch(getFeedPosts());
    if (isError) {
      toast.error(message, { position: "bottom-right" });
    } else {
      toast.success("Hủy theo dõi người dùng thành công", { position: "bottom-right" });
    }
  };
  return (
    <div className="flex flex-col py-4 overflow-hidden relative">
      {isLoading ? (
        <Skeleton height={400} />
      ) : (
        <div>
          {" "}
          <div className="p-5 bg-white rounded-2xl shadow-md relative">
            <Link href={`${server}/user/${user?._id}`}>
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  src={user?.image}
                  alt={user?.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="font-medium">
                  {user?.name}

                  <div className="text-xs text-gray-500 opacity-80">
                    <p className="flex gap-x-2 cursor-default">
                      <TimeAgo datetime={createdAt} locale="vi" />
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <div className="absolute top-6 right-6 cursor-pointer">
              {user?._id !== session?.user.id && (
                <div>
                  {flUser ? (
                    <div className="unfollow" onClick={handleUnfollow}>
                      Đang Follow
                    </div>
                  ) : (
                    <div className="follow" onClick={handleFollow}>
                      Follow
                    </div>
                  )}
                </div>
              )}
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
              <span
                onClick={handleLike}
                className="active:scale-75 duration-200"
              >
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
              {likes.length > 1
                ? `${likes.length} likes`
                : `${likes.length} like`}{" "}
            </div>
            <div className="flex items-center">
              <textarea
                ref={textareaRef}
                placeholder="Add a comment..."
                className="flex flex-grow items-center max-h-[80px] resize-none w-full focus:border-none p-4 focus:outline-none whitespace-normal shadow-sm rounded-full"
                autoComplete="off"
                autoCorrect="off"
                onChange={handleChangeComment}
              ></textarea>

              <h2
                className="font-medium cursor-pointer"
                onClick={handleComment}
              >
                Post
              </h2>
            </div>
            {contentComment.content ? (
              <div onClick={handleCancelComment} className="pointer-cursor">
                Cancel
              </div>
            ) : (
              <div></div>
            )}
            {showMoreComemmet ? (
              <div>
                {comments?.map((comment) => {
                  return <CommentDetails key={comment._id} {...comment} />;
                })}

                <div
                  onClick={() => setShowMoreComemmet(false)}
                  className="cursor-pointer"
                >
                  Ẩn bớt
                </div>
              </div>
            ) : comments.length > 0 ? (
              <div
                onClick={() => setShowMoreComemmet(true)}
                className="cursor-pointer"
              >
                {` Còn ${comments.length} comments ở đây...`}
              </div>
            ) : (
              <></>
            )}
          </div>
          {session?.user?.id === user?._id ? (
            <div className="absolute top-10 right-2 cursor-pointer">
              <div className="bg-slate-100 px-2">
                <Image
                  src={dost}
                  width={30}
                  height={30}
                  alt=""
                  onClick={() => setShowTab((prev) => !prev)}
                />
              </div>

              {showTab && (
                <div className="absolute top-10 right-4 w-[150px] h-[70px] bg-slate-200 z-10 shadow-md shadow-black-900 p-4 rounded-md">
                  {" "}
                  <p onClick={() => handleUpdatePost(_id)}>Edit Post</p>
                  <p onClick={() => handleDeletePost(_id)}>Detele Post</p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedDetails;
