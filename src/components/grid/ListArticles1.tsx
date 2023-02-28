
import { useGetArticles } from '@/hooks/useArticles1';
import { Page } from '@/interfaces/page';
import { getPortfolioGetPage0, getPortfolioGetPages0WithCursor } from '@/lib/pages/page0/read';
import { SelectionProvider } from '@/providers/SelectionContext';

import { useQuery } from '@tanstack/react-query';
// import { getPortfolioGetArticlesWithCursor } from 'app/blog/page';
import { CardArticle } from '../card/CardArticle';
import { CardPage0 } from '../card/CardPage0';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  id: string
  page: Page
}

export function GridArticles1(props: Props) {
  const { data: pages0 } = useGetArticles(props.id)
  return (
    <SelectionProvider ids={pages0?.page.edges?.map(data => data.node._id) as string[]}>
      <HeadingDashboard title={props.page.data.name} page={props.page} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {pages0?.page.edges.map((data, i) => (
          <CardArticle key={i} article={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}