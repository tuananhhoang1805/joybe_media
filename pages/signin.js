import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
export default function SignIn({ providers }) {
  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
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
