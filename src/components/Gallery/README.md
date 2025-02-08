# Gallery Feature

The Gallery displays an infinite-scroll image feed that mimics Instagram's layout. Images are dynamically fetched from the **Picsum Photos API**.

---

## Implementation Details

### 1. `GalleryPage.tsx`
- The main entry point for the Gallery feature.
- Combines logic (`GalleryLogic.ts`) and styled components (`Components.tsx`).
- Uses the `useInfiniteQuery` hook from **React Query** for fetching paginated data.
- Implements an **Intersection Observer** to trigger infinite scroll usign a custom hook `useInfiniteScroll`.
- Saves the scroll position via browser default behaviour if nothing is clicked
- Caches dehydrated data using react-query persister into the localStorage (via `src/utils/Cache.tsx`)
- Saves the scroll position additionally onClick to an image in order to be restored when going back to the page (this is also valid if the edit page is refreshed due to saving the dehydrated state)
- Images are downloaded only if they are actually in the viewport, further implementation would see virtualisation but it seemed too much for this exercise :) .

### 2. `GalleryLogic.ts`
- Contains reusable logic for the Gallery.
- Defines the `fetchImages` function for API calls.
- Provides the `useGalleryQuery` hook to encapsulate query logic.
- Provides the `swapImageParamsForThumbnail` util to replace the API parameters for low-res quality images.

### 3. `Components.tsx`
- Contains all styled components for the Gallery, using **Emotion**:
  - `Container`: Layout wrapper for the feed.
  - `GalleryGrid`: CSS Grid for responsive image display.
  - `ImageCard`: Styles for individual images.
  - `SkeletonCard`: Shimmer effect for loading placeholders.
  - `Sentinel`: Visible marker for triggering the next page load.

---

## Styling Choices
- **CSS Grid**: Provides a flexible, responsive layout for the feed.
- **Emotion**: Modular CSS-in-JS for reusable, scoped styles.

---
