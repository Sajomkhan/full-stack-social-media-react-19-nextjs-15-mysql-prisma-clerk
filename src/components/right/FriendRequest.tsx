import Image from "next/image";
import Link from "next/link";

const FriendRequest = () => {
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
      <div className="flex justify-between items-center">
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
      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.pexels.com/photos/415263/pexels-photo-415263.jpeg?auto=compress&cs=tinysrgb&w=600"
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
      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=600"
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
    </div>
  );
};

export default FriendRequest;
