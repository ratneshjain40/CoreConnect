import Image from 'next/image';
import Link from 'next/link';

export const EVENTS = [
  {
    id: 1,
    title: 'Invertebrate Biodiversity Conference',
    description:
      'Join us for a two-day conference exploring the latest research and trends in invertebrate biodiversity.',
    image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
    link: '#',
  },
  {
    id: 2,
    title: 'Entomology Workshop',
    description: 'Explore the fascinating world of insects through our hands-on entomology workshop.',
    image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
    link: '#',
  },
  {
    id: 3,
    title: 'Marine Biology Symposium',
    description: 'Join us for a symposium on the latest advancements in marine invertebrate research.',
    image: 'https://bijlmakers.com/wp-content/uploads/2018/10/potato-beetle-2766872_1920-700x554.jpg',
    link: '#',
  },
];

export const Events = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container space-y-8 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Past Events</h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Stay up-to-date with our upcoming events, workshops, and conferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EVENTS.map(({ id, title, description, image, link }) => (
          <div key={id} className="rounded-lg bg-background p-6 shadow-sm">
            <Image
              src={image}
              alt={title}
              width="550"
              height="310"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
            />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{description}</p>
            <div className="mt-4">
              <Link
                href={link}
                prefetch={false}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
