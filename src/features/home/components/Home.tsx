import React from 'react';

import { Newsletter } from './NewsLetter';
import { Events } from './Events';
import { About } from './About';
import { Services } from './Services';
import { Hero } from './Hero';

export const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Events />
      <Newsletter />
    </>
  );
};
