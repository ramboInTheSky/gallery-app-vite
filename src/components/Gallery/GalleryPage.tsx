import React, { useLayoutEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGalleryQuery,
  type ImageData,
  swapImageParamsForThumbnail,
} from "./GalleryLogic";
import {
  Container,
  GalleryGrid,
  GalleryCard,
  GalleryImage,
  Author,
  SkeletonCard,
  Sentinel,
} from "./Components";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasScrolled = useRef<boolean>(false); // Prevent multiple scroll restorations

  // React Query hook for infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGalleryQuery();

  // Flatten all pages of images into a single array
  const images: ImageData[] = data?.pages.flatMap((page) => page.images) || [];

  // Ref for the sentinel using the custom hook (for Intersection Observer)
  const sentinelRef = useInfiniteScroll({ fetchNextPage, hasNextPage });

  // Restore scroll position from query param on mount
  useLayoutEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const savedScrollPosition = searchParams.get("scroll");

    if (savedScrollPosition && data && !hasScrolled.current) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      hasScrolled.current = true;
    }
  }, [data, location.search]);

  // Save scroll position in query params before navigating to another page
  const handleImageClick = (imageId: string) => {
    const currentScrollY = window.scrollY;
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("scroll", String(currentScrollY));
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    navigate(`/edit/${imageId}?${newSearchParams.toString()}`); // Preserve scroll in query param
  };

  return (
    <Container>
      {/* Loading State showing 12 skeletons */}
      {isLoading && (
        <GalleryGrid>
          {Array.from({ length: 12 }).map((_, idx) => (
            <SkeletonCard key={idx} aria-label="Loading content" />
          ))}
        </GalleryGrid>
      )}

      {/* Error State */}
      {isError && <p>Error loading images. Try again later.</p>}

      {/* Gallery Grid */}
      <GalleryGrid>
        {images.map((img) => (
          <GalleryCard key={img.id} onClick={() => handleImageClick(img.id)}>
            <GalleryImage
              src={swapImageParamsForThumbnail(img.download_url)} // to reduce the image size
              alt={img.author}
              loading="lazy" // Load images only if they are in the viewport
            />
            <Author>{img.author}</Author>
          </GalleryCard>
        ))}
      </GalleryGrid>

      {/* Sentinel for Infinite Scroll */}
      {hasNextPage && !isLoading && (
        <Sentinel ref={sentinelRef}>
          {isFetchingNextPage ? "Loading more..." : "Scroll down to load more"}
        </Sentinel>
      )}

      {/* No More Images */}
      {!hasNextPage && <Sentinel>No more images to load.</Sentinel>}
    </Container>
  );
};

export default GalleryPage;
