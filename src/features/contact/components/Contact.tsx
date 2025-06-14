import { ArrowRight, Bug, Calendar, Clock, Mail, MapPin, Phone, Users } from 'lucide-react';
import { ContactForm } from './ContactForm';

export const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Pune, Maharashtra', 'India'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@entomon.in', 'research@entomon.in'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 87654 32109'],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Contact Info Section */}
      <section className="w-full py-20 md:py-28 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          {/* Section Header */}
          <div className="space-y-6 max-w-3xl mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
              Let's Start a <span className="text-green-600">Conversation</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you're interested in our research programs, have questions about invertebrate zoology,
              or want to explore collaboration opportunities, we're here to help.
            </p>
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Contact Form */}
            <div className="rounded-3xl bg-white shadow-lg border border-gray-200 p-8">
              <ContactForm />
            </div>

            {/* Map Section */}
            <div className="space-y-8">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.545380241757!2d73.8121384!3d18.4589395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295c5d3977475%3A0x566c76909bb238be!2sEntomon%20Institute%20of%20Invertebrate%20Zoology!5e0!3m2!1sen!2sus!4v1744087407144!5m2!1sen!2sus"
                  width="100%"
                  height="500"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 0 }}
                  className="w-full h-[500px]"
                />
              </div>

              {/* Decorative Circles */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full opacity-40 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="w-full py-20 md:py-28 lg:py-36 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 border border-green-200">
                <Users className="h-4 w-4" />
                Join Our Community
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl">
                Ready to Explore <span className="text-green-600">Invertebrate Science?</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Join us in our mission to advance invertebrate zoology through research, education, and conservation.
                Discover opportunities that match your interests and expertise.
              </p>
            </div>

            {/* CTA Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* CTA 1 */}
              <CTABox
                icon={<Calendar className="h-6 w-6 text-white" />}
                title="Explore Our Programs"
                text="Discover field expeditions, workshops, and research opportunities designed for all experience levels."
                link="/events"
                buttonColor="green"
              />

              {/* CTA 2 */}
              <CTABox
                icon={<Users className="h-6 w-6 text-white" />}
                title="Learn About Us"
                text="Discover our story, mission, and the expert team behind Entomon Institute's success."
                link="/about"
                buttonColor="gray"
              />

              {/* CTA 3 */}
              <CTABox
                icon={<Bug className="h-6 w-6 text-white" />}
                title="Research Resources"
                text="Access our library of research papers, guides, and educational materials on invertebrate zoology."
                link="/blogs"
                buttonColor="green"
              />
            </div>

            {/* Footer CTA */}
            <div className="text-center mt-16 space-y-6">
              <p className="text-lg text-gray-600">
                Still have questions? Our team is here to help you find the perfect opportunity.
              </p>
              <div className="inline-flex items-center gap-2 text-sm text-green-600 font-medium">
                <Mail className="h-4 w-4" />
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// 🧩 Helper CTA Box Component
const CTABox = ({ icon, title, text, link, buttonColor }: any) => {
  const bg = buttonColor === 'green' ? 'bg-green-600' : 'bg-gray-900';
  const hoverBg = buttonColor === 'green' ? 'hover:bg-green-700' : 'hover:bg-gray-800';

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
      <div className="p-8 space-y-6">
        <div className={`inline-flex items-center justify-center rounded-xl ${bg} p-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{text}</p>
        </div>
        <a
          href={link}
          className={`group/link inline-flex items-center gap-2 rounded-xl ${bg} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all ${hoverBg} hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-green-500/5 to-green-600/5" />
    </div>
  );
};
