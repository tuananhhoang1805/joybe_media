/* eslint-disable react-hooks/exhaustive-deps */
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import NewFeed from "../components/NewFeed";
import Wigdet from "../components/Widget";

import CreatePostModal from "../components/Modal/CreatePostModal";
import EditPostModel from "../components/Modal/EditPostModel";

import User from "../models/userModel";
import Post from "../models/postModel";
import Comment from "../models/commentModel";
import dbconnect from "../utils/mongose";
import { closePost } from "../redux/modalSlice";

export default function Home({ posts, users , comments }) {
  const { status } = useSession();

  const { statusPost, openModalCreatePost } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    statusPost
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [statusPost]);
  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <Layout>
        <main className="flex justify-center mt-20 mx-auto gap-x-4  ">
          <Sidebar className="flex-1" />
          <NewFeed className="flex-[2]" posts={posts} />
          <Wigdet className="flex-1" users={users} />
          <AnimatePresence>
            {openModalCreatePost && statusPost === "create" && (
              <CreatePostModal handleClose={() => dispatch(closePost())} />
            )}

            {openModalCreatePost && statusPost === "edit" && (
              <EditPostModel handleClose={() => dispatch(closePost())} />
            )}
          </AnimatePresence>

          <Toaster />
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // check user
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  // Get Post in SSR
  await dbconnect();
  const posts = await Post.find()
    .limit(100)
    .skip(0)
    .sort({ createdAt: -1 })
    .populate("user likes", "image , name  ,email , followers")
    .populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user likes",
        model: "User",
      },
    });

  // Get Users in SSR
  const users = await User.find({});

  const comments = await Comment.find({});
  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
      users: JSON.parse(JSON.stringify(users)),
      comments: JSON.parse(JSON.stringify(comments)),
    },
  };
}
