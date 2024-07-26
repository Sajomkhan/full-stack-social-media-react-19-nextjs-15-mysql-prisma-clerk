import Image from "next/image";
import Comments from "./Comments";

const Post = () => {
  return (
    <div className="flex flex-col gap-4 border-b-8 border-slate-100 pb-4">
      {/* ==========USER========= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/noavatar.png"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">Jack McBride</span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* ==========DESC========= */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="/postimage.jpg"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sed
          vitae vel adipisci repellendus deleniti id ipsam sequi magnam
          dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dicta sed vitae vel adipisci repellendus deleniti id ipsam sequi
          magnam dignissimos.
        </p>
      </div>
      {/* ==========INTERACTION========= */}
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-slate-50 py-1 px-2 rounded-lg">
            <Image
              src="/like.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123 <span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 py-1 px-2 rounded-lg">
            <Image
              src="/comment.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              24 <span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
        <div className="flex items-center gap-2 bg-slate-50 py-1 px-2 rounded-lg">
            <Image
              src="/share.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              123 <span className="hidden md:inline">Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
