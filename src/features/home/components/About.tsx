import Image from 'next/image';
import butterfly from '@/assets/butterfly.jpg';

export const About = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid grid-cols-1 items-center gap-8 px-4 md:px-6 lg:grid-cols-2">
        <Image
          width="550"
          height="310"
          src={butterfly}
          alt="Invertebrates"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
        />

        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            About Entomon Institute of <br /> Invertebrates Zoology
          </h2>
          <p className="text-muted-foreground">
            At Entomon Institute, we believe that the key to a profound understanding of the natural world lies in
            immersive experiences. Our zoology excursions and documentary screenings are carefully curated to inspire
            students, foster a love for wildlife, and provide unparalleled learning opportunities.
          </p>
          <p className="text-muted-foreground">
            Our mission is to advance the understanding of invertebrate biology, ecology, and evolution through rigorous
            research, innovative educational programs, and collaborative partnerships with industry and academic
            institutions worldwide.
          </p>
        </div>
      </div>
    </section>
  );
};
