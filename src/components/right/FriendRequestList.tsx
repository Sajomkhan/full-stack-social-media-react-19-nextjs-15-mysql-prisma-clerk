"use client";

import { User } from "@clerk/nextjs/server";
import { FollowRequest } from "@prisma/client";
import Image from "next/image";

type followRequestsWithUser = FollowRequest & {
  sender: User;
};

export const FriendRequestList = ({
  fetchFollowRequests,
}: {
  fetchFollowRequests: followRequestsWithUser[];
}) => {
  if (!fetchFollowRequests) return null;

  fetchFollowRequests.map((followRequest) => {
    return (
      <div className="flex justify-between items-center" key={followRequest.id}>
        <div className="flex items-center gap-3">
          <Image
            src="https://images.pexels.com/photos/927451/pexels-photo-927451.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-600">Wayne Burton</span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/accept.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <Image
            src="/reject.png"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
    );
  });
};
