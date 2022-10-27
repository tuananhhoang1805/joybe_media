import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
const UserFollow = ({ id, name, image }) => {
  return (
    <div className="p-2 flex items-center justify-around">
      <div className="flex items-center gap-2">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="font-medium">{name}</h1>
      </div>
      <Link href={`/user/${id}`}>
        <button className="border-[red] p-1 border-2 text-[red] text-sm">
          View profile
        </button>
      </Link>
    </div>
  );
};

export default UserFollow;
