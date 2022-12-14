import Image from "next/image";
import React from "react";

export const ImageDetail = (props) => {
  const { images } = props;
  return (
    <div className="flex flex-wrap gap-x-4">
      {images.map((image) => {
        return (
          <div className="h-[200px] w-[200px]">
            <img
              src={image.url}
              width="200px"
              height="200px"
              layout="fill"
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
};
