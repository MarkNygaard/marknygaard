import { algoliasearch } from 'algoliasearch';
import { AllPostsDocument } from 'infrastructure/generated/graphql';
import queryDatoCMS from 'infrastructure/queryDatoCMS';
import { NextResponse } from 'next/server';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID ?? '',
  process.env.ALGOLIA_API_KEY ?? '',
);

const indexName = 'blog_posts';

function extractTextFromDAST(dast: any): string {
  if (!dast || typeof dast !== 'object') return '';

  let textParts: string[] = [];

  if (Array.isArray(dast.children)) {
    for (const child of dast.children) {
      if (child.type === 'paragraph' && Array.isArray(child.children)) {
        for (const span of child.children) {
          if (span.type === 'span' && span.value) {
            textParts.push(span.value);
          }
        }
      } else if (child.type === 'link' && Array.isArray(child.children)) {
        for (const span of child.children) {
          if (span.type === 'span' && span.value) {
            textParts.push(span.value);
          }
        }
      }
    }
  }

  return textParts.join(' ');
}

function extractFullText(sectionArray: any[]): string {
  if (!sectionArray || !Array.isArray(sectionArray)) return '';

  return sectionArray
    .flatMap((section) => {
      let textParts: string[] = [];

      if (section.description?.value?.schema === 'dast') {
        textParts.push(extractTextFromDAST(section.description.value.document));
      }

      if (section.section) {
        textParts.push(extractFullText(section.section));
      }

      return textParts;
    })
    .join(' ');
}

async function fetchBlogPosts() {
  const { allPosts } = await queryDatoCMS(AllPostsDocument);

  return allPosts.map((post) => {
    const content = extractFullText(post.section);

    return {
      objectID: post.id,
      title: post.title,
      description: post.seoSettings?.description || '',
      content,
      url: `/blog/${post.slug}`,
      image: post.coverImage?.responsiveImage?.src || '',
      date: post.date,
    };
  });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const providedSecret =
      url.searchParams.get('secret') || req.headers.get('x-webhook-secret');

    if (providedSecret !== process.env.ALGOLIA_SYNC_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    const body = await req.json();

    if (body.event_type !== 'publish') {
      return NextResponse.json({ success: false, message: 'Ignored event' });
    }

    const blogPosts = await fetchBlogPosts();

    const response = await client.saveObjects({
      indexName,
      objects: blogPosts,
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
