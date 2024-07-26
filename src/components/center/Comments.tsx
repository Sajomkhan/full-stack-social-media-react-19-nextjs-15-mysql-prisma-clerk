import Image from "next/image";

const Comments = () => {
  return (
    <div className="text-sm">
      {/* =========WRITE COMMNET======== */}
      <div className="flex items-center gap-4">
        <Image
          src="/postimage.jpg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex items-center justify-between bg-slate-100 rounded-full text-sm py-2 px-4 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none"
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cussor-pointer"
          />
        </div>
      </div>
      {/* =========COMMENTS======== */}
      <div className="flex items-center gap-4 mt-4">
        {/* AVATAR */}
        <Image
          src="/postimage.jpg"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full self-start"
        />
        {/* DESC */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-gray-600">Dernice Spencer</span>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            officiis enim repellendus inventore eligendi doloribus alias
            nostrum! Minus, at voluptatum assumenda vitae sunt, magni aperiam
            maxime nulla, eum harum laudantium!
          </p>
          <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
            <div className="flex items-center gap-2 bg-slate-100 py-0.5 px-2 rounded-md">
              <Image
                src="/like.png"
                alt=""
                width={12}
                height={12}
                className="cussor-pointer w-3 h-3"
              />
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">23 Likes</span>
            </div>
            <div className="bg-slate-100 py-0.5 px-2 rounded-md">Reply</div>
          </div>
        </div>
        {/* ICON */}
        <Image
          src="/more.png"
          alt=""
          width={16}
          height={16}
          className="cussor-pointer w-4 h-4 self-start"
        />
      </div>
    </div>
  );
};

export default Comments;
