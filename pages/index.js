import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "../components/Layout";
export default function Home({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [router, session]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="flex justify-center mt-20 mx-auto gap-x-4 ">
          {/* <Sidebar className="flex-1"/>
          <NewFeed className="flex-[2]"/>
          <Wigdet className="flex-1"/>  */}
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
