"use client";

import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";
import { FollowRequest, User } from "@prisma/client";
import Image from "next/image";
import { useOptimistic, useState } from "react";

type followRequestsWithUser = FollowRequest & {
  sender: User;
};

export const FriendRequestList = ({
  fetchFollowRequests,
}: {
  fetchFollowRequests: followRequestsWithUser[];
}) => {
  const [followRequestState, setFollowRequestState] =
    useState(fetchFollowRequests);

  const accept = async (followRequestId: number, userId: string) => {
    removeOptimisticFollowRequest(followRequestId);
    try {
      await acceptFollowRequest(userId);
      setFollowRequestState((prev) =>
        prev.filter((req) => req.id !== followRequestId)
      );
    } catch (err) {}
  };

  const decline = async (followRequestId: number, userId: string) => {
    removeOptimisticFollowRequest(followRequestId);
    try {
      await declineFollowRequest(userId);
      setFollowRequestState((prev) =>
        prev.filter((req) => req.id !== followRequestId)
      );
    } catch (err) {}
  };

  const [optimisticFollowRequest, removeOptimisticFollowRequest] =
    useOptimistic(followRequestState, (state, value: number) =>
      state.filter((req) => req.id !== value)
    );

  if (!fetchFollowRequests) return null;

  return (
    <>
      {optimisticFollowRequest.map((request) => (
        <div className="flex items-center justify-between" key={request.id}>
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name && request.sender.surname
                ? request.sender.name + " " + request.sender.surname
                : request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={()=>accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={()=>decline(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};
