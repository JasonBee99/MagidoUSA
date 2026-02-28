'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';

const MAX_COMPARE = 8;
const MIN_COMPARE = 2;
const STORAGE_KEY = 'magido-compare';

interface CompareContextValue {
  compareSlugs: string[];
  addProduct: (slug: string) => void;
  removeProduct: (slug: string) => void;
  clearAll: () => void;
  isInCompare: (slug: string) => boolean;
  isFull: boolean;
  count: number;
  canCompare: boolean;
}

const CompareContext = createContext<CompareContextValue>({
  compareSlugs: [],
  addProduct: () => {},
  removeProduct: () => {},
  clearAll: () => {},
  isInCompare: () => false,
  isFull: false,
  count: 0,
  canCompare: false,
});

export function useCompare() {
  return useContext(CompareContext);
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareSlugs(parsed.slice(0, MAX_COMPARE));
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareSlugs));
    }
  }, [compareSlugs, mounted]);

  const addProduct = useCallback((slug: string) => {
    setCompareSlugs((prev) => {
      if (prev.includes(slug) || prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, []);

  const removeProduct = useCallback((slug: string) => {
    setCompareSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clearAll = useCallback(() => {
    setCompareSlugs([]);
  }, []);

  const isInCompare = useCallback(
    (slug: string) => compareSlugs.includes(slug),
    [compareSlugs]
  );

  return (
    <CompareContext.Provider
      value={{
        compareSlugs,
        addProduct,
        removeProduct,
        clearAll,
        isInCompare,
        isFull: compareSlugs.length >= MAX_COMPARE,
        count: compareSlugs.length,
        canCompare: compareSlugs.length >= MIN_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}
