import Layout from "@/layouts/HeaderLayout";
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  getPortfolioArticlesBySiteId,
  getPortfolioArticlesWithCursorBySiteId,
} from "@/lib/articles/read";
import GridArticles from "@/components/grid/GridArticles";
// import GridArticles from "@/components/grid/ListArticles";

export default function Page() {
  return (
    <>
      <Head>
        <title>Blog | Jesus Calamani</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridArticles />
      
    </>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["articles", { first: 256 }, process.env.NEXT_PUBLIC_SITE_URL as string],
    async () =>
      getPortfolioArticlesWithCursorBySiteId(
        { first: 256 },
        process.env.NEXT_PUBLIC_SITE_URL as string
      )
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    },
  };
};
