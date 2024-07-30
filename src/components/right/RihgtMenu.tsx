import { User } from "@prisma/client";
import UserInfoCard from "../profile/UserInfoCard";
import UserMediaCard from "../profile/UserMediaCard";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequest from "./FriendRequest";
import { Suspense } from "react";

const RihgtMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RihgtMenu;
