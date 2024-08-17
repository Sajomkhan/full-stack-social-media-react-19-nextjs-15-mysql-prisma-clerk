import prisma from "@/lib/client";
import Image from "next/image";
import CommentList from "./CommentList";

const Comments = async({postId}: {postId: number}) => {

  const comments = await prisma.comment.findFirst({
    where:{
      postId
    },
    include:{
      user:true
    }
  })

  return (
    <div className="text-sm">
      {/* =========WRITE COMMNET======== */}
      <CommentList comments = {comments} postId={postId} />
    </div>
  );
};

export default Comments;
