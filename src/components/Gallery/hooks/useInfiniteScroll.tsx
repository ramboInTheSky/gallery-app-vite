import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  fetchNextPage: () => void; // Function to fetch the next page
  hasNextPage: boolean; // Boolean indicating if there are more pages to load
  rootMargin?: string; // Optional: Custom root margin for IntersectionObserver
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  rootMargin = "300px", // Default root margin (distance from the viewport to trigger loading)
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Ref for the sentinel element

  useEffect(() => {
    if (!hasNextPage) return; // If there are no more pages, do nothing

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries; // Take the first observed entry
        if (entry.isIntersecting) {
          fetchNextPage(); // Trigger the fetch function when the sentinel is visible
        }
      },
      { rootMargin } // Use the provided root margin
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current); // Start observing the sentinel
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current); // Clean up when the component unmounts or dependencies change
      }
    };
  }, [fetchNextPage, hasNextPage, rootMargin]); // Rerun effect when dependencies change

  return sentinelRef; // Return the ref to be attached to the sentinel element
};

export default useInfiniteScroll;
