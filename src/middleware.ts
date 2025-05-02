import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const config = {
  matcher: ["/dash/:path*"]
}

export async function middleware(request: NextRequest) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}