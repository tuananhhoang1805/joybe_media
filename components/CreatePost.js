/* eslint-disable jsx-a11y/alt-text */
import { useSession } from "next-auth/react";
import Image from "next/image";
import { cameraImage, emoji, videoImage } from "../asset/image";

const CreatePost = ({ setModalOpen }) => {
  const { data: session } = useSession();

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md text-gray-500 font-medium">
      <div className="flex space-x-4 p-4 items-center">
        {session?.user.image && (
          <Image
            alt={session?.user.name}
            width={40}
            height={40}
            className="rounded-full"
            src={session?.user.image}
            layout="fixed"
          />
        )}
        <form className="flex flex-1">
          <input
            onClick={openModal}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            placeholder={`What 's on your mind, ${session?.user.name} ? `}
          />
        </form>
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon" onClick={openModal}>
          <Image src={videoImage} width={30} height={30} />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div className="inputIcon" onClick={openModal}>
          <Image src={cameraImage} width={30} height={30} />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
        </div>
        <div className="inputIcon" onClick={openModal}>
          <Image src={emoji} width={30} height={30} />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
