import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/blog/2020/03/hue-dimmer-script-in-node-red') {
    url.pathname = '/blog/hue-dimmer-switch-in-node-red';
    return NextResponse.redirect(url);
  }
}
