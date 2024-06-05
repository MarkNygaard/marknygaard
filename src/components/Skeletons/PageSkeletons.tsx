import { Skeleton } from 'components/Primitives/Skeleton';

export function BlogPageSkeleton() {
  return (
    <div className='my-6 flex flex-col gap-6'>
      <Skeleton className='h-24 sm:h-60 lg:h-[190px]' />
      <Skeleton className='h-24 sm:h-60 lg:h-[190px]' />
      <Skeleton className='h-24 sm:h-60 lg:h-[190px]' />
      <Skeleton className='h-24 sm:h-60 lg:h-[190px]' />
    </div>
  );
}
