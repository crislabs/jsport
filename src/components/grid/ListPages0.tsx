

import { useGetPage0WithCursor } from '@/hooks/usePages0';
import { SelectionProvider } from '@/providers/SelectionContext';
import { CardPage0 } from '../card/CardPage0';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';

interface Props {
  // listPage: ListPage
}

export function GridPages0(props: Props) {
  const { data: pages0 } = useGetPage0WithCursor()
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