"use client";

import { useFormStatus } from "react-dom";


const UpdateButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="bg-blue-600 text-white cursor-pointer mt-3 p-2 disabled:bg-opacity-50 disabled:cursor-not-allowed" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
