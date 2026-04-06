import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
//protected routes
const isProtectedRoute = createRouteMatcher([
  '/recipe(.*)',
  '/recipes(.*)',
  '/dashboard (.*)',
  '/pantry(.*)',
 
]);
//middleware to protect routes
export default clerkMiddleware(async (auth, req) => {//check if user is authenticated and if the route is protected, if not redirect to sign in page
  const { userId,redirectToSignIn } =  await auth;
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();//allow the request to continue if the user is authenticated or if the route is not protected

  });

 
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};