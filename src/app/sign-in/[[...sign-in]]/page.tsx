import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <SignIn />
    </div>
  );
}
