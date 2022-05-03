const API_URL = 'https://graphql.datocms.com';
const API_TOKEN = process.env.DATOCMS_API_TOKEN;

async function fetchAPI(query, { variables }: any = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getAllPagesWithSlug() {
  const data = await fetchAPI(`
    {
      allPages(orderBy: navigationSorting_ASC, filter: {slug: {neq: ""}}) {
        slug
      }
    }
  `);
  return data?.allPages;
}

export async function getMainSeo() {
  const data = await fetchAPI(`
    {
      site: _site {
        favicon: faviconMetaTags {
          attributes
          content
          tag
        }
      }
    }
  `);
  return data;
}

export async function getAllPages() {
  const data = await fetchAPI(
    `
    {
      allPages(orderBy: navigationSorting_ASC) {
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
        id
        name
        slug
        content {
          ... on ImageRecord {
            __typename
            id
            image {
              responsiveImage(imgixParams: { fit: crop, w: 288, h: 288, auto: format }) {
                srcSet
                webpSrcSet
                sizes
                src
                width
                height
                aspectRatio
                alt
                title
                base64
              }
            }
          }
          ... on TextRecord {
            __typename
            id
            structuredText {
              value
            }
          }
          ... on TextImageRecord {
            __typename
            id
            structuredText {
              value
            }
            imageLocation
            imageStyle
            image {
              responsiveImage(imgixParams: { fit: crop, w: 288, h: 288, auto: format }) {
                srcSet
                webpSrcSet
                sizes
                src
                width
                height
                aspectRatio
                alt
                title
                base64
              }
            }
          }
          ... on FeaturedRecord {
            __typename
            id
            posts {
              id
              title
              slug
            }
          }
          ... on BlogRecord {
            id
            imageBoolean
          }
          ... on GridRecord {
            __typename
            id
            title
            mobileColumns
            tabletColumns
            desktopColumns
            gap
            height
            sections {
              ... on GridImageRecord {
                __typename
                id
                mobilePosition
                tabletPosition
                desktopPosition
                image {
                  responsiveImage(imgixParams: { fit: crop, crop: focalpoint, ar: "1:1", minH: 384, auto: format }) {
                    srcSet
                    webpSrcSet
                    sizes
                    src
                    width
                    height
                    aspectRatio
                    alt
                    title
                    base64
                  }
                }
              }
              ... on GridTextRecord {
                __typename
                id
                mobilePosition
                tabletPosition
                desktopPosition
                structuredText {
                  value
                }
              }
            }
          }
        }
      }
    }
  `
  );
  return data?.allPages;
}

export async function getPage(slug) {
  const data = await fetchAPI(
    `
  query PageBySlug($slug: String) {
    site: _site {
      favicon: faviconMetaTags {
        attributes
        content
        tag
      }
    }
    page(filter: {slug: {eq: $slug}}) {
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
      id
      name
      slug
      content {
        ... on ImageRecord {
          __typename
          id
          image {
            responsiveImage(imgixParams: { fit: crop, w: 288, h: 288, auto: format }) {
              srcSet
              webpSrcSet
              sizes
              src
              width
              height
              aspectRatio
              alt
              title
              base64
            }
          }
        }
        ... on TextRecord {
          __typename
          id
          structuredText {
              value
            }
        }
        ... on TextImageRecord {
          __typename
          id
          structuredText {
            value
          }
          imageLocation
          imageStyle
          image {
            responsiveImage(imgixParams: { fit: crop, w: 288, h: 288, auto: format }) {
              srcSet
              webpSrcSet
              sizes
              src
              width
              height
              aspectRatio
              alt
              title
              base64
            }
          }
        }
        ... on FeaturedRecord {
          __typename
          id
          posts {
            id
            title
            slug
          }
        }
        ... on BlogRecord {
          __typename
          id
          imageBoolean
        }
        ... on GridRecord {
          __typename
          id
          title
          mobileColumns
          tabletColumns
          desktopColumns
          gap
          height
          sections {
            ... on GridImageRecord {
              __typename
              id
              mobilePosition
              tabletPosition
              desktopPosition
              image {
                responsiveImage(imgixParams: { fit: crop, crop: focalpoint, ar: "1:1", minH: 384, auto: format }) {
                  srcSet
                  webpSrcSet
                  sizes
                  src
                  width
                  height
                  aspectRatio
                  alt
                  title
                  base64
                }
              }
            }
            ... on GridTextRecord {
              __typename
              id
              mobilePosition
              tabletPosition
              desktopPosition
              structuredText {
                value
              }
            }
          }
        }
      }
    }
  }
  `,
    {
      variables: {
        slug,
      },
    }
  );
  return data;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      allPosts(filter: {slug: {neq: ""}}) {
        slug
      }
    }
  `);
  return data?.allPosts;
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
    {
      allPosts(orderBy: date_DESC) {
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
        id
        title
        slug
        date
        author {
          name
          picture {
            responsiveImage(imgixParams: { fit: crop, w: 48, h: 48, auto: format, mask: ellipse }) {
              srcSet
              webpSrcSet
              sizes
              src
              width
              height
              aspectRatio
              alt
              title
              base64
            }
          }
        }
        category {
          name
          slug
        }
        coverImage {
          responsiveImage(imgixParams: { fit: crop, w: 410, h: 178, auto: format }) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            base64
          }
        }
        content {
          value
          blocks {
            __typename
            ... on ImageRecord {
              id
              image {
                responsiveImage(imgixParams: { fit: clip, auto: format }) {
                  srcSet
                  webpSrcSet
                  sizes
                  src
                  width
                  height
                  aspectRatio
                  alt
                  title
                  base64
                }
              }
            }
          }
        }
        excerpt
      }
    }
    `
  );
  return data?.allPosts;
}

export async function getPost(slug) {
  const data = await fetchAPI(
    `
  query PageBySlug($slug: String) {
    site: _site {
      favicon: faviconMetaTags {
        attributes
        content
        tag
      }
    }
    post(filter: {slug: {eq: $slug}}) {
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
      id
      title
      slug
      date
      author {
        name
        picture {
          responsiveImage(imgixParams: { fit: crop, w: 48, h: 48, auto: format, mask: ellipse }) {
            srcSet
            webpSrcSet
            sizes
            src
            width
            height
            aspectRatio
            alt
            title
            base64
          }
        }
      }
      category {
        name
        slug
      }
      coverImage {
        responsiveImage(imgixParams: { fit: max, w: 2000, h: 1000, auto: format }) {
          srcSet
          webpSrcSet
          sizes
          src
          width
          height
          aspectRatio
          alt
          title
          base64
        }
      }
      content {
        value
        blocks {
          __typename
          ... on ImageRecord {
            id
            image {
              responsiveImage(imgixParams: { fit: clip, auto: format }) {
                srcSet
                webpSrcSet
                sizes
                src
                width
                height
                aspectRatio
                alt
                title
                base64
              }
            }
          }
        }
      }
      excerpt
    }
  }
  `,
    {
      variables: {
        slug,
      },
    }
  );
  return data;
}
