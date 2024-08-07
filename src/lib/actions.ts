"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";

// FOLLOW ACTION
export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });
    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const isFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          reciverId: userId,
        },
      });
      if (isFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: isFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            reciverId: userId,
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

// BLOCK ACTION
export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingBlocked = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlocked) {
      await prisma.block.delete({
        where: {
          id: existingBlocked.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }
  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        reciverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }

    await prisma.follower.create({
      data: {
        followerId: userId,
        followingId: currentUserId,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();
  if (!currentUserId) {
    throw new Error("User is not Authenticated!");
  }
  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        reciverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const updateProfile = async(formData: FormData)=> {
  // const name = formData.get("name") as string
  
  const fields = Object.fromEntries(formData)
  console.log(fields);
  
}
