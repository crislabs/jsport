import { Page } from '@/interfaces/page';
import { SelectionProvider } from '@/providers/SelectionContext';
import { CardPage1 } from '../card/CardPage1';
import { HeadingDashboard } from '../HeadingDashboard';
import { HeadingDashboardOption } from '../HeadingDashboardOptions';
import { useGetPage1WithCursor } from '@/hooks/usePages1';

interface Props {
  page: Page
  id: string
}

export function GridPages1(props: Props) {
  const { data: pages1 } = useGetPage1WithCursor(props.id)
  return (
    <SelectionProvider ids={pages1?.page.edges?.map(data => data.node._id) as string[]}>
      <HeadingDashboard title={props.page.data.name} page={props.page} />
      
      <HeadingDashboardOption />
      <div className={'grid-sites'}>
        {pages1?.page.edges.map((data, i) => (
          <CardPage1 key={i} page={data.node} />
        ))}
      </div>
    </SelectionProvider>
  );
}