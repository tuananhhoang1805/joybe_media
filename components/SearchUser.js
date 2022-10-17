/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
const SearchUser = (props) => {
  const { _id, name, image } = props.user;
  const server = "http://localhost:3000";
  return (
    <div>
      <Link href={`${server}/user/${_id}`}>
        <div className="py-2 flex items-center gap-x-2">
          <img
            src={image}
            alt=""
            width={30}
            height={30}
            className="rounded-full"
          />
          <p>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchUser;
