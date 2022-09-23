/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { cameraImage, emoji, videoImage } from "../asset/image";

const CreatePost = ({ setHandleChange }) => {
  const { data: session } = useSession();
  const [imagePost, setImagePost] = useState();
  const inputRef = useRef();
  const imagePostRef = useRef();

  const handleaddPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    try {
      await axios({
        method: "POST",
        url: "/api/post",
        data: {
          name: session.user.name,
          status: inputRef.current.value,
          email: session.user.email,
          image: session.user.image,
          postImage: imagePost,
          createAt: new Date().toString(),
        },
      });
    } catch (error) {
      console.log(error);
    }

    inputRef.current.value = "";
    removeImage();
    setHandleChange((prev) => !prev);
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      file.preview = URL.createObjectURL(file);

      setImagePost(file);
    }
  };

  const removeImage = () => {
    setImagePost(null);
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
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            placeholder={`What 's on your mind, ${session?.user.name} ? `}
          />

          <button hidden type="submit" className="" onClick={handleaddPost}>
            Submit
          </button>
        </form>
      </div>

      <div className="flex">
        {imagePost && (
          <div className="flex flex-col filter items-center hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer p-6">
            <Image
              className="object-contain"
              src={imagePost.preview}
              alt=""
              height={120}
              width={200}
              layout="fixed"
            />
            <p
              className="text-xs text-red-500 text-center"
              onClick={removeImage}
            >
              Remove
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <Image src={videoImage} width={30} height={30} />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div className="inputIcon" onClick={() => imagePostRef.current.click()}>
          <Image src={cameraImage} width={30} height={30} />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input type="file" hidden onChange={uploadFile} ref={imagePostRef} />
        </div>
        <div className="inputIcon">
          <Image src={emoji} width={30} height={30} />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
