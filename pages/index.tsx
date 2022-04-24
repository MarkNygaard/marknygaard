import React from 'react';
import Layout from '../components/Layout';
import PageSection from 'components/PageSection';
import { getAllPages, getAllPosts } from '../lib/api';

export default function Home({ allPages, allPosts }) {
  return (
    <Layout allPages={allPages}>
      {allPages?.map((page) => {
        return (
          <div key={page.id}>
            {page.name === 'Home' ? (
              <div>
                {page?.content.map((content, i) => {
                  return (
                    <PageSection key={i} details={content} posts={allPosts} />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPages = (await getAllPages()) || [];
  const allPosts = (await getAllPosts()) || [];

  return {
    props: {
      allPages,
      allPosts,
    },
  };
}
