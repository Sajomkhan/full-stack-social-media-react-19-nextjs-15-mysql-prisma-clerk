import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

const Feed = async ({ username }: { username?: string | null }) => {
  const { userId } = auth();

  let posts: any[] = [];

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
        createdAt: "desc",
      },
    });
  }

  if (!username && userId) {
    const followings = await prisma.follower.findMany({
      where: {
        OR: [{ followingId: userId }, { followerId: userId }],
      },
    });

    const userIdForDisplayPost = followings.map((f) => f.followerId);
    userIdForDisplayPost.push(userId)

    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: userIdForDisplayPost,
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
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-6">
      {posts.length
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : "No posts found"}
    </div>
  );
};

export default Feed;
