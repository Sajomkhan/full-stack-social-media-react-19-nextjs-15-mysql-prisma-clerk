import Feed from "@/components/center/Feed"
import LeftMenu from "@/components/left/LeftMenu"
import ProfileImage from "@/components/profile/ProfileImage"
import RihgtMenu from "@/components/right/RihgtMenu"
import prisma from "@/lib/client"

const ProfilePage = async({params}:{params:{username: string}}) => {

  const user = await prisma.user.findFirst({
    where: {
      username: params.username
    }
  })

  return (
    <div className="flex gap-6 pt-6">
    {/* =========LEFT========== */}
    <div className="hidden xl:block w-[20%]">
      <LeftMenu type="profile"/>
    </div>
    {/* =========CENTER========== */}
    <div className="w-full lg:w-[70%] xl:w-[50%]">
      <div className="flex flex-col gap-6">
        <ProfileImage />
        <Feed />
      </div>
    </div>
    {/* =========RIGHT========== */}
    <div className="hidden lg:block w-[30%]">
      <RihgtMenu userId="test"/>
    </div>
  </div>
  )
}

export default ProfilePage