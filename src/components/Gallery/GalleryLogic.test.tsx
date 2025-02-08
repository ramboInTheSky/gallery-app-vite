import { renderHook, waitFor } from "@testing-library/react";
import {
  QueryFunctionContext,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  fetchImages,
  useGalleryQuery,
  swapImageParamsForThumbnail,
} from "./GalleryLogic";

global.fetch = jest.fn();

describe("GalleryLogic", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchImages", () => {
    it("fetches and returns image data successfully", async () => {
      const mockData = [
        { id: "1", author: "Author 1", download_url: "url1" },
        { id: "2", author: "Author 2", download_url: "url2" },
      ];

      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const queryContext: QueryFunctionContext = {
        queryKey: ["images"],
        signal: new AbortController().signal,
        meta: undefined,
        pageParam: 1,
      };

      const result = await fetchImages(queryContext);
      expect(result).toEqual({
        images: mockData,
        nextPage: 2,
        hasMore: true,
      });
      expect(global.fetch).toHaveBeenCalledWith(
        "https://picsum.photos/v2/list?page=1&limit=12"
      );
    });

    it("handles API errors correctly", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });

      const queryContext: QueryFunctionContext = {
        queryKey: ["images"],
        signal: new AbortController().signal,
        meta: undefined,
        pageParam: 1,
      };

      await expect(fetchImages(queryContext)).rejects.toThrow(
        "Failed to fetch images"
      );
      expect(global.fetch).toHaveBeenCalledWith(
        "https://picsum.photos/v2/list?page=1&limit=12"
      );
    });
  });

  describe("useGalleryQuery", () => {
    it("returns initial data and fetches the first page", async () => {
      const mockData = [
        { id: "1", author: "Author 1", download_url: "url1" },
        { id: "2", author: "Author 2", download_url: "url2" },
      ];

      // Mock the global fetch function
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      // Create a new QueryClient
      const queryClient = new QueryClient();

      // Render the hook within a QueryClientProvider
      const { result } = renderHook(() => useGalleryQuery(), {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      });

      // Assert that the hook starts in a loading state
      expect(result.current.isLoading).toBe(true);

      // Wait for the data to load
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      // Assert the data was fetched successfully
      expect(result.current.data?.pages[0].images).toEqual(mockData);
      expect(result.current.data?.pages[0].hasMore).toBe(true);
      expect(result.current.data?.pages[0].nextPage).toBe(2);

      // Ensure the fetch function was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        "https://picsum.photos/v2/list?page=1&limit=12"
      );
    });
  });

  describe("swapImageParamsForThumbnail", () => {
    it("correctly swaps image URL parameters", () => {
      const url = "https://picsum.photos/id/1/500/600";
      const updatedUrl = swapImageParamsForThumbnail(url);
      expect(updatedUrl).toBe("https://picsum.photos/id/1/300/200");
    });
  });
});
