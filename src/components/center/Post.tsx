import Image from "next/image";
import Comments from "./Comments";
import { Post as PostSchema, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";

type PostType = PostSchema & { user: User } & {
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

const Post = ({ post }: { post: PostType }) => {

  return (
    <div className="flex flex-col gap-4 border-b-8 border-slate-100 pb-4">
      {/* ==========USER========= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noavatar.png"}
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/* ==========DESC========= */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* ==========INTERACTION========= */}
      <PostInteraction
        postId={post.id}
        likes={post.likes.map((like)=>like.userId)}
        commentsNumber={post._count.comments}
      />
      <Comments postId={post.id}/>
    </div>
  );
};

export default Post;
