'use client';

import { Mail, Send } from 'lucide-react';

export const NewsLetterForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
          />
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
          Full Name (Optional)
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
        />
      </div>

      <button
        type="submit"
        className="group w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      >
        Subscribe Now
        <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
};
