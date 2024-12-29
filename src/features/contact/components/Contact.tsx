import React from 'react';
import { ContactForm } from './ContactForm';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">Get in Touch</h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-600">
            We&apos;re here to help! Whether you have questions about our services, pricing, or anything else, feel free
            to reach out. Our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <iframe
              width="100%"
              tabIndex={0}
              height="100%"
              allowFullScreen
              aria-hidden="false"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.363215481274!2d-122.42200398468276!3d37.778521179757224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c9f8d2b37%3A0x4d132fa733d8b31a!2sThe%20Innovation%20Hangar!5e0!3m2!1sen!2sus!4v1618259724149!5m2!1sen!2sus"
            />
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};
