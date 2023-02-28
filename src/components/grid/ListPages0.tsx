

import { ListPage } from '@/interfaces/page';
import { getPortfolioGetPages0WithCursor } from '@/lib/pages/page0/read';
import { SelectionProvider } from '@/providers/SelectionContext';
import { useQuery } from '@tanstack/react-query';
// import { getPortfolioGetPages0WithCursor } from 'lib/pages/page0/read';
import { CardPage0 } from '../card/CardPage0';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  // listPage: ListPage
}

export function GridPages0(props: Props) {
  const { data: pages0 } = useQuery<ListPage>({
    queryKey: ['portfolio-get-pages0-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string],
    queryFn: () => getPortfolioGetPages0WithCursor( {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string),
    // initialData: props.listPage,
  });
  return (
    <SelectionProvider ids={pages0?.page.edges?.map(data => data.node._id) as string[]}>
      <HeadingDashboard title={"pages0"} />
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {pages0?.page.edges.map((data, i) => (
          <CardPage0 key={i} page={data.node} />
        ))}
      </div>
      {/* //   
    //   {data.pageData.count > 12 && <PaginationPages pages={data} />} */}

    </SelectionProvider>
  );
}