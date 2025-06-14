import type { Metadata } from 'next';
import Image from 'next/image';

import bugImage from '@/assets/hero-img.webp';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Award, Bug, CheckCircle, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the Entomon Institute, our mission, team, and commitment to invertebrate zoology and entomology research.',
  keywords: ['About Entomon', 'Entomology Research', 'Invertebrate Specialists', 'Entomon Team', 'Entomon Mission'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Entomon Institute',
    description:
      'Dedicated to advancing the understanding of invertebrate life through research, education, and conservation.',
    url: '/about',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'About Entomon Institute',
      },
    ],
  },
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Eshaan Pahade',
      role: 'Director & CEO',
      image: 'https://api.dicebear.com/9.x/pixel-art/png?seed=EshaanPahade',
      story: 'With a Master\'s degree in Entomology and a Master\'s diploma in Forensic Science, Eshaan combines expertise in insect studies and forensic science. Under his leadership, Entomon Institute fosters innovative research and engages the public in the wonders of insects. Eshaan is also the recipient of the prestigious Davis Peace Project award, recognizing his dedication to science and creating positive societal impact.'
    },
    {
      name: 'Mrs. Shreya Pahade',
      role: 'Head of Research',
      image: 'https://api.dicebear.com/9.x/pixel-art/png?seed=ShreyaPahade',
      story: 'With over a decade of experience in invertebrate research, Shreya brings a wealth of knowledge in field methodology and species identification. Her passion for education and mentorship has shaped countless researchers in the field. She specializes in biodiversity studies and has published extensively on conservation strategies for endangered invertebrate species.'
    },
  ];

  const faqs = [
    {
      question: 'What is entomology, and why is it important?',
      answer:
        'Entomology is the scientific study of insects and their relationships to humans, other organisms, and the environment. Insects are vital to ecosystems as pollinators, decomposers, and as a food source for many species. They also play an essential role in agricultural systems, disease transmission, and biodiversity conservation.',
    },
    {
      question: 'What kind of research does the Entomon Institute conduct?',
      answer:
        'The Entomon Institute specializes in advanced entomological research across various fields, including insect behavior, biodiversity, pest management, and conservation. Our research projects also explore the impact of climate change on insect populations, vector-borne diseases, and the role of insects in ecosystems.',
    },
    {
      question: 'Do you offer educational programs or workshops?',
      answer:
        'Yes! We offer a range of educational programs, including workshops, short courses, and online seminars on various aspects of entomology. These programs are designed for students, researchers, and professionals looking to deepen their understanding of insect science.',
    },
    {
      question: 'Can I participate in entomological experiments at the Entomon Institute?',
      answer:
        'Yes, we invite collaboration and participation in various entomological experimentation projects. Depending on the nature of the project, we offer opportunities for students, researchers, and industry professionals to get involved.',
    },
    {
      question: 'What types of entomological experiments do you conduct?',
      answer:
        'Our experiments cover a wide range of entomological topics, including insect life cycles, behavior studies, genetic research, ecological surveys, pest control methods, and conservation efforts.',
    },
    {
      question: 'How can I collaborate with the Entomon Institute on a research project?',
      answer:
        'We welcome collaboration with institutions, universities, and industry professionals. Please reach out through our contact page with your proposal, including a brief description of the project and objectives.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mission & Image Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-white">
        <div className="container max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
                  <Award className="h-4 w-4" />
                  Our Mission
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                  Creating a Better World Through
                  <span className="text-green-600"> Scientific Discovery</span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  We bridge the gap between academic research and real-world application in invertebrate
                  zoology, fostering the next generation of researchers while contributing to biodiversity
                  conservation and scientific understanding.
                </p>
              </div>

              {/* Mission Points */}
              <div className="space-y-4">
                {[
                  'Conduct groundbreaking research in invertebrate zoology',
                  'Educate the next generation of invertebrate specialists',
                  'Promote conservation of invertebrate species and habitats',
                  'Foster public appreciation for invertebrates in our ecosystem'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={bugImage}
                  alt="Entomon Institute research"
                  width={600}
                  height={400}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-gray-50">
        <div className="container max-w-6xl px-4 md:px-6">

            {/* Header */}
            <div className="space-y-6 text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
                <Bug className="h-4 w-4" />
                Our Story
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                The Journey Behind
                <span className="text-green-600"> Entomon Institute</span>
              </h2>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Why We Started</h3>
                <p>
                  The Entomon Institute was born from a simple yet profound realization: the invertebrate world,
                  which comprises over 95% of all animal species on Earth, was being overlooked in mainstream
                  scientific education and public consciousness. Despite their critical role in ecosystems,
                  agriculture, and human welfare, these fascinating creatures often remained in the shadows of
                  more charismatic vertebrate species.
                </p>
                <p>
                  Dr. Eshaan Pahade, while pursuing his Master's in Entomology, witnessed firsthand the lack
                  of comprehensive educational resources and field-based learning opportunities in invertebrate
                  zoology. Traditional academic programs, while thorough in theory, often failed to provide
                  the immersive, hands-on experiences that truly ignite passion for these remarkable organisms.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">How We Began</h3>
                <p>
                  In 2009, what started as informal field trips and workshops among university colleagues
                  gradually evolved into something much larger. Dr. Pahade, along with his research partner
                  Mrs. Shreya Pahade, began organizing systematic field expeditions to biodiversity hotspots
                  across India. These expeditions combined rigorous scientific methodology with educational
                  outreach, creating a unique learning environment that bridged academic research and
                  practical application.
                </p>
                <p>
                  The positive response from students, researchers, and even amateur naturalists was
                  overwhelming. Word spread about these transformative experiences, and soon, requests
                  were pouring in from educational institutions, conservation organizations, and individual
                  researchers seeking similar opportunities.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Our Evolution</h3>
                <p>
                  Recognizing the growing demand for specialized invertebrate education and research,
                  the founders formally established the Entomon Institute in 2012. The institute's
                  mission was clear: to create a comprehensive platform that would advance invertebrate
                  zoology through innovative research, immersive education, and meaningful conservation efforts.
                </p>
                <p>
                  Over the years, we have evolved from a small group of passionate researchers to a
                  recognized institution that has trained over 500 students, conducted more than 50
                  research projects, and contributed significantly to invertebrate conservation efforts
                  across multiple ecosystems. Our unique approach combining forensic science applications
                  with traditional entomology has opened new avenues for research and practical applications.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Looking Forward</h3>
                <p>
                  Today, the Entomon Institute stands as a testament to the power of passionate, dedicated
                  research and education. We continue to push boundaries, exploring new frontiers in
                  invertebrate science while maintaining our core commitment to hands-on, experiential
                  learning. Our story is far from over – it's a continuing journey of discovery, education,
                  and conservation that grows stronger with each new researcher who joins our mission.
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-white">
        <div className="container max-w-7xl px-4 md:px-6">
          {/* Header */}
          <div className="mx-auto max-w-3xl space-y-6 text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
              <Users className="h-4 w-4" />
              Our Team
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              Meet Our
              <span className="text-green-600"> Expert Researchers</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our dedicated team of experts is passionate about advancing entomological research and education
            </p>
          </div>

          {/* Team Grid */}
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`grid gap-12 lg:gap-20 items-center ${
                  index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="text-center">
                    <div className="relative mx-auto w-48 h-48 mb-6">
                      <Image
                        width={192}
                        height={192}
                        alt={member.name}
                        src={member.image}
                        className="rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-green-600 font-medium text-lg">{member.role}</p>
                    </div>
                  </div>
                </div>

                {/* Story */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900">Background & Expertise</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {member.story}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mx-auto max-w-3xl space-y-6 text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
                <Bug className="h-4 w-4" />
                FAQ
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                Frequently Asked
                <span className="text-green-600"> Questions</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Find answers to common questions about our research, programs, and collaboration opportunities
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    value={`item-${index + 1}`}
                    key={index}
                    className="border border-gray-200 rounded-xl px-6 py-2 hover:border-green-200 transition-colors bg-white"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-green-600 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
