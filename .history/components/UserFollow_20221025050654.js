import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
const UserFollow = ({ id, name, image }) => {
  return (
    <div className="p-2 flex items-center justify-around">
      <Link href={`/user/${id}`}>
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
      </Link>

      <button className="border-[red] p-2 border-2 text-[red]">View profile</button>
    </div>
  );
};

export default UserFollow;
