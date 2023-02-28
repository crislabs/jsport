
import { CreatePage, Page } from '@/interfaces/page';
import axios from 'axios';
export async function createPortfolioPage0(input: CreatePage): Promise<Page> {
  const {
    data: {
      data: { portfolioCreatePage0 },
    },
  } = await axios({
    url: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/graphql`,
    method: 'post',
    data: {
      query: `
      mutation PortfolioCreatePage0($input: CreatePage!) {
        portfolioCreatePage0(input: $input) {
          parentId
        }
      }
        `,
      variables: { input },
    },
  });
  return portfolioCreatePage0;
}

// export const createPortfolioPage0 = async (input: CreatePage) => {
//   const response = await fetch("http://localhost:6002/graphql",
//   {
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify({
//       query: `
//       mutation PortfolioCreatePage0($input: CreatePage!){
//         portfolioCreatePage0(input: $input){
//           _id
//         }
//       }
//         `,
//       variables: {
//         input
//       },
//     }),
//   });
//   const { data: {portfolioCreatePage0} } = await response.json();
//   return  portfolioCreatePage0
// }