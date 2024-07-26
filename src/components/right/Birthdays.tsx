import Image from "next/image";
import Link from "next/link";

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      <div className="text-grey-500 font-semibold mb-3">Birthdays</div>
      {/* =========USER========= */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/postimage.jpg"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold text-gray-600">Wayne Burton</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Cleberate
          </button>
        </div>
      </div>
      {/* =========UPCOMING========= */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4 mt-3">
        <Image src="/gift.png" alt="" width={24} height={24} />
        <Link href="/" className="flex flex-col gap-1 text-xs">
          <span className="text-gray-500 font-semibold">
            Upcoming Birthdays
          </span>
          <span className="text-gray-500">See other 16 upcoming birthdays</span>
        </Link>
      </div>
    </div>
  );
};

export default Birthdays;
