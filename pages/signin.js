import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import {
  GoogleIcon,
  LogoIcon,
} from "../components/Icon";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
export default function SignIn({ providers }) {
  return (
    <div>
      <Head>
        <title>Joybe - Sign In</title>
        <meta name="description" content="sign in"></meta>
      </Head>
      <div className="min-h-screen flex flex-col items-stretch bg-gradient-to-r from-green-200 via-transparent to-blue-200 ">
        <div className="flex-grow flex flex-col justify-center items-center gap-3 max-w-[600px] m-auto shadow-lg p-2 md:p-10 sm:max-h-[600px] bg-white">
          <div>
            <LogoIcon className="h-24 w-24" />
          </div>
          <h1 className="text-3xl text-center font-semibold">
            Log in to Joybe
          </h1>
          <p className="text-center w-[95vw] max-w-[375px] text-sm text-gray-500">
            Manage your account, check follower, comment on posts, and more.
          </p>
          {Object.values(providers).map((provider) => {
            return (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="w-[95vw] max-w-[375px] flex justify-center items-center relative border border-gray-200 hover:border-gray-400 transition h-11"
                >
                  <p>Sign in with {provider.name}</p>
                  {provider.name === "Google" && (
                    <GoogleIcon className="absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6 " />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const providers = await getProviders();

  const session = await unstable_getServerSession(req, res, authOptions);

  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
      props: {},
    };
  }
  return {
    props: { providers },
  };
};
