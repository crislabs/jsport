import { useRef } from 'react';
import { useLongPress } from 'ahooks';
import Link from 'next/link';
import { Page } from '@/interfaces/page';
import { useSelection } from '@/providers/SelectionContext';



interface Props {
  page?: Page;
}
export function CardPage2({ page }: Props) {
  const { selected, toggle, isSelected } = useSelection();
  const ref = useRef<HTMLDivElement>(null);
  useLongPress(() => toggle(page?._id!), ref, {
    moveThreshold: { x: 5, y: 5 },
  });
  return (
    <div className="card-dashboard group" >
      <input
        type="checkbox"
        className={`card-dashboard-input ${
          selected.length !== 0 && 'opacity-100'
        }`}
        onChange={() => toggle(page?._id!)}
        checked={isSelected(page?._id!)}
      />
      <div ref={ref} className="">
        <img
          className="h-[12rem] w-full object-cover"
          src={
            page?.data.thumbnailUrl! ||
            'https://res.cloudinary.com/dqsbh2kn0/image/upload/v1663014890/zawkgpyjvvxrfwp9j7w1.jpg'
          }
          alt={
            page?.data.description! || 'image description'
          }
        />
        <Link
          href={`/dashboard/pages/page2/${page?._id}`}
          className="flex items-center h-[3rem] mx-2 cursor-pointer"
        >
          <h2 className=" text-sm tracking-wide truncate">
            {page?.data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
}