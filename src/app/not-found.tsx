import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-gray-600">Page Not Found</h2>
      <p className="mb-8 text-gray-500">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/" className="rounded-md bg-gray-700 px-6 py-3 text-white transition-colors hover:bg-gray-800">
        Go Back Home
      </Link>
    </div>
  );
}
