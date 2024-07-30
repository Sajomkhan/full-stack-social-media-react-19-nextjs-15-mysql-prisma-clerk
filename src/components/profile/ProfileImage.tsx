import Image from "next/image";
import React from "react";

export type User = {
  id: string;
  username: string;
  avatar: string | null;
  cover?: string | null;
  name?: string | null;
  surname?: string | null;
  _count: { followers: number; followings: number; posts: number };
};

interface IUser {
  user: User;
}

const ProfileImage: React.FC<IUser> = ({ user }) => {

  return (
    <div className="flex flex-col gap-6 bg-white shadow-md rounded-lg text-sm p-8">
      <div className="h-64 relative">
        <Image
          src={user.cover || "/postimage.jpg"}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || "/noAvatar"}
          alt=""
          width={128}
          height={128}
          className="object-cover rounded-full w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 ring-2 ring-white z-10"
        />
      </div>
      <div className="flex flex-col items-center gap-4 mt-14">
        <h1 className="text-xl font-semibold">
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </h1>
        <div className="flex items-center gap-10 font-semibold text-gray-600">
          <div className="flex flex-col gap-1 items-center">
            <span>{user._count.posts}</span>
            <span>Posts</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span>{user._count.followers}</span>
            <span>Followers</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span>{user._count.followings}</span>
            <span>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
