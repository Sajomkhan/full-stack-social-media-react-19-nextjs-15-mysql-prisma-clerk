"use client";

import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { Story, User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type StoryWithUser = Story & { user: User };

const StoriesList = ({ 
    stories,
      userId,
    }: {
      stories: StoryWithUser[];
      userId: string;
    })=> {
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState<any>();

  const { user, isLoaded } = useUser();

  const add = async () => {
    if (!img.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Sending...",
        avatar: user?.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const creatStory = await addStory(img.secure_url);
      setStoryList((prev) => [creatStory, ...prev]);
      setImg(null);
    } catch (err) {}
  };

  const [optimisticstories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  return (
    <>
      {/* CLAUDINARY WIDGET */}
      <CldUploadWidget
        uploadPreset="social"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              {/* USER IMAGE */}
              <Image
                src={
                  img?.secure_url || user?.imageUrl || "/noAvatar.png"
                }
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 object-cover"
                onClick={() => open()}
              />
              {/* ADD STORY BUTTON */}
              {img ? (
                <form action={add}>
                  <button className="bg-blue-500 py-1 px-3 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add Story</span>
              )}
              {/* ICON IMAGE */}
              <Image
                src="/stories.png"
                alt=""
                width={20}
                height={20}
                className="absolute top-7 "
                onClick={() => open()}
              />
            </div>
          );
        }}
      </CldUploadWidget>
      {/* STORY */}
      {optimisticstories &&
        optimisticstories.map((story) => (
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            key={story.id}
          >
            <Image
              src={story.img || "/noAvatar.png"}
              alt=""
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2"
            />
            <span className="font-medium">
              {story.user.name || story.user.username}
            </span>
          </div>
        ))}
    </>
  );
};

export default StoriesList;
