

import { Article, CreateArticle } from '@/interfaces/article';
import axios from 'axios';

export async function createPortfolioArticle(input: CreateArticle): Promise<Article> {
  const {
    data: {
      data: { portfolioCreateArticle },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioCreateArticle($input: CreateArticle!) {
        portfolioCreateArticle(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  // .then((res) => res.data)
  return portfolioCreateArticle;
}
