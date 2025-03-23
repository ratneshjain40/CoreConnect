import { Footer, Navbar } from '@/components/custom';

export default function UserBlogsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
