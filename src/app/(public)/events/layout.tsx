import { Footer, Navbar } from '@/components/custom';

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
