import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoriesList from "./StoriesList";

const Stories = async() => {

  const {userId: currentUserId} = auth()

  if(!currentUserId) return null

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR:[
        {
          user:{
            followers:{
              some:{
                followerId: currentUserId
              }
            }
          }
        },
        {
          user:{
            followings:{
              some:{
                followerId: currentUserId
              }
            }
          }
        },
        {
          userId: currentUserId
        }
  
      ]
    },
    include:{
      user: true
    }
  })

  console.log(stories);
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-sm scrollbar-hide">
      <div className="flex gap-8 w-max">
        <StoriesList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
