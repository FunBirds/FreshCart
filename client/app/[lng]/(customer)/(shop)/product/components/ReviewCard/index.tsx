"use client";
import { ReviewType } from "@types";
import { PreviewImage, ProfileImage, Star } from "@components";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useUrlContext } from "@/app/context";

function ReviewCard({ review }: { review: ReviewType }) {
  const url = useUrlContext();
  const [selected, setSelected] = useState<string | boolean>(false);
  const images = useMemo(
    () => review.images.map((filename) => `${url}/files/image/${filename}`),
    [review.images, url],
  );
  return (
    <>
      <div className="flex gap-x-5 border-t border-slate-300 mt-5 pt-5">
        <div>
          <ProfileImage
            image={`${url}/files/image/${review.clientId.image}`}
            size={60}
          />
        </div>
        <div>
          <div>
            <h4 className="text-lg font-semibold text-slate-800">
              {review.clientId.name}
            </h4>
            <p className="text-slate-500 text-sm">
              {new Date(review.date).toDateString()}
            </p>
          </div>
          <div className="my-2">
            <Star rating={review.star} />
            <p className="text-slate-600">{review.description}</p>
            <div className="flex gap-3 my-3">
              {review.images.map((e, i) => (
                <Image
                  key={i}
                  width={70}
                  height={70}
                  className="w-[70px] h-[70px] object-cover"
                  src={`${url}/files/image/${e}`}
                  alt="Rasmlar"
                  onClick={() => setSelected(`${url}/files/image/${e}`)}
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {selected && (
        <PreviewImage
          images={images}
          setSelected={setSelected}
          selected={selected}
        />
      )}
    </>
  );
}

export default ReviewCard;
