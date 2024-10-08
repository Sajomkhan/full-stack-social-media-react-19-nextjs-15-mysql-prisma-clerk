"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "./client";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

// export const updateProfile = async (formData: FormData, cover:string) => {
//   const fields = Object.fromEntries(formData);
//   // or // const name = formData.get("name") as string
//   const fiendsWithCover = {cover, ...fields}

//   const { userId } = auth();
//   try {
//     await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: fiendsWithCover
//     });
//     return { success: false, error: true };
//   } catch (err) {
//     console.log(err);
//     return { success: false, error: true };
//   }
// }

export const updateProfile = async (
  errorOrSuccess: { success: boolean; error: boolean },
  formState: { formData: FormData; cover: string }
) => {
  const { formData, cover } = formState;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    name: z.string().max(60).optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(60).optional(),
  });

  const validatedField = Profile.safeParse({ cover, ...filteredFields });

  if (!validatedField.success) {
    console.log(validatedField.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();

  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedField.data,
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const addComment = async (postId: number, desc: string) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated");

  try {
    const newComment = await prisma.comment.create({
      data: {
        desc,
        userId,
        postId,
      },
      include: {
        user: true,
      },
    });
    return newComment;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const desc = formData.get("desc") as string;

  const Desc = z.string().min(1).max(255);

  const validateDesc = Desc.safeParse(desc);

  if (!validateDesc.success) {
    console.log("Post text is not valid");
    throw new Error("Post text is not valid");
  }

  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated");

  try {
    await prisma.post.create({
      data: {
        desc: validateDesc.data,
        userId,
        img,
      },
    });

    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const addStory = async (img: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated");

  try {
    const existingStory = await prisma.story.findFirst({
      where: {
        userId,
      },
    });

    if (existingStory)
      await prisma.story.delete({
        where: {
          id: existingStory.id,
        },
      });

    const createStory = await prisma.story.create({
      data: {
        userId,
        img,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });
    return createStory;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
};

export const deletePost = async(postId: number) =>{
  const {userId} = auth()

  if(!userId) throw new Error("User is not authenticated!")

    try {
      await prisma.post.delete({
        where: {
          id: postId,
          userId
        }
      });
      revalidatePath("/")
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong");      
    }
}