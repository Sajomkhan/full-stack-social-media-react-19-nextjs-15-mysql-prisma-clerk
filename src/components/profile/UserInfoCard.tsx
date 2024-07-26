import Image from "next/image";
import Link from "next/link";

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-grey-500 font font-semibold">
          User Information
        </span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Azman Khan</span>
        <span className="text-sm">@ajomnkhan</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
        exercitationem quisquam repudiandae magnam.
      </p>
      <div className="flex items-center gap-2">
        <Image src="/map.png" alt="" width={16} height={16} />
        <span>
          Living in <b>Abran</b>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Image src="/school.png" alt="" width={16} height={16} />
        <span>
          Went to <b>Dhaka Univercity</b>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Image src="/map.png" alt="" width={16} height={16} />
        <span>
          Work at <b>IT Center</b>
        </span>
      </div>
      <div className=" flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <Image src="/link.png" alt="" width={16} height={16} />
          <Link href="/https://lama.dev" className="text-blue-500 font-medium">
            Ajom.dev
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/date.png" alt="" width={16} height={16} />
          <span>Joined November 2024</span>
        </div>
      </div>
      <button className="bg-blue-500 text-white text-sm rounded-md p-2">
        Follow
      </button>
      <span className="text-red-400 self-end text-sm">Block User</span>
    </div>
  );
};

export default UserInfoCard;
