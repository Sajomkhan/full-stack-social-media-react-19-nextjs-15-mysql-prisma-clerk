"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import UpdateButton from "../right/UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [cover, setCover] = useState<any>();
  const [displayCoverImage, setDisplayCoverImage] = useState<string>("");

  useEffect(() => {
    setDisplayCoverImage(cover?.secure_url || user.cover || "/noCover.png");
  }, [cover]);

  const handleClose = () => {
    setToggle(false);
  };

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  useEffect(() => {
    state.success && router.refresh();
    setToggle(false);
    state.success && router.refresh();
  }, [state.success]);

  return (
    <div>
      <span
        className="text-blue-600 text-xs cursor-pointer"
        onClick={() => setToggle(true)}
      >
        Update
      </span>
      {toggle && (
        <div className="fixed w-screen min-h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="p-12 bg-white rounded-lg shadow-md flex flex-col w-1/3 relative"
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>
            {/* CLAUDINARY WIDGET */}
            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-2 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-4 cursor-pointer">
                      <Image
                        src={displayCoverImage}
                        alt=""
                        width={60}
                        height={40}
                        className=" w-15 h-10 rounded-md object-cover"
                      ></Image>
                      <span className="text-xs underline text-gray-600 hover:text-blue-500">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* INPUT WRAPPER */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "John"}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="name"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Doe"}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="surname"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Life is beautiful..."}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="description"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "Dhaka"}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="city"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "IEB"}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="school"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Web Developer"}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="work"
                />
              </div>
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "Ajom App"}
                  className="ring-1 ring-gray-300 p-1 rounded-md text-sm"
                  name="website"
                />
              </div>
            </div>
            {/* Success or Error Desplay */}
            {state.success && (
              <span className="text-green-500 mt-3">
                Profile has been updated!
              </span>
            )}
            {state.error && (
              <span className="text-red-500 mt-3">Something went wrong!</span>
            )}
            {/* Update Button */}
            <UpdateButton />
            <div
              className="absolute top-2 right-3 text-xl text-red-500 cursor-pointer p-2"
              onClick={handleClose}
            >
              x
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
