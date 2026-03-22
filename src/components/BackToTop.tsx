'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-magido-blue text-white shadow-lg ring-1 ring-magido-blue/30 transition-all hover:bg-magido-orange hover:ring-magido-orange/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magido-orange"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

export default BackToTop;
