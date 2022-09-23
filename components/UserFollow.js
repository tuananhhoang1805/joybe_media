import Link from "next/link";
import Image from "next/image";
const UserFollow = ({ id, name, image }) => {
  return (
    <div className="p-2">
        <Link href={`/profile/${id}`}>
          <div className="flex items-center gap-2">
            <Image src={image} alt={name} width={40} height={40} className="rounded-full"/>
            <h1 className="font-medium">{name}</h1>
          </div>
        </Link>

    </div>
  );
};

export default UserFollow;
