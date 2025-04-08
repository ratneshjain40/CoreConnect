import Image from 'next/image';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Leaf, Fish, Bug, Brain } from 'lucide-react';
import { BugIcon } from '@/components/custom';
import bugImage from '@/assets/hero-img.jpg';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Eshaan Pahade',
      role: 'Director & CEO',
      image: 'https://api.dicebear.com/9.x/pixel-art/png?seed=EshaanPahade',
    },
    {
      name: 'Mrs. Shreya Pahade',
      role: 'Head of Research',
      image: 'https://api.dicebear.com/9.x/pixel-art/png?seed=ShreyaPahade',
    },
  ];

  const faqs = [
    {
      question: 'What is invertebrate zoology?',
      answer:
        'Invertebrate zoology is the study of animals without backbones, which make up about 97% of all animal species. This includes insects, mollusks, crustaceans, worms, and many other diverse groups.',
    },
    {
      question: 'Why are invertebrates important?',
      answer:
        'Invertebrates play crucial roles in ecosystems as pollinators, decomposers, and food sources for other animals. They also contribute to soil health, water filtration, and many other ecological processes essential for life on Earth.',
    },
    {
      question: 'How can I get involved with the Entomon Institute?',
      answer:
        'We offer various opportunities for involvement, including internships, volunteer programs, and citizen science projects. You can also support our work through donations or by attending our public lectures and events.',
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Mission</h2>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-700">
                At the Entomon Institute, we are dedicated to advancing the understanding of invertebrate life through
                cutting-edge research, education, and conservation efforts. Our mission is to:
              </p>
              <ul className="grid gap-3 text-gray-700 xs:grid-cols-2">
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Conduct groundbreaking research in invertebrate zoology
                </li>
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Educate the next generation of invertebrate specialists
                </li>
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Promote the conservation of invertebrate species and their habitats
                </li>
                <li className="flex flex-col gap-1 rounded-md bg-gray-200/35 px-4 py-3 text-sm">
                  <BugIcon className="h-6 w-6" />
                  Foster public appreciation for the vital role of invertebrates in our world
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src={bugImage}
                alt="Entomon Institute building"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Team</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member, index) => (
              <div key={crypto.randomUUID()} className="rounded-md bg-gray-200/35 px-3 py-5 text-center">
                <Image
                  width={150}
                  height={150}
                  alt={member.name}
                  src={member.image}
                  className="mx-auto mb-4 rounded-full"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </div>
  );
}
