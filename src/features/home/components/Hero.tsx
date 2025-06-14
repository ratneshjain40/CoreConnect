import heroBg from '@/assets/hero-bg.webp';
import { ArrowRight, Award, BookOpen, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroBg}
          alt="Invertebrate research background"
          fill
          priority
          placeholder="blur"
          quality={85}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-400/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-300/40 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-green-400/25 rounded-full animate-pulse" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-600/20 backdrop-blur-sm border border-green-500/30 px-4 py-2 text-sm text-green-300">
            <Award className="h-4 w-4" />
            <span>Davis Peace Project Award Winner</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover the
              <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent block">
                Invertebrate
              </span>
              Universe
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
              Leading research institute advancing invertebrate zoology through innovative education,
              groundbreaking research, and immersive field experiences.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-300">Students Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-300">Research Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10+</div>
              <div className="text-sm text-gray-300">Expert Researchers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/about"
              className="group inline-flex h-14 items-center justify-center rounded-xl bg-green-600 px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/entomon_institute"
              className="group inline-flex h-14 items-center justify-center rounded-xl border-2 border-gray-300/30 bg-white/10 backdrop-blur-sm px-8 text-base font-semibold text-white shadow-lg transition-all hover:bg-white/20 hover:border-gray-200/50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Our Community
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <BookOpen className="h-4 w-4" />
              <span>Research Publications</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Award className="h-4 w-4" />
              <span>Award-Winning Team</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
