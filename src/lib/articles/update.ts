
import { Article, UpdateArticle, UpdateContentArticle } from '@/interfaces/article';
import axios from 'axios';

export async function updatePortfolioArticle(input: UpdateArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioUpdateArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdateArticle($input: UpdateArticle!) {
        portfolioUpdateArticle(input: $input) {
          _id
            data{
              name
              content
              description
              thumbnailUrl
            }
          slug
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioUpdateArticle;
}
export async function updatePortfolioArticleContent(input: UpdateContentArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioUpdateContentArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioUpdateContentArticle($input: UpdateContentArticle!) {
        portfolioUpdateContentArticle(input: $input) {
          _id
            data{
              name
              content
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
      variables: { input },
    },
  });
  return portfolioUpdateContentArticle;
}
