import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRote = createRouteMatcher(["/settings(.*)", "/"])

export default clerkMiddleware((auth, req) => {
  if(isProtectedRote(req)) auth().protect()
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};