
import Image from "next/image";

const AddPost = () => {

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* =======AVATAR========= */}
      <div className="">
        <Image
          src="/postimage.jpg"
          alt=""
          width={50}
          height={50}
          className="w-12 h-12 object-cover rounded-full ring-1"
        />
      </div>
      {/* =======TEXT POST========= */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form action="" className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg py-2 px-4"
            name="desc"
          ></textarea>
          <Image
            src="/emoji.png"
            alt=""
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button>Send</button>
        </form>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-3 md:gap-7 flex-wrap mt-4 text-gray-400 text-xs md:text-sm">
          <div className="flex items-center gap-1 cursor-pointer">
            <Image src="/addimage.png" alt="" width={16} height={16} />
            Photo
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={16} height={16} />
            Video
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <Image src="/poll.png" alt="" width={16} height={16} />
            Poll
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <Image src="/addevent.png" alt="" width={16} height={16} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
