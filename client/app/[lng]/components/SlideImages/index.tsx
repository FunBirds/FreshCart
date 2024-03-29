"use client";
import "./SlideImages.css";
import { ProductType } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useUrlContext } from "@/app/context";

function SlideImages({
  product,
  current,
  setCurrent,
}: {
  product: ProductType;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}) {
  const url = useUrlContext();
  return (
    <div className="flex overflow-x-auto my-4">
      {product.images.map((e, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url("${url}/files/image/${e}")`,
          }}
          onClick={() => setCurrent(i)}
          className={`cursor-pointer border-2 bg-center w-[200px] bg-contain bg-no-repeat ${
            current === i ? "border-green-600" : ""
          } h-[100px] m-2 rounded-md `}
        ></div>
      ))}
    </div>
  );
}

export default SlideImages;
