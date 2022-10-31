/* eslint-disable react-hooks/exhaustive-deps */
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../components/Feed";
import FeedDetails from "../components/FeedDetails";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import Post from "../models/postModel";
import { getSingleUser } from "../redux/userSlice";
import dbconnect from "../utils/mongose";

export default function Following({ posts }) {
  const { data: session } = useSession();
  let id = session?.user?.id;

  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.users);
  let idFollower = singleUser?.users?.following;
  useEffect(() => {
    const userPost = async () => {
      await dispatch(getSingleUser(id)); 
    };
    userPost();
  }, [id]);
  const followersPost = posts?.filter((post) => {
    for (let user in idFollower) {
      if (post.user._id === idFollower[user]._id) {
        return true;
      }
    }

    return false;
  });

  return (
    <div className="bg-slate-100 min-h-screen">
      <Layout>
        <main className="flex justify-center mt-20 mx-auto gap-x-4">
          <Sidebar className="" />
          <div className="w-[600px]">
            {followersPost.map((post) => {
              return <FeedDetails key={post._id} {...post} />;
            })}
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

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

  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
