import Link from 'next/link';

const Alert = ({ preview }: { preview: boolean }): JSX.Element => {
  return (
    <div className="border-b bg-pine-300 bg-accent-1 border-accent-2">
      <div className="py-2 text-center text-sm container">
        <Link
          href="/api/exit-preview"
          className="underline hover:text-cyan duration-200 transition-colors"
        >
          This is page is showing draft content. Click here to exit preview
          mode.
        </Link>
      </div>
    </div>
  );
};

export default Alert;
