import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string | null }) => {
  const { userId } = auth();

  let posts;

  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        cratedAt: "desc",
      },
    });
  }

  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });
    
    const followings = following.map(f=>f.followingId)
    
    console.log(followings);    
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-6">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
