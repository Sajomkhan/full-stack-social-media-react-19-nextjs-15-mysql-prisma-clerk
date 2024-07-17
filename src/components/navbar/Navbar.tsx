import Link from "next/link";
import MobileManue from "./MobileManue";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-20 flex items-center justify-between">
      {/* ==========LEFT========== */}
      <div className="w-1/5 flex items-center justify-between md:hidden lg:block font-bold text-xl text-blue-700">
        <Link href="/">AJOMSOCIAL</Link>
      </div>
      {/* ==========CENTER========== */}
      <div className="w-2/5 hidden md:flex">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex gap-2">
            <Image src="/home.png" width={14} height={14} alt="" />
            <span>Home</span>
          </Link>
          <Link href="/" className="flex gap-2">
            <Image src="/friends.png" width={14} height={14} alt="" />
            <span>Friends</span>
          </Link>
          <Link href="/" className="flex gap-2">
            <Image src="/stories.png" width={14} height={14} alt="" />
            <span>Stories</span>
          </Link>
        </div>
      </div>
      {/* ==========RIGHT========== */}
      <div className="w-2/5 lg:hidden flex items-center gap-4 xl:gap-8 justify-end">
        <MobileManue />
      </div>
    </div>
  );
};

export default Navbar;
