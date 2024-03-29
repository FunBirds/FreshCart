"use client";
import "./Slide.css";
import { useEffect, useState } from "react";
import { SlideImages } from "@components";
import { ProductType } from "@types";
import { useUrlContext } from "@/app/context";

function Slide({ product }: { product: ProductType }) {
  const url = useUrlContext();
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const previewImage = document.getElementsByClassName(
      "active",
    )[0] as HTMLElement;
    previewImage?.addEventListener("mousemove", (e) => {
      const x = (e.offsetX / previewImage.clientWidth) * 100;
      const y = (e.offsetY / previewImage.clientHeight) * 100;
      previewImage.style.backgroundSize = "1000px";
      previewImage.style.backgroundPosition = `${x}% ${y}%`;
    });
    previewImage?.addEventListener("mouseout", (e) => {
      previewImage.style.backgroundSize = "contain";
      previewImage.style.backgroundPosition = "center";
    });
    const slider = document.getElementById("slider") as HTMLDivElement;
    const px = current * 600;
    slider.style.transform = `translateX(-${px}px)`;
  }, [current]);
  return (
    <div className="mr-24">
      <div className="overflow-hidden w-[400px] h-[400px] lg:w-[600px] lg:h-[500px] relative border rounded-lg">
        <div
          id="slider"
          className="h-[400px] lg:h-[600px] flex   absolute overflow-hidden duration-500 top-0 left-0"
        >
          {product.images.map((e, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url("${url}/files/image/${e}")`,
              }}
              className={`h-[400px] w-[400px] lg:w-[600px] lg:h-[500px] left-0 top-0 bg-center bg-contain bg-no-repeat hover:cursor-zoom-in ${
                current === i ? "active" : ""
              }`}
            ></div>
          ))}
        </div>
      </div>
      <SlideImages
        current={current}
        setCurrent={setCurrent}
        product={product}
      />
    </div>
  );
}

export default Slide;
