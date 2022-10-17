/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteComment,
  likeComment,
  unlikeComment,
} from "../redux/commetSlice";
import { getFeedPosts } from "../redux/postSlice";
import toast from "react-hot-toast";

const CommentDetails = (props) => {
  const { _id, content, likes, postId, postUserId, createdAt, user } = props;
  const { data: session } = useSession();

  const [liked, setLiked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (likes?.find((like) => like._id === session?.user.id)) {
      setLiked(true);
    }
  }, [likes, session?.user.id]);

  useEffect(() => {
    dispatch(getFeedPosts());
  }, [liked]);

  const handleDeteleComment = async (id) => {
    dispatch(deleteComment(id));
    toast.success("Xóa thành công", { position: "bottom-right" });
    dispatch(getFeedPosts());
  };

  const handleLike = async () => {
    if (liked) {
      setLiked(false);
      dispatch(unlikeComment({ id: _id, user_id: session.user?.id }));
      toast.success("Unlike thành công", { position: "bottom-right" });
      dispatch(getFeedPosts());
    } else {
      setLiked(true);
      dispatch(likeComment({ id: _id, user_id: session.user?.id }));
      toast.success("Like thành công", { position: "bottom-right" });
      dispatch(getFeedPosts());
    }
  };
  return (
    <div className="flex flex-col w-max">
      <div className="flex gap-x-4 p-[12px] shadow-md bg-slate-50">
        <p className="font-bold text-[16px]">{user?.name} :</p>
        <span>{content}</span>
      </div>

      <div className="flex cursor-pointer gap-x-4 items-center">
        <p
          onClick={handleLike}
          className={` ${liked ? "text-[#FF0000]" : ""} `}
        >
          {likes.length > 1
            ? `likes(${likes.length})`
            : `like(${likes.length})`}
        </p>
        {session?.user?.id === user?._id && (
          <div className="flex items-center gap-x-4">
            <p onClick={() => handleDeteleComment(_id)}>Xóa</p>
          </div>
        )}
        <p className="text-gray-500 text-xs">
          {" "}
          <TimeAgo datetime={createdAt} locale="vi" />
        </p>
      </div>
    </div>
  );
};

export default CommentDetails;
