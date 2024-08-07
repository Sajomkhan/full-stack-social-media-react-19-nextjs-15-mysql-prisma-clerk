"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span
        className="text-blue-600 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="fixed w-screen min-h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={updateProfile}
            className="p-12 bg-white rounded-lg shadow-md flex flex-col w-1/3 relative"
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the navbar profile to change the avatar or username.
            </div>
            {/* COVER PIC UPLOAD */}
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="">Cover Picture</label>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src={user.cover || "/noCover.png"}
                  alt=""
                  width={48}
                  height={32}
                  className=" w-12 h-8 rounded-md object-cover"
                ></Image>
                <span className="text-xs underline text-gray-600">Change</span>
              </div>
            </div>
            {/* INPUT WRAPPER */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              {/* INPUT */}
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-xs text-gray-500">
                  First Name
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
                  placeholder={user.discription || "Life is beautiful..."}
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
            <button className="bg-blue-600 text-white cursor-pointer mt-7 p-2">Update</button>
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
