import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Fish, Bug, Brain, Mail } from 'lucide-react';

export default function AboutPage() {
  const researchAreas = [
    {
      icon: <Bug className="h-6 w-6" />,
      title: 'Arthropod Biodiversity',
      description: 'Exploring the vast diversity of insects, arachnids, and crustaceans.',
    },
    {
      icon: <Fish className="h-6 w-6" />,
      title: 'Marine Invertebrates',
      description: "Studying the complex ecosystems of our oceans' smallest inhabitants.",
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: 'Ecological Interactions',
      description: 'Investigating the crucial roles invertebrates play in global ecosystems.',
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'Invertebrate Neurobiology',
      description: 'Unraveling the mysteries of simple yet fascinating nervous systems.',
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Mission</h2>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-4 text-lg text-gray-700">
                At the Entomon Institute, we are dedicated to advancing the understanding of invertebrate life through
                cutting-edge research, education, and conservation efforts. Our mission is to:
              </p>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                <li>Conduct groundbreaking research in invertebrate zoology</li>
                <li>Educate the next generation of invertebrate specialists</li>
                <li>Promote the conservation of invertebrate species and their habitats</li>
                <li>Foster public appreciation for the vital role of invertebrates in our world</li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="https://wallpapercat.com/w/full/2/d/7/1044282-1920x1080-desktop-1080p-beetle-background-image.jpg"
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Image
                  width={200}
                  height={200}
                  alt={member.name}
                  src={member.image}
                  className="mx-auto mb-4 rounded-full"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
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
