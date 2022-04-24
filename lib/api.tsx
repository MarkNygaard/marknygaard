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

export async function getAllPages() {
  const data = await fetchAPI(
    `
    {
      allPages(orderBy: navigationSorting_ASC) {
        id
        name
        slug
        content {
          ... on ImageRecord {
            __typename
            id
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
              url
            }
          }
          ... on FeaturedRecord {
            __typename
            id
            featuredNumber
          }
          ... on BlogRecord {
            id
            imageBoolean
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
    page(filter: {slug: {eq: $slug}}) {
      id
      name
      slug
      content {
        ... on ImageRecord {
          __typename
          id
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
            url
          }
        }
        ... on FeaturedRecord {
          __typename
          id
          featuredNumber
        }
        ... on BlogRecord {
          __typename
          id
          imageBoolean
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
        id
        title
        slug
        date
        author {
          name
          picture {
            url
          }
        }
        category {
          name
          slug
        }
        content {
          value
          blocks {
            __typename
            ... on ImageRecord {
              id
              image {
                url
                width
                height
              }
            }
          }
        }
        coverImage {
          url
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
    post(filter: {slug: {eq: $slug}}) {
      id
      title
      slug
      date
      author {
        name
        picture {
          url
        }
      }
      category {
        name
        slug
      }
      content {
        value
        blocks {
          __typename
          ... on ImageRecord {
            id
            image {
              url
              width
              height
            }
          }
        }
      }
      coverImage {
        url
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
