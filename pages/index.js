/* eslint-disable react-hooks/exhaustive-deps */
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import NewFeed from "../components/NewFeed";
import Wigdet from "../components/Widget";
import dbconnect from "../utils/mongose";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Post from "../models/postModel";
import CreatePostModal from "../components/Modal/CreatePostModal";
import EditPostModel from "../components/Modal/EditPostModel";
import { useDispatch } from "react-redux";
import { getFeedPosts } from "../redux/postSlice";
import User from "../models/userModel";
export default function Home({posts, users}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [text, setText] = useState();
  const [limitPost, setLimitPost] = useState(5);
  const { status } = useSession();

  const dispatch = useDispatch();


  //  get Post in first load

  // const loadmore = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.scrollingElement.scrollHeight
  //   ) {
  //     setLimitPost((prev) => prev + 10);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", loadmore);

  //   return () => window.removeEventListener("scroll", loadmore);
  // }, []);
  useEffect(() => {
    modalOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }, [modalOpen]);
  if (status === "loading") {
    return "Loading or not authenticated...";
  }
  return (
    <div className="bg-slate-100 min-h-screen">
      <Layout>
        <main className="flex justify-center mt-20 mx-auto gap-x-4  ">
          <Sidebar className="flex-1" />
          <NewFeed
            className="flex-[2]"
            setModalOpen={setModalOpen}
            setText={setText}
            posts={posts}
          />
          <Wigdet className="flex-1" users={users}/>
          <AnimatePresence>
            {modalOpen && text === "post" ? (
              <CreatePostModal
                handleClose={() => setModalOpen(false)}
                setModalOpen={setModalOpen}
              />
            ) : modalOpen && text === "edit" ? (
              <EditPostModel
                handleClose={() => setModalOpen(false)}
                setModalOpen={setModalOpen}
              />
            ) : (
              <></>
            )}
          </AnimatePresence>
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
  const posts = await Post.find().sort({ createdAt: -1 });

  // Get Users in SSR
  const users = await User.find({});
  return {
    props: {
      session,
      posts: JSON.parse(JSON.stringify(posts)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
