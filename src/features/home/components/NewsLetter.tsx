import { Check, Mail } from 'lucide-react';
import { NewsLetterForm } from './NewsLetterForm';

export const Newsletter = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-full" />
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                  <Mail className="h-4 w-4" />
                  Stay Connected
                </div>

                <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                  Join Our Research
                  <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block">
                    Community
                  </span>
                </h2>

                <p className="text-lg text-gray-300 leading-relaxed">
                  Get exclusive access to research updates, field expedition announcements,
                  and educational content delivered directly to your inbox. Be the first to know
                  about our latest discoveries and opportunities.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Exclusive research updates and findings</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Early access to field expedition registration</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Educational resources and learning materials</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>Networking opportunities with fellow researchers</span>
                </div>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="relative">
              <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Subscribe to Our Newsletter
                    </h3>
                    <p className="text-gray-400">
                      Join 1,000+ researchers and enthusiasts
                    </p>
                  </div>

                  <NewsLetterForm />

                  <p className="text-xs text-gray-400 text-center">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
