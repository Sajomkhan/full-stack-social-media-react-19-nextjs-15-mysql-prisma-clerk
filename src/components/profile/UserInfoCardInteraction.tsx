"use client";

const UserInfoCardInteraction = () => {
  const follow = async () => {};
  const block = async () => {};

  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white text-sm rounded-md p-2">
          Follow
          {/* {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"} */}
        </button>
      </form>
      <form action={block} className="self-end ">
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            Block
            {/* {optimisticState.blocked ? "Unblock User" : "Block User"} */}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserInfoCardInteraction;
