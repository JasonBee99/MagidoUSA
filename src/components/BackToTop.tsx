'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Blur button when it becomes hidden so focus isn't trapped on aria-hidden element
  useEffect(() => {
    if (!visible && btnRef.current && document.activeElement === btnRef.current) {
      btnRef.current.blur();
    }
  }, [visible]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      ref={btnRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-magido-blue text-white shadow-lg ring-1 ring-magido-blue/30 transition-all duration-300 hover:bg-magido-orange hover:ring-magido-orange/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magido-orange ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

export default BackToTop;
