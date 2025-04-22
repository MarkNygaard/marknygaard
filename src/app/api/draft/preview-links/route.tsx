import { NextRequest } from 'next/server';

type generatePreviewUrlParams = {
  item: any;
  itemType: any;
};

const generatePreviewUrl = ({ item, itemType }: generatePreviewUrlParams) => {
  switch (itemType.attributes.api_key) {
    case 'page':
      return `/${item.attributes.slug}`;
    case 'post':
      return `/blog/${item.attributes.slug}`;
  }
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export async function OPTIONS() {
  return new Response('ok', {
    status: 200,
    headers,
  });
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const token = searchParams.get('token');

  if (token !== process.env.DRAFT_SECRET_TOKEN)
    return new Response('Invalid token', { status: 401 });

  const parsedRequest = await request.json();
  const url = generatePreviewUrl(parsedRequest);

  if (!url) {
    return new Response(JSON.stringify({ previewLinks: [] }), {
      status: 200,
      headers,
    });
  }

  const baseUrl = process.env.URL as string;
  const isPublished = parsedRequest.item.meta.status === 'published';

  const previewLinks = [];

  if (isPublished)
    previewLinks.push({
      label: 'Published version',
      url: `${baseUrl}/api/draft/disable?url=${url}`,
    });

  if (!isPublished)
    previewLinks.push({
      label: 'Draft version',
      url: `${baseUrl}/api/draft/enable?url=${url}&token=${token}`,
    });

  return new Response(JSON.stringify({ previewLinks }), {
    status: 200,
    headers,
  });
}
