import Feed from "@/components/center/Feed";
import LeftMenu from "@/components/left/LeftMenu";
import ProfileImage from "@/components/profile/ProfileImage";
import RihgtMenu from "@/components/right/RihgtMenu";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = params.username;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = auth();

  let isBlocked;

  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) isBlocked = true;
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();


  return (
    <div className="flex gap-6 pt-6">
      {/* =========LEFT========== */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      {/* =========CENTER========== */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <ProfileImage user={user}/>
          <Feed username={user.name}/>
        </div>
      </div>
      {/* =========RIGHT========== */}
      <div className="hidden lg:block w-[30%]">
        <RihgtMenu user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
