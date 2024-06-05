import { Skeleton } from '@Primitives/Skeleton';

export default function Loading() {
  return (
    <div>
      <div className='pb-4 sm:grid sm:grid-cols-3 sm:grid-rows-1 sm:gap-2'>
        <Skeleton className='h-16 bg-pine-300 p-5 md:h-full' />
        <Skeleton className='h-36 sm:col-span-2 sm:h-60 lg:h-96' />
      </div>
      <div className='flex'>
        <div className='w-full space-y-2 pr-3 lg:w-9/12'>
          <Skeleton className='h-6 w-10/12' />
          <Skeleton className='h-6 w-9/12' />
          <div className='p-2'></div>
          <Skeleton className='h-6 w-7/12' />
          <Skeleton className='h-6 w-10/12' />
          <Skeleton className='h-6 w-6/12' />
          <Skeleton className='h-6 w-9/12' />
          <div className='p-2'></div>
          <Skeleton className='h-6 w-8/12' />
          <Skeleton className='h-6 w-11/12' />
          <Skeleton className='h-6 w-10/12' />
          <Skeleton className='h-6 w-9/12' />
          <div className='p-2'></div>
          <div className='p-2'></div>
          <div className='p-2'></div>
          <Skeleton className='h-6 w-7/12' />
          <Skeleton className='h-6 w-10/12' />
          <Skeleton className='h-6 w-6/12' />
          <Skeleton className='h-6 w-9/12' />
          <div className='p-2'></div>
          <Skeleton className='h-6 w-8/12' />
          <Skeleton className='h-6 w-11/12' />
        </div>
        <aside className='hidden w-3/12 space-y-2 divide-y lg:block'>
          <div className='pb-6'>
            <Skeleton className='h-6 w-40 pl-2' />
          </div>
          <div className='space-y-2 py-5 pl-2'>
            <Skeleton className='h-6 w-14' />
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <Skeleton className='h-6 w-32' />
            </div>
          </div>
          <div className='space-y-2 py-5 pl-2'>
            <Skeleton className='h-6 w-20' />
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-6 w-32' />
            </div>
          </div>
          <div className='space-y-2 py-5 pl-2'>
            <Skeleton className='h-6 w-32' />
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-6 w-16' />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
