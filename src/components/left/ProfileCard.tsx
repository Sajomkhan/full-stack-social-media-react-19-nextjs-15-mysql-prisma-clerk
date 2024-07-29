import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const ProfileCard = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 bg-white shadow-md rounded-lg text-sm p-4">
      <div className="h-20 relative">
        <Image
          src={user?.cover || "https://images.pexels.com/photos/27138244/pexels-photo-27138244/free-photo-of-a-person-sitting-in-a-small-cabin-in-a-vineyard.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user?.avatar || "/noAvatar.png"}
          alt=""
          width={48}
          height={48}
          className="object-cover rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="flex flex-col items-center gap-4 mt-2">
        <h1 className="text-lg font-semibold">
          {user.name && user.surname
            ? user.name + "" + user.surname
            : user.username}
        </h1>
        <div className="flex items-center gap-3">
          <Image
            src="/postimage.jpg"
            alt=""
            width={12}
            height={12}
            className="object-cover rounded-full w-3 h-3"
          />
          <span>{user._count.followers} Followers</span>
        </div>
        <button className="bg-blue-500 text-white text-xs py-1 rounded-md px-3">
          My Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
