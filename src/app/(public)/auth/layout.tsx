import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="relative grid min-h-dvh w-full lg:grid-cols-2">
      <Link className="group absolute left-4 top-4 flex items-center gap-2" href="/">
        <span className="flex items-center justify-center rounded-md bg-primary p-[0.4rem] text-white shadow transition-colors group-hover:bg-primary/90 group-focus-visible:outline-none group-focus-visible:ring-1 group-focus-visible:ring-ring">
          <ChevronLeft className="h-4 w-4" />
        </span>
        <span>Home</span>
      </Link>
      {children}
      <div className="hidden bg-muted lg:block">
        <Image
          alt="Image"
          width="1920"
          height="1080"
          src="https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
