'use client'

// import { useSelection } from '@/src/providers/SelectionContext';

import { TrashIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';
import { usePath } from '@/hooks/usePath';
import { useSelection } from '@/providers/SelectionContext';
import { useDeletePage0 } from '@/hooks/usePages0';
import { useDeletePage1 } from '@/hooks/usePages1';
import { useDeletePage2 } from '@/hooks/usePages2';

interface Props {
  type?: string
}

export function HeadingDashboardOption(props: Props) {
  // console.log('props', props)
  const { selected, allSelected, toggleAll, unSelectAll } = useSelection();
  const path = usePath();

  const deletePetPages0 = useDeletePage0()
  const deletePetPages1 = useDeletePage1()
  const deletePetPages2 = useDeletePage2()


  const deleteHandle = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        {
          path.length === 2 && deletePetPages0.mutate(selected)
        }
        if (path.length ===4) {
          
          {
             path[2] === 'page0' && deletePetPages1.mutate(selected)
          }
          {
            path[2] === 'page1' && deletePetPages2.mutate(selected)
          }
        }
        
        
        
      }
    });
  };
  return (
    <div
      className={` ${
        selected.length !== 0 ? 'opacity-100' : 'hidden  -translate-y-6 '
      } `}
    >
      <div className="mx-auto max-w-7xl pt-3 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
          <input
            type="checkbox"
            className="h-5 w-5  rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 bg-white"
            onChange={() => toggleAll}
            checked={allSelected}
            onClick={toggleAll}
          />
            
            <p className="ml-2 text-sm font-medium">Select All</p>
          </div>

          <span
            className={`block opacity-100 transition ease-in-out delay-150`}
            >
            <button className="btn-default" onClick={() => deleteHandle()}>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <p className="">({selected.length})</p>
            </button>
          </span>
        </div>
      </div>
      </div>

  );
}