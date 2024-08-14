"use client"

import Image from "next/image"

const PostInteraction = ({postId, likes, commentsNumber}:{postId:number, likes:string[], commentsNumber:number}) => {
  return (
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
        <span className="text-gray-500">Share</span>
      </div>
    </div>
  </div>
  )
}

export default PostInteraction