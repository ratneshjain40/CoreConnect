import React from 'react';

import { Home } from '@/features/home/components';
import { Navbar, Footer } from '@/components/custom';

const HomePage = async () => {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};

export default HomePage;
