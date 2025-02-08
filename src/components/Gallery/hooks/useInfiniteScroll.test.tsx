import { renderHook } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  let observeMock: jest.Mock;
  let unobserveMock: jest.Mock;
  let disconnectMock: jest.Mock;

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    disconnectMock = jest.fn();

    global.IntersectionObserver = jest.fn(() => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    })) as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("does not observe if hasNextPage is false", () => {
    const fetchNextPage = jest.fn();

    const { result } = renderHook(() =>
      useInfiniteScroll({ fetchNextPage, hasNextPage: false })
    );

    expect(result.current.current).toBeNull();
    expect(observeMock).not.toHaveBeenCalled();
  });

  test("calls fetchNextPage when the sentinel is intersecting", () => {
    const fetchNextPage = jest.fn();

    renderHook(() => useInfiniteScroll({ fetchNextPage, hasNextPage: true }));

    // Simulate an intersecting entry
    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    observerCallback([{ isIntersecting: true }]);

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });

  test("does not call fetchNextPage if the sentinel is not intersecting", () => {
    const fetchNextPage = jest.fn();

    renderHook(() => useInfiniteScroll({ fetchNextPage, hasNextPage: true }));

    // Simulate a non-intersecting entry
    const observerCallback = (global.IntersectionObserver as jest.Mock).mock
      .calls[0][0];
    observerCallback([{ isIntersecting: false }]);

    expect(fetchNextPage).not.toHaveBeenCalled();
  });

  test("cleans up the observer on unmount", () => {
    const fetchNextPage = jest.fn();

    const { result, unmount } = renderHook(() =>
      useInfiniteScroll({ fetchNextPage, hasNextPage: true })
    );

    // Assign a dummy element to the sentinel ref
    const dummyElement = document.createElement("div");
    result.current.current = dummyElement;

    unmount(); // Unmount the component

    expect(unobserveMock).toHaveBeenCalledWith(dummyElement);
  });
});
