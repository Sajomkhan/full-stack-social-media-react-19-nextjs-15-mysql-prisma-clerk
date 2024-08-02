import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { FriendRequestList } from "./FriendRequestList";

const FriendRequest = async() => {

  const {userId} = auth()

  if(!userId) return null

  const fetchFollowRequests = await prisma.followRequest.findMany({
    where: {
      reciverId: userId
    },
    include: {
      sender: true
    }
  })

  if(fetchFollowRequests.length === 0) return null

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-grey-500 font font-semibold">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* USER */}
      <FriendRequestList fetchFollowRequests = {fetchFollowRequests}/>
      
    </div>
  );
};

export default FriendRequest;
