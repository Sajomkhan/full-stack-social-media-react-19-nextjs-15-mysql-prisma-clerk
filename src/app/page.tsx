import AddPost from "@/components/center/AddPost";
import Post from "@/components/center/Post";
import Stories from "@/components/center/Stories";
import LeftMenu from "@/components/left/LeftMenu";
import RihgtMenu from "@/components/right/RihgtMenu";

const Homepage = () => {
  return (
    <div className="flex gap-6 pt-6">
      {/* =========LEFT========== */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home"/>
      </div>
      {/* =========CENTER========== */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-4">
          <Stories />
          <AddPost />
          <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-6">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
      {/* =========RIGHT========== */}
      <div className="hidden lg:block w-[30%]">
        <RihgtMenu />
      </div>
    </div>
  );
};

export default Homepage;
