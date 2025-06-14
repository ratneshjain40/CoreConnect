import { About } from './About';
import { Events } from './Events';
import { Hero } from './Hero';
import { Newsletter } from './NewsLetter';
import { Services } from './Services';

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
