import Link from "next/link";
import MobileManue from "./MobileManue";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="h-20 flex items-center justify-between">
      {/* ==========LEFT========== */}
      <div className="flex items-center justify-between md:hidden lg:block font-bold text-xl text-blue-700">
        <Link href="/">AJOMSOCIAL</Link>
      </div>
      {/* ==========CENTER========== */}
      <div className="hidden md:flex">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              width={14}
              height={14}
              alt=""
              className="w-4 h-4"
            />
            <span>Home</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              width={14}
              height={14}
              alt=""
              className="w-4 h-5"
            />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              width={14}
              height={14}
              alt=""
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>
      </div>
      {/* ==========RIGHT========== */}
      <div className="flex items-center gap-4 xl:gap-8 justify-end">
        {/* LOADING */}
        <ClerkLoading>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </ClerkLoading>
        <ClerkLoaded>
          {/* SIGN IN */}
          <SignedIn>
            <div className="cursor-pointer">
              <Image src="/noAvatar.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/messages.png" alt="" width={20} height={20} />
            </div>
            <div className="cursor-pointer">
              <Image src="/notificationS.png" alt="" width={20} height={20} />
            </div>
            <UserButton />
          </SignedIn>
          {/* SIGN OUT */}
          <SignedOut>
            <div className="flex items-center gap-3">
              <Image
                src="/noAvatar.png"
                alt=""
                width={20}
                height={20}
                className="rounded-full"
              />
              <Link href="/sign-in">Loging/Register</Link>
            </div>
          </SignedOut>
        </ClerkLoaded>
        <MobileManue />
      </div>
    </div>
  );
};

export default Navbar;
