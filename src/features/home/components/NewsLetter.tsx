import { NewsLetterForm } from './NewsLetterForm';

export const Newsletter = () => (
  <section className="w-full bg-slate-950 py-12 md:py-24 lg:py-32">
    <div className="container space-y-4 px-4 text-center md:px-6">
      <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">Stay Updated with Our Newsletter</h2>
      <p className="mx-auto max-w-xl text-primary-foreground">
        Subscribe to our newsletter to receive the latest news, updates, and exclusive content from the Entomon
        Institute.
      </p>

      <NewsLetterForm />
    </div>
  </section>
);
