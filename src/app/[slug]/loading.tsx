import { Spinner } from 'components/ui/spinner';

export default function Loading() {
  return (
    <div className="w-full h-center flex justify-center items-center text-xl dark:text-gray-400">
      <Spinner />
      <p>Loading...</p>
    </div>
  );
}
