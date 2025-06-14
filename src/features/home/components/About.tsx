import { Bug, Globe, Microscope, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: Microscope,
    title: 'Research Excellence',
    description: 'Cutting-edge invertebrate research with modern methodologies and field studies.',
  },
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Learn from experienced researchers and industry professionals.',
  },
  {
    icon: Globe,
    title: 'Field Expeditions',
    description: 'Hands-on experience in diverse ecosystems and natural habitats.',
  },
];

export const About = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
                <Bug className="h-4 w-4" />
                About Our Institute
              </div>

              <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                Advancing
                <span className="text-green-600"> Invertebrate Science</span>
                Through Research & Education
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                At Entomon Institute, we're dedicated to advancing the understanding of invertebrate zoology
                through innovative research, comprehensive education, and immersive field experiences. Our
                award-winning team combines academic excellence with practical field expertise.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="rounded-2xl bg-gradient-to-r from-green-50 to-gray-50 p-6 border-l-4 border-green-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To bridge the gap between academic research and real-world application in invertebrate
                zoology, fostering the next generation of researchers while contributing to biodiversity
                conservation and scientific understanding.
              </p>
            </div>


          </div>

          {/* Features Grid */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {FEATURES.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center rounded-xl bg-green-600 p-3 shadow-lg">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                        {title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 p-6 border border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Students Taught</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
