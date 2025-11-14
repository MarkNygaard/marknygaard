import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Redirect old blog post URL
  if (url.pathname === '/blog/2020/03/hue-dimmer-script-in-node-red') {
    url.pathname = '/blog/hue-dimmer-switch-in-node-red';
    return NextResponse.redirect(url);
  }

  // Add X-Robots-Tag header for all other pages
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'index, follow');
  return response;
}
