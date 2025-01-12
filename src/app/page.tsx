import React from 'react';

import { Home } from '@/features/home/components';
import { Navbar, Footer } from '@/components/custom';
import { eventRepo } from '@/features/events/server/repo';

const HomePage = async () => {
  const eventIDs = await eventRepo.getAllEventIDs();
  console.log(eventIDs);
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
};

export default HomePage;
