import { Footer, Navbar } from '@/components/custom';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn about how Entomon Institute collects, uses, and protects your personal information.',
  keywords: ['Privacy Policy', 'Entomon Privacy', 'Data Protection', 'Personal Information', 'Cookie Policy'],
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Entomon Institute Privacy Policy',
    description: 'Our commitment to protecting your personal information and data privacy practices.',
    url: '/privacy-policy',
    type: 'website',
    images: [
      {
        url: '/images/entomon-logo.webp',
        alt: 'Entomon Institute Privacy Policy',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h1 className="mb-8 text-3xl font-extrabold text-gray-900 sm:text-4xl">Privacy Policy</h1>

          <div className="prose prose-blue max-w-none">
            <p className="mb-6 text-gray-600">
              <strong>Effective Date:</strong> 01/01/2025
            </p>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Introduction</h2>
              <p>
                At Entomon Institute, we respect your privacy and are committed to protecting the personal data you
                share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website or interact with our services. Please read this policy carefully
                to understand how we handle your personal data.
              </p>
              <p className="mt-2">
                By accessing or using our website, you consent to the collection and use of your personal information as
                outlined in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              <h3 className="mb-2 mt-4 font-semibold">Personal Information</h3>
              <p>This includes data that can identify you, such as:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Other contact details</li>
              </ul>
              <p className="mt-2">
                We collect this information when you register or login to the web application, contact forms, register
                for newsletters, or participate in surveys and events.
              </p>

              <h3 className="mb-2 mt-4 font-semibold">Non-Personal Information</h3>
              <p>This includes general data about your interaction with our website, such as:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>IP addresses</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Pages visited</li>
                <li>Time spent on the site</li>
              </ul>
              <p className="mt-2">
                We collect this information to improve the functionality and performance of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              <p>
                The information we collect is used to enhance your experience and facilitate communication with you.
                Specifically, we use your personal information for:
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>Responding to inquiries, requests, or feedback.</li>
                <li>Sending you updates, newsletters, and research publications.</li>
                <li>Managing event registrations or course enrollments.</li>
                <li>Conducting research surveys and studies.</li>
                <li>Improving the content and functionality of our website.</li>
                <li>
                  Sending promotional or educational material related to entomology research (only with your explicit
                  consent).
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">3. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to monitor the use of our website and collect
                non-personal information. These technologies help us analyze website traffic, improve user experience,
                and provide relevant content.
              </p>
              <p className="mt-2">
                You can manage cookie settings through your browser. Disabling cookies may affect your experience on our
                website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">4. Data Sharing and Disclosure</h2>
              <p>
                Entomon Institute will not share your personal information with third parties except in the following
                cases:
              </p>
              <ul className="mt-2 list-disc pl-5">
                <li>
                  <strong>Service Providers:</strong> We may share your data with trusted service providers who assist
                  with website operations, event management, or newsletter distribution. These service providers are
                  obligated to safeguard your information and are not permitted to use it for any other purpose.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or
                  in response to valid legal requests by authorities (such as a court or government agency).
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we undergo a merger, acquisition, or sale of assets, your
                  personal information may be transferred as part of that transaction. We will notify you in advance if
                  this occurs.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">5. Data Security</h2>
              <p>
                We take reasonable steps to protect the security of your personal information, using secure servers,
                access controls, and other industry-standard safeguards to prevent unauthorized access, disclosure, or
                loss. However, no security system is completely secure, and we cannot guarantee absolute protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="mt-2 list-disc pl-5">
                <li>
                  <strong>Access:</strong> Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request corrections to any inaccurate or incomplete personal data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request the deletion of your personal data, subject to applicable laws and
                  regulations.
                </li>
                <li>
                  <strong>Withdrawal of Consent:</strong> You may withdraw your consent to the processing of your
                  personal data at any time by contacting us, although this will not affect the lawfulness of any
                  processing that occurred prior to the withdrawal.
                </li>
              </ul>
              <p className="mt-2">To exercise these rights, please contact us at entomoninstitute@gmail.com.</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">7. Retention of Data</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy or as required by law. Specific retention periods may vary depending on the type of data
                and legal requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">8. International Data Transfers</h2>
              <p>
                Entomon Institute operates globally, and your personal information may be transferred to countries
                outside your country of residence, including those that may not have the same level of data protection
                laws. We ensure adequate safeguards, such as Standard Contractual Clauses (SCCs) or equivalent measures,
                to protect your data. By using our website and services, you consent to these international transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">9. Links to Other Websites</h2>
              <p>
                Our website may contain links to third-party websites. These links are provided for your convenience,
                but we are not responsible for the content or privacy practices of these external sites. We encourage
                you to review the privacy policies of any third-party websites you visit.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">10. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Any changes will be posted on this page with an
                updated effective date. Please check this page periodically for updates. Continued use of our website
                after changes to this Privacy Policy constitutes your acceptance of those changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">11. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, or if you wish to exercise your rights
                regarding your personal data, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Entomon Institute</strong>
                <br />
                Pune, Maharashtra
                <br />
                Email: entomoninstitute@gmail.com
                <br />
                Phone: 8237214168
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
