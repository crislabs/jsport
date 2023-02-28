import { Article, ListArticle } from "@/interfaces/article";
import { ConnectionArgs } from "@/interfaces/site";

export async function getPortfolioArticleBySlug(slug: string, siteId: string): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query portfolioGetArticleBySlug($slug: String!, $siteId: String!){
        portfolioGetArticleBySlug(slug: $slug, siteId: $siteId){
          _id
            data{
              content
              name
              description
              thumbnailUrl
              updateDate{
                createdAt
              }
            }
          slug
          parentId
        }
      }
      `,
      variables: { slug, siteId },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticleBySlug)
}
export async function getPortfolioArticle(id: string): Promise<Article> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticle($id: String!){
        portfolioGetArticle(id: $id){
          _id
            data{
              content
              name
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
      `,
      variables: { id },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticle)
}

export async function getPortfolioArticles(): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticles{
        portfolioGetArticles{
          _id
          
        }
      }
      `,
      variables: {  },
    }),
  })
    .then(res => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticles)
}
export async function getPortfolioArticlesWithCursorByParentId(
  args: ConnectionArgs,
  parentId: string,
): Promise<ListArticle> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesWithCursorByParentId($args: ConnectionArgs!, $parentId: String!){
        portfolioGetArticlesWithCursorByParentId(args: $args, parentId:$parentId){
          page {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                _id
                data{
                  name
                  description
                  thumbnailUrl
                }
                slug
              }
            }
          }
          pageData {
            count
            limit
            offset
          }
       
          
        }
      }
      `,
      variables: { args, parentId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesWithCursorByParentId);
}
export async function getPortfolioArticlesWithCursorBySiteId(
  args: ConnectionArgs,
  siteId: string,
): Promise<ListArticle> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesWithCursorBySiteId($args: ConnectionArgs!, $siteId: String!){
        portfolioGetArticlesWithCursorBySiteId(args: $args, siteId:$siteId){
          page {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
              hasPreviousPage
            }
            edges {
              cursor
              node {
                _id
                data{
                  name
                  description
                  thumbnailUrl
                }
                slug
              }
            }
          }
          pageData {
            count
            limit
            offset
          }
       
          
        }
      }
      `,
      variables: { args, siteId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesWithCursorBySiteId);
}
export async function getPortfolioArticlesBySiteId(
  siteId: string,
): Promise<Article[]> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // next: { revalidate: 10 },
    // next: { revalidate: 86400 },
    body: JSON.stringify({
      query: `
      query PortfolioGetArticlesBySiteId( $siteId: String!){
        portfolioGetArticlesBySiteId(siteId:$siteId){
          _id
          slug
        }
      }
      `,
      variables: { siteId },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .then((result) => result.portfolioGetArticlesBySiteId);
}
