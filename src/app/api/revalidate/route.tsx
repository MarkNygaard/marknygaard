import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const token = req.nextUrl.searchParams.get('token');

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({
      status: 401,
      body: { error: 'Invalid token' },
    });
  }

  try {
    revalidateTag('datocms');
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: 'Failed to clear the cache', error },
    });
  }

  return NextResponse.json({ status: 200, body: { status: 'Cache Cleared' } });
}
