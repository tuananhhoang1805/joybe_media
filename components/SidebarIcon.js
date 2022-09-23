import Image from "next/image";
import Link from "next/link";

const SidebarIcon = ({ src, title, href }) => {
  return (
    <div className="flex hover:shadow-md py-2 px-4 hover:bg-slate-200">
      <Link href={href}>
        <a className="flex items-center gap-x-2">
          <Image src={src} alt="" width={30} height={30} layout="fixed"/>
          <h3 className="font-bold text-[18px] capitalize">{title}</h3>
        </a>
      </Link>
    </div>
  );
};

export default SidebarIcon;