import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Usuario } from "./types/usuario";

function checkIsAdmin(session: Usuario){
  return session.roles.some(role => role.rol === "ROLE_ADMIN")
}

export default withAuth(
  function middleware(req : NextRequestWithAuth){
    const session = req.nextauth.token as Usuario
    if (session && session.roles){
      const url = req.nextUrl.clone()
      const isAdmin = checkIsAdmin(session)

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
