import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";

// Define the structure of an individual image
export interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

// Define the structure of the response for each page
export interface FetchResponse {
  images: ImageData[]; // Array of images for the current page
  nextPage: number; // The next page number to fetch
  hasMore: boolean; // Whether there are more pages to fetch
}

// Fetch paginated image data
export const fetchImages = async ({
  pageParam = 1, // Default to page 1
}: QueryFunctionContext): Promise<FetchResponse> => {
  const limit = 12; // Number of images per page
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${pageParam}&limit=${limit}`
  );

  // Handle potential errors
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }

  const data: ImageData[] = await response.json();

  return {
    images: data,
    nextPage: (pageParam as number) + 1, // Increment page number
    hasMore: data.length > 0, // Check if more data exists
  };
};

// React Query hook for infinite scroll
export const useGalleryQuery = () => {
  return useInfiniteQuery<FetchResponse, Error>({
    queryKey: ["images"], // Unique key for caching
    queryFn: fetchImages, // Function to fetch images
    initialPageParam: 1, // Start at page 1
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined, // Determine next page
  });
};

export const swapImageParamsForThumbnail = (url: string) => {
  const urlParts = url.split("/");
  urlParts[urlParts.length - 1] = "200";
  urlParts[urlParts.length - 2] = "300";
  return urlParts.join("/");
};
