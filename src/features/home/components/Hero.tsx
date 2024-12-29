import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative w-full bg-[url('https://wallpapercat.com/w/full/2/d/7/1044282-1920x1080-desktop-1080p-beetle-background-image.jpg')] bg-cover bg-center bg-no-repeat py-24 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover the Wonders of the Invertebrate World
          </h1>
          <p className="text-lg md:text-xl">
            Explore the fascinating diversity of insects, arachnids, and other invertebrates at the Entomon Institute.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
