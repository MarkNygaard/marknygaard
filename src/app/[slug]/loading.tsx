import { Spinner } from '@ui/spinner';

export default function Loading() {
  return (
    <div className='flex h-center w-full items-center justify-center text-xl dark:text-gray-400'>
      <Spinner />
      <p>Loading...</p>
    </div>
  );
}
