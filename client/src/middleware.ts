import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { SessionToken } from "./types/shared/session";

function checkIsAdmin(session: SessionToken){
  return session.roles.some(role => role.rol === "ROLE_ADMIN")
}

export default withAuth(
  function middleware(req : NextRequestWithAuth){
    const session = req.nextauth.token as unknown as SessionToken
    if (session && session.roles){
      const url = req.nextUrl.clone()
      const isAdmin = checkIsAdmin(session)


      const allowedPathsForEveryUser = ["/_next/image", "/image", '/authorize/callback']

      if(allowedPathsForEveryUser.some(path => url.pathname.startsWith(path))){
        return NextResponse.next()
      }

      // Si no es admin y está en una ruta de admin (es consultor o cliente) 
      if (!isAdmin && !url.pathname.startsWith("/my")){
        url.pathname = "/my/proyectos"
        return NextResponse.redirect(url)
      }

      // Si es admin pero está en una ruta de consultor
      if (isAdmin && url.pathname.startsWith("/my")){
        url.pathname = "/"
        return NextResponse.redirect(url)
      }
    }
    return NextResponse.next()
  },
  {
  pages: {
    signIn: "/auth/login",
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!images/auth/auth-panel.jpg|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
