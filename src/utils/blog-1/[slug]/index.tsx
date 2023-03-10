import Layout from '@/layouts/HeaderLayout';
import React from 'react'
import Head from "next/head";
import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getPortfolioArticleBySlug, getPortfolioArticlesBySiteId } from '@/lib/articles/read';
import Post from '@/components/Post';

export default function Page() {
  return (
    <>
      <Head>
        <title>Astro 2 | Jesus Calamani</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Post />
    </>
  )
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const articles = await getPortfolioArticlesBySiteId(process.env.NEXT_PUBLIC_SITE_URL as string)
  // console.log('articles', )
  return {
    paths: articles.map(data => ({params: {slug: data.slug}})),
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  // console.log('params', params)
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["article", params?.slug as string],
    async () =>
      getPortfolioArticleBySlug(
        params?.slug as string,
        process.env.NEXT_PUBLIC_SITE_URL as string
      )
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10,
    },
  };
};