import { render, screen, fireEvent, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GalleryPage from "./GalleryPage";
import { useGalleryQuery } from "./GalleryLogic";

// Mock dependencies
jest.mock("./GalleryLogic", () => ({
  useGalleryQuery: jest.fn(),
  swapImageParamsForThumbnail: jest
    .fn()
    .mockImplementation((url) => `${url}?thumbnail=true`),
}));

const mockNavigate = jest.fn();
const mockLocation = { search: "?scroll=500" };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: jest.fn(() => mockLocation), // Ensure search property is defined
}));

describe("GalleryPage", () => {
  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GalleryPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading skeletons when loading", () => {
    (useGalleryQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderComponent();

    // Check for skeletons
    const skeletons = screen.getAllByLabelText("Loading content");
    expect(skeletons).toHaveLength(12);
  });

  it("renders error message on error", () => {
    (useGalleryQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    renderComponent();

    expect(
      screen.getByText("Error loading images. Try again later.")
    ).toBeInTheDocument();
  });

  it("renders images when data is loaded", () => {
    const mockData = {
      pages: [
        {
          images: [
            { id: "1", author: "Author 1", download_url: "url1" },
            { id: "2", author: "Author 2", download_url: "url2" },
          ],
        },
      ],
    };

    (useGalleryQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    renderComponent();

    // Check that images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "url1?thumbnail=true");
    expect(images[1]).toHaveAttribute("src", "url2?thumbnail=true");

    // Check that authors are rendered
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
  });

  it("navigates to the edit page with the scroll position in query params", () => {
    const mockData = {
      pages: [
        {
          images: [{ id: "1", author: "Author 1", download_url: "url1" }],
        },
      ],
    };

    (useGalleryQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    renderComponent();

    // Simulate scroll position
    window.scrollY = 200;

    // Click the image
    const imageCard = screen.getByText("Author 1").closest("div");
    fireEvent.click(imageCard!);

    // Check navigation includes scroll position
    expect(mockNavigate).toHaveBeenCalledWith("/edit/1?scroll=200");
  });

  it("restores scroll position on mount from query params", () => {
    // Mock URL with scroll position
    (
      jest.requireMock("react-router-dom").useLocation as jest.Mock
    ).mockReturnValue({
      search: "?scroll=500",
    });

    const mockData = {
      pages: [
        {
          images: [{ id: "1", author: "Author 1", download_url: "url1" }],
        },
      ],
    };

    (useGalleryQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
    });

    renderComponent();

    // Check scroll position restoration
    expect(window.scrollTo).toHaveBeenCalledWith(0, 500);
  });

  test("calls fetchNextPage when the sentinel is observed", async () => {
    const mockFetchNextPage = jest.fn();
    (useGalleryQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    renderComponent();

    // The sentinel text is rendered, but IntersectionObserver doesn't trigger automatically
    const sentinel = screen.getByText("Scroll down to load more");
    expect(sentinel).toBeInTheDocument();

    // Grab the IntersectionObserver callback
    const observerCallback = (window.IntersectionObserver as jest.Mock).mock
      .calls[0][0];

    // Manually invoke the observer callback with isIntersecting: true
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });

    // Now we expect fetchNextPage to have been called
    expect(mockFetchNextPage).toHaveBeenCalled();
  });
});
