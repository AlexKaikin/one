import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { Roles } from './entities'

const AdminAllowedPaths = ['/admin']

export default withAuth(
  async function middleware(request: NextRequest) {
    const user = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    const isAdminAllowedPath = AdminAllowedPaths.some(path =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (isAdminAllowedPath && user?.role !== Roles.admin) {
      return NextResponse.rewrite(request.nextUrl.origin + '/forbidden')
    }
  },
  {
    callbacks: { authorized: ({ token }) => !!token },
  }
)

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/club/:path*'],
}
