import React from 'react';

import { Home } from '@/features/home/components';
import { Navbar, Footer } from '@/components/custom';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};

export default HomePage;
