import React from 'react';

import { Navbar, Footer } from '@/components/custom';
import { Contact } from '@/features/contact/components';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};

export default ContactPage;
