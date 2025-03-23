import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 text-center'>
      <h1 className='text-6xl font-bold tracking-tight'>404</h1>
      <h2 className='mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-300'>
        Page not found
      </h2>
      <p className='mt-4 text-gray-500 dark:text-gray-400'>
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link href='/' className='mt-6'>
        <div className='rounded-md border-[1px] border-pine-200 px-5 py-3 text-gray-500 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-700 hover:shadow-md dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'>
          &lt;- Go back home
        </div>
      </Link>
    </div>
  );
}
